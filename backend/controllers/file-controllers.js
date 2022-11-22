const HttpError = require("../models/error");
const fs = require("fs");
const aws = require("aws-sdk");
const formidable = require("formidable");
require("dotenv").config();

const s3Client = new aws.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: "fra1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const upload = async (req, res, next) => {
  //   const form = formidable();
  //   console.log("here");
  //   form.parse(req, async (err, fields, files) => {
  //     console.log(req.body);
  //     if (!files.demo) {
  //       res.status(400).send("No file uploaded");
  //       return;
  //     }
  try {
    console.log(req);
    return s3Client.putObject(
      {
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: files.demo.originalFilename,
        Body: fs.createReadStream(req.body.filepath),
        ACL: "public-read",
      },
      async () => res.status(201).send("File uploaded !")
    );
  } catch (err) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
};

exports.upload = upload;
