"use strict";

var express = require("express");

var userController = require("../controllers/user");

var _require = require("../helpers/isAuthenticated"),
    authentication = _require.authentication;

var router = express.Router();
router.get("/user/:id", authentication, userController.getUser);
router.put("/user/update", authentication, userController.updateUser);
module.exports = router;