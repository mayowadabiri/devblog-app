"use strict";

exports.errors = function (message, code) {
  if (code === 500) {
    var _error = new Error("Error accessing dataase, pls try later");

    _error.statusCode = 500;
    return _error;
  }

  var error = new Error(message);
  error.statusCode = code;
  return error;
};