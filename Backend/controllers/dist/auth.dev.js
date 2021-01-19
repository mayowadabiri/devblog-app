"use strict";

var User = require("../models/user");

var _require = require("express-validator"),
    validationResult = _require.validationResult,
    body = _require.body;

var _require2 = require("../helpers/bcrypt"),
    bcryptHash = _require2.bcryptHash,
    salt = _require2.salt,
    bcryptCompare = _require2.bcryptCompare;

var _require3 = require("../helpers/error"),
    errors = _require3.errors;

var _require4 = require("../helpers/jwt"),
    jwtSignIn = _require4.jwtSignIn;

exports.signup = function _callee(req, res, next) {
  var result, err, _req$body, username, fullName, email, password, gender, findByMail, error, findByUsername, _error, hash, user, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          result = validationResult(req);

          if (result.isEmpty()) {
            _context.next = 6;
            break;
          }

          err = errors("Error processing request, check your inputs again", 401);
          err.data = result.array();
          throw err;

        case 6:
          _req$body = req.body, username = _req$body.username, fullName = _req$body.fullName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender;
          _context.next = 9;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 9:
          findByMail = _context.sent;

          if (!findByMail) {
            _context.next = 13;
            break;
          }

          error = errors("User already exists, register with another email", 422);
          throw error;

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 15:
          findByUsername = _context.sent;

          if (!findByUsername) {
            _context.next = 19;
            break;
          }

          _error = errors("Username chosen, Pls select another", 422);
          throw _error;

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(bcryptHash(password, salt));

        case 21:
          hash = _context.sent;
          user = new User({
            email: email,
            password: hash,
            username: username,
            fullName: fullName,
            gender: gender
          });
          _context.next = 25;
          return regeneratorRuntime.awrap(user.save());

        case 25:
          newUser = _context.sent;
          res.status(201).json({
            message: "User Created",
            email: email,
            username: username,
            fullName: fullName,
            id: newUser._id
          });
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 29]]);
};

exports.login = function _callee2(req, res, next) {
  var result, err, username, password, user, error, doMatch, _error2, token, _error3;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          result = validationResult(req);

          if (result.isEmpty()) {
            _context2.next = 6;
            break;
          }

          err = errors("Login Failed", 422);
          err.data = result.array();
          throw err;

        case 6:
          username = req.body.username;
          password = req.body.password;
          _context2.next = 10;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 10:
          user = _context2.sent;

          if (user) {
            _context2.next = 14;
            break;
          }

          error = errors("username/password incorrect", 404);
          throw error;

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(bcryptCompare(password, user.password));

        case 16:
          doMatch = _context2.sent;

          if (doMatch) {
            _context2.next = 20;
            break;
          }

          _error2 = errors("Email/Password incorrect", 401);
          throw _error2;

        case 20:
          _context2.next = 22;
          return regeneratorRuntime.awrap(jwtSignIn(user.email, user._id.toString()));

        case 22:
          token = _context2.sent;

          if (token) {
            _context2.next = 26;
            break;
          }

          _error3 = errors("Error generating token, pls sign in again", 400);
          throw _error3;

        case 26:
          res.status(200).json({
            message: "Loggedin successfully",
            token: token,
            id: user._id.toString(),
            username: user.username,
            image: user.image
          });
          _context2.next = 32;
          break;

        case 29:
          _context2.prev = 29;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 29]]);
};