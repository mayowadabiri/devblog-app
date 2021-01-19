"use strict";

var fs = require("fs");

var path = require("path");

var jsonwebtoken = require("jsonwebtoken");

var secretKey = "dabirimayowaolawale";

exports.jwtSignIn = function _callee(email, id) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(jsonwebtoken.sign({
            email: email,
            id: id
          }, secretKey, {
            expiresIn: "2h"
          }));

        case 2:
          token = _context.sent;
          return _context.abrupt("return", token);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.jwtVerify = function (token) {
  // console.log(token)
  var signatory = jsonwebtoken.verify(token, secretKey);
  return signatory;
};