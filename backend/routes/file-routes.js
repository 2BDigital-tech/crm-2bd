// Load dependencies
const express = require("express");
require("dotenv").config();
const fileControllers = require("../controllers/file-controllers");

const router = express.Router();

router.post("/upload/:fid/:subfid", fileControllers.uploadFile);
router.get("/getDocuments/:fid", fileControllers.getDocuments);
router.delete("/deleteDoc/:fid/:subfid/:docId", fileControllers.deleteDoc);

module.exports = router;
