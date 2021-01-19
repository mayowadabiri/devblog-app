"use strict";

var _require = require("./jwt"),
    jwtVerify = _require.jwtVerify;

var _require2 = require("./error"),
    errors = _require2.errors;

exports.authentication = function _callee(req, res, next) {
  var token, error, signatory, _error;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.get("Authorization").split(" ")[1];

          if (token) {
            _context.next = 4;
            break;
          }

          error = errors("Error parsing token", 401);
          throw error;

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(jwtVerify(token));

        case 7:
          signatory = _context.sent;

          if (signatory) {
            _context.next = 11;
            break;
          }

          _error = errors("Invalid Token", 401);
          throw _error;

        case 11:
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](4);
          next(_context.t0);

        case 16:
          req.userId = signatory.id;
          next();

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 13]]);
};