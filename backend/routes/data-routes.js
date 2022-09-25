const express = require("express");
const { check } = require("express-validator");
const dataControllers = require("../controllers/data-controllers");
const router = express.Router();

router.get("/getLeads", dataControllers.getLeads);
router.post("/getQuotations", dataControllers.getQuotationData);

// router.get("/", dataControllers.getAllLeads);

module.exports = router;
