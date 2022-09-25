const express = require("express");
const { check } = require("express-validator");
const userControllers = require("../controllers/user-controllers");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post(
  "/login",
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 7 }),
  userControllers.login
);

router.get("/", userControllers.getUsers);

router.post(
  "/addUser",
  check("email").normalizeEmail().isEmail(),
  check("name").isString(),
  check("role").isString(),
  check("customerName").isString(),
  check("creationDate").isString(),
  userControllers.addUser
);

router.delete("/", userControllers.deleteUser);

router.patch(
  "/:uid",
  check("email").normalizeEmail().isEmail(),
  check("name").isString(),
  check("role").isString(),
  check("city").isString(),
  userControllers.updateUser
);

module.exports = router;
