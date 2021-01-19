const express = require("express");
const userController = require("../controllers/user");
const { authentication } = require("../helpers/isAuthenticated");
// const { redisMiddleware } = require("../helpers/rediscache");

const router = express.Router();

router.get(
  "/user/:id",
  authentication,
  // redisMiddleware,
  userController.getUser
);

router.put("/user/update", authentication, userController.updateUser);

router.get("/userByUsername/:username", userController.getUserByUsername);

module.exports = router;
