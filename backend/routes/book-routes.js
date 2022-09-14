const express = require("express");
const { check } = require("express-validator");
const dataControllers = require("../controllers/book-controllers");
const router = express.Router();

router.get("/", dataControllers.connect);

module.exports = router;
