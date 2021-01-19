"use strict";

var express = require("express");

var _require = require("express-validator"),
    body = _require.body;

var User = require("../models/user");

var authController = require("../controllers/auth");

var router = express.Router();
router.post("/signup", body("fullName", "First Name is required").trim().isLength({
  min: 2
}), body("username", "Last Name is required").trim(), body("email").isEmail().normalizeEmail(), body("password", "Password must be of of 6 characters long and alphanumeric").trim().isLength({
  min: 6
}).isAlphanumeric(), body("confirmPassword").custom(function (value, _ref) {
  var req = _ref.req;

  if (value !== req.body.password) {
    throw new Error("Password Mismatch");
  }

  return true;
}), authController.signup);
router.post("/signin", authController.login);
module.exports = router;