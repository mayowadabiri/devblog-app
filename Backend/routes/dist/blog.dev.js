"use strict";

var express = require("express");

var blogController = require("../controllers/blog");

var _require = require("../helpers/isAuthenticated"),
    authentication = _require.authentication;

var router = express.Router();
router.get("/blogs", blogController.getBlogs);
router.post("/postBlog", authentication, blogController.postBlog);
router.get("/blog/:id", blogController.getBlog);
router.put("/blog/:id", authentication, blogController.updateBlog);
router["delete"]("/blog/:id", authentication, blogController.deleteBlog);
module.exports = router;