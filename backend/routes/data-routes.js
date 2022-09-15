const express = require("express");
const { check } = require("express-validator");
const dataControllers = require("../controllers/data-controllers");
const router = express.Router();

router.post("/", dataControllers.connect);

module.exports = router;
