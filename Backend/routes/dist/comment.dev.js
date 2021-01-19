"use strict";

var router = require("express").Router();

var commentController = require("../controllers/comment");

var _require = require("../helpers/isAuthenticated"),
    authentication = _require.authentication;

router.post("/comment/blog/:id", commentController.postComment);
module.exports = router;