const express = require("express");
const { check } = require("express-validator");
const folderControllers = require("../controllers/folders-controllers");
const router = express.Router();

router.get("/getFolders", folderControllers.getFolders);
router.post("/addFolder", folderControllers.addFolder);
// router.post("/getLeadsExperts", dataControllers.getLeadsExperts);

// router.get("/", dataControllers.getAllLeads);

module.exports = router;
