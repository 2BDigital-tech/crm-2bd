const express = require("express");
const fileControllers = require("../controllers/file-controllers");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.any(), fileControllers.upload);

module.exports = router;
