const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const { authentication } = require("../helpers/index");

const router = express.Router();

router.post(
  "/signup",
  body("fullName", "First Name is required").trim().isLength({ min: 2 }),
  body("username", "Last Name is required").trim(),
  body("email").isEmail().normalizeEmail(),
  body("password", "Password must be of of 6 characters long and alphanumeric")
    .trim()
    .isLength({ min: 8 })
    .isAlphanumeric(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password Mismatch");
    }
    return true;
  }),
  authController.signup
);

router.post("/signin", authController.login);

router.post(`/confirmemail/:token`, authController.confirmation);

router.post("/forgotpassword", authController.forgotpassword);

router.post(
  "/resetpassword/:token",
  body("password", "Password must be of of 6 characters long and alphanumeric")
    .trim()
    .isLength({ min: 8 })
    .isAlphanumeric(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password Mismatch");
    }
    return true;
  }),
  authController.resetPassword
);

router.post("/resend", authController.resendLink);

module.exports = router;
