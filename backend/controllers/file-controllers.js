const aws = require("aws-sdk");
const { default: mongoose } = require("mongoose");
const HttpError = require("../models/error");
require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const Document = require("../models/document");
const uuid = require("uuid").v4;
const Folder = require("../models/folder");

const s3 = new aws.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: "fra1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

async function deleteDocDO(folderId, subFid, fileKey) {
  await new Promise((resolve, reject) => {
    var params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: folderId + "/" + subFid + "/" + fileKey,
    };
    s3.deleteObject(params, function (err) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(params);
        resolve(true);
      }
    });
  });
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.DO_SPACES_BUCKET,
    contentType: function (request, file, cb) {
      console.log(file);
      cb(null, file.mimetype);
    },
    acl: "public-read",
    key: async function (request, file, cb) {
      var fid = request.params.fid;
      var subfid = request.params.subfid;
      var fileId = uuid();
      const fileUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_URL}/${fid}/${subfid}/${fileId}`;
      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const createdDocument = new Document({
        documentId: fileId,
        fileUrl: fileUrl,
        name: file.originalname,
        date: date,
        folderId: fid,
        subFolderIndex: subfid,
      });
      let folder;
      try {
        folder = await Folder.findById(fid);
      } catch (err) {
        console.log(err);
      }
      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdDocument.save({ session: sess });
        folder.documents.push(createdDocument);
        await folder.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Une erreur est survenue , veuillez reessayer",
          500
        );
        return next(error);
      }
      cb(null, fid + "/" + subfid + "/" + fileId);
    },
  }),
}).array("file", 5);

const uploadFile = async (request, response, next) => {
  upload(request, response, function (error) {
    if (error) {
      console.log(error);
      const err = new HttpError("Something went wrong", 404);
      return next(err);
    } else {
      console.log("File Uploaded");
      response.status(201).send("File uploaded !");
    }
  });
};

const getDocuments = async (req, res, next) => {
  let docsList;
  let folderId = req.params.fid;
  try {
    docsList = await Document.find({ folderId: folderId });
  } catch (err) {
    console.log(err);
  }
  res
    .status(201)
    .json({ message: "Documents from folderId " + folderId + " :", docsList });
};

const deleteDoc = async (req, res, next) => {
  let fid = req.params.fid;
  let subfid = req.params.subfid;
  let docId = req.params.docId;
  let document;
  try {
    document = await Document.findById(docId);
    deleteDocDO(fid, subfid, document.documentId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer",
      500
    );
    return next(error);
  }
  if (!document) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await document.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Utilisateur incorrect", 404);
    return next(error);
  }
  res.status(200).json({ message: "Document deleted successfully" });
};

exports.uploadFile = uploadFile;
exports.getDocuments = getDocuments;
exports.deleteDoc = deleteDoc;
