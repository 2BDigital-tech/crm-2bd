// Load dependencies
const aws = require("aws-sdk");
const HttpError = require("../models/error");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const router = express.Router();

// Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint(process.env.DO_SPACES_URL);
const s3 = new aws.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: "fra1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.DO_SPACES_BUCKET,
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).array("file", 1);

router.post("/upload", function (request, response, next) {
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
});

module.exports = router;
