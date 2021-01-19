"use strict";

var User = require("../models/user");

var _require = require("../helpers/error"),
    errors = _require.errors;

exports.getUser = function _callee(req, res, next) {
  var username, userName, error, user, _error;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          username = req.params.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 4:
          userName = _context.sent;

          if (!(userName._id.toString() !== req.userId)) {
            _context.next = 8;
            break;
          }

          error = errors("Un-authorized", 401);
          throw error;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(User.findById(req.userId).populate("blogId"));

        case 10:
          user = _context.sent;

          if (user) {
            _context.next = 14;
            break;
          }

          _error = errors("User not found", 401);
          throw _error;

        case 14:
          res.status(200).json({
            message: "Fetched Successfully",
            user: user
          });
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.updateUser = function _callee2(req, res, next) {
  var username, fullName, bio, gender, title, image, email, user, error, _error2;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          username = req.body.username;
          fullName = req.body.fullName;
          bio = req.body.bio;
          gender = req.body.gender;
          title = req.body.title;
          image = req.body.image;
          email = req.body.email;

          if (req.file) {
            image = "images/".concat(req.file.originalname);
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(User.findById(req.userId).populate("blogId"));

        case 11:
          user = _context2.sent;

          if (user) {
            _context2.next = 15;
            break;
          }

          error = errors("User not Found", 404);
          throw error;

        case 15:
          if (image !== user.image) {
            clearImage(user.image);
          }

          if (!(user.username === username)) {
            _context2.next = 19;
            break;
          }

          _error2 = errors("Username chosen, pls select another one", 422);
          throw _error2;

        case 19:
          user.username = username;
          user.fullName = fullName;
          user.bio = bio;
          user.gender = gender;
          user.title = title;
          user.email = email;
          user.image = image;
          _context2.next = 28;
          return regeneratorRuntime.awrap(user.save());

        case 28:
          return _context2.abrupt("return", res.status(201).json({
            message: "Updated Successfully",
            user: user
          }));

        case 31:
          _context2.prev = 31;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 31]]);
};

var clearImage = function clearImage(filePath) {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, function (err) {
    console.log(err);
  });
};