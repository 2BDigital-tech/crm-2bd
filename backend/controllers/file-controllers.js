const aws = require("aws-sdk");
const { default: mongoose } = require("mongoose");
const HttpError = require("../models/error");
require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const Document = require("../models/document");

const s3 = new aws.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: "fra1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

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
      var fileId = request.params.fileId;
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
      try {
        await createdDocument.save();
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

exports.uploadFile = uploadFile;
exports.getDocuments = getDocuments;
