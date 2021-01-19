"use strict";

var Blog = require("../models/blog");

var User = require("../models/user");

var _require = require("../helpers/error"),
    errors = _require.errors;

var Comment = require("../models/comment");

var _require2 = require("express-validator"),
    body = _require2.body;

exports.getBlogs = function _callee(req, res, next) {
  var blogs, error;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Blog.find().populate("userId", ["firstName", "lastName"]));

        case 3:
          blogs = _context.sent;

          if (blogs) {
            _context.next = 7;
            break;
          }

          error = errors("No Blog Found", 404);
          throw error;

        case 7:
          res.status(200).json({
            message: "Fetched Successfully",
            blogs: blogs
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.postBlog = function _callee2(req, res, next) {
  var file, error, _req$body, title, content, blog, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          file = req.file; // console.log(req.file)

          if (file) {
            _context2.next = 4;
            break;
          }

          error = errors("No image provided", 404);
          throw error;

        case 4:
          _context2.prev = 4;
          _req$body = req.body, title = _req$body.title, content = _req$body.content;
          blog = new Blog({
            title: title,
            content: content,
            image: "images/".concat(file.originalname),
            userId: req.userId
          });
          _context2.next = 9;
          return regeneratorRuntime.awrap(blog.save());

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(User.findById(req.userId));

        case 11:
          user = _context2.sent;
          user.blogId.push(blog._id);
          _context2.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          res.status(201).json({
            message: "Created Successfully",
            blog: blog
          });
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](4);
          next(_context2.t0);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 18]]);
};

exports.getBlog = function _callee3(req, res, next) {
  var id, blog, error;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Blog.findById(id).populate("userId", ["firstName", "lastName"]).populate("commentId").exec());

        case 4:
          blog = _context3.sent;

          if (blog) {
            _context3.next = 8;
            break;
          }

          error = errors("Error fetching blog", 404);
          throw error;

        case 8:
          res.status(200).json({
            message: "Fetched successfully",
            blog: blog
          });
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.updateBlog = function _callee4(req, res, next) {
  var id, blog, error, _error, title, content, image;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Blog.findById(id));

        case 4:
          blog = _context4.sent;

          if (blog) {
            _context4.next = 8;
            break;
          }

          error = errors("Not found", 404);
          throw error;

        case 8:
          if (!(blog.userId.toString() !== req.userId)) {
            _context4.next = 11;
            break;
          }

          _error = errors("Unauthorized", 401);
          throw _error;

        case 11:
          title = req.body.title;
          content = req.body.content;
          image = req.body.image;

          if (req.file) {
            image = "images/".concat(req.file.originalname);
          }

          blog.title = title;
          blog.content = content;
          blog.image = image;
          _context4.next = 20;
          return regeneratorRuntime.awrap(blog.save());

        case 20:
          return _context4.abrupt("return", res.status(201).json({
            message: "Fecthed Successfully"
          }));

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

exports.deleteBlog = function _callee5(req, res, next) {
  var blogId, blog, error, _error2, user;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          blogId = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Blog.findById(blogId));

        case 4:
          blog = _context5.sent;

          if (blog) {
            _context5.next = 8;
            break;
          }

          error = errors("Not found", 404);
          throw error;

        case 8:
          if (!(blog.userId.toString() !== req.userId.toString())) {
            _context5.next = 11;
            break;
          }

          _error2 = errors("Unauthorized", 401);
          throw _error2;

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap(Blog.findByIdAndRemove(blogId));

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(User.findById(blog.userId));

        case 15:
          user = _context5.sent;
          _context5.next = 18;
          return regeneratorRuntime.awrap(user.blogId.pull(blogId));

        case 18:
          _context5.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          _context5.next = 22;
          return regeneratorRuntime.awrap(Comment.deleteMany({
            blogId: blogId
          }));

        case 22:
          return _context5.abrupt("return", res.status(200).json({
            message: "Deleted Successfully"
          }));

        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 28:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 25]]);
};