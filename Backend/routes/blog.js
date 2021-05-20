const express = require("express");
const blogController = require("../controllers/blog");
const { authentication } = require("../helpers/index");
// const {redisMiddleware} = require("../helpers/rediscache")

const router = express.Router();

router.get("/get/blogs", blogController.getBlogs);

// localhost:8080/blogs

router.post("/post-blog", authentication, blogController.postBlog);

// localhost:808/postBlog

router.get("/blog/:id", blogController.getBlog);

router.put("/blog/:id", authentication, blogController.updateBlog);

router.delete("/blog/:id", authentication, blogController.deleteBlog);

module.exports = router;
