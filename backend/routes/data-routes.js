const express = require("express");
const { check } = require("express-validator");
const dataControllers = require("../controllers/data-controllers");
const router = express.Router();

router.get("/", dataControllers.getLeads);
router.post("/", dataControllers.getQuotationData);

// router.get("/", dataControllers.getAllLeads);

module.exports = router;
