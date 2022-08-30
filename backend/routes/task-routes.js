const express = require("express");
const { check } = require("express-validator");
const taskControllers = require("../controllers/task-controllers");
const router = express.Router();

router.get("/:uid", taskControllers.getTasks);
router.post("/addTask", taskControllers.addTask);
router.delete("/deleteTask/:tid", taskControllers.deleteTask);

module.exports = router;
