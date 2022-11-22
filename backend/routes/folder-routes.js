const express = require("express");
const { check } = require("express-validator");
const folderControllers = require("../controllers/folders-controllers");
const router = express.Router();

router.get("/getFolders", folderControllers.getFolders);
router.post("/addFolder", folderControllers.addFolder);
router.delete("/deleteFolder", folderControllers.deleteFolder);
router.patch("/editFolder", folderControllers.editFolder);

// router.post("/getLeadsExperts", dataControllers.getLeadsExperts);

// router.get("/", dataControllers.getAllLeads);

module.exports = router;
