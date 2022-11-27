// Load dependencies
const express = require("express");
require("dotenv").config();
const fileControllers = require("../controllers/file-controllers");

const router = express.Router();

router.post("/upload/:fid/:subfid/:fileId", fileControllers.uploadFile);
router.get("/getDocuments/:fid", fileControllers.getDocuments);

module.exports = router;
