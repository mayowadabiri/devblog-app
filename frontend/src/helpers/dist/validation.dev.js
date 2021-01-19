"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URLChecker = exports.checkLength = exports.confirmPassword = exports.password = exports.email = exports.fullname = exports.username = exports.required = void 0;

var required = function required(value) {
  return {
    isTrue: value.trim() !== "" && value.trim() !== null,
    msg: value.trim() !== "" && value.trim() !== null ? "" : "Required"
  };
};

exports.required = required;

var username = function username(value) {
  var regex = /^[a-zA-Z0-9]+$/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value) ? "" : "Username must be either letters and numbers"
  };
};

exports.username = username;

var fullname = function fullname(value) {
  var regex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value) ? "" : "Enter your Full Name"
  };
};

exports.fullname = fullname;

var email = function email(value) {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value) ? "" : "Enter a valid email"
  };
};

exports.email = email;

var password = function password(value) {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value) ? "" : "Password must be 8 characters long and must contain letters and numbers"
  };
};

exports.password = password;

var confirmPassword = function confirmPassword(cPassword, password) {
  return {
    isTrue: cPassword === password,
    msg: cPassword === password ? "" : "Password Mismatch"
  };
};

exports.confirmPassword = confirmPassword;

var checkLength = function checkLength(value) {
  return {
    isTrue: value.length > 1000,
    msg: value.length > 1000 ? "" : "must be more than 1000 letters"
  };
};

exports.checkLength = checkLength;

var URLChecker = function URLChecker(value) {
  var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  return {
    isTrue: regex.test(value) || value.trim() === "",
    msg: regex.test(value) ? "" : "Must be a valid URL"
  };
};

exports.URLChecker = URLChecker;