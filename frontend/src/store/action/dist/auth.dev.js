"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = exports.logout = exports.setInit = exports.login = exports.checkAuthTimeout = exports.loginFailed = exports.loginSuccess = exports.loginStart = exports.register = exports.registerFailed = exports.registerSuccess = exports.registerStart = void 0;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

var _axiosCreate = _interopRequireDefault(require("../../constants/axios-create"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-nocheck
var registerStart = function registerStart() {
  return {
    type: actionTypes.REGISTER__START
  };
};

exports.registerStart = registerStart;

var registerSuccess = function registerSuccess(user) {
  return {
    type: actionTypes.REGISTER__SUCCESS,
    user: user
  };
};

exports.registerSuccess = registerSuccess;

var registerFailed = function registerFailed(error) {
  return {
    type: actionTypes.REGISTER__FAILED,
    error: error
  };
};

exports.registerFailed = registerFailed;

var register = function register(userData, props) {
  return function (dispatch) {
    dispatch(registerStart());
    console.log(props);

    _axiosCreate["default"].post("/user/signup", userData).then(function (result) {
      dispatch(registerSuccess(result.data));
      props.history.push("/verifyemail");
    })["catch"](function (error) {
      console.log(error);

      if (error.response === undefined) {
        dispatch(registerFailed({
          message: "Internet Connection error"
        }));
      } else {
        dispatch(registerFailed(error.response.data));
      }
    });
  };
};

exports.register = register;

var loginStart = function loginStart() {
  return {
    type: actionTypes.LOGIN__START
  };
};

exports.loginStart = loginStart;

var loginSuccess = function loginSuccess(token) {
  return {
    type: actionTypes.LOGIN__SUCCESS,
    token: token
  };
};

exports.loginSuccess = loginSuccess;

var loginFailed = function loginFailed(error) {
  return {
    type: actionTypes.LOGIN__FAILED,
    error: error
  };
};

exports.loginFailed = loginFailed;

var checkAuthTimeout = function checkAuthTimeout(expire) {
  return function (dispatch) {
    setTimeout(function () {
      dispatch(logout());
    }, expire * 1000);
  };
};

exports.checkAuthTimeout = checkAuthTimeout;

var login = function login(loginData, props) {
  return function (dispatch) {
    dispatch(loginStart());

    _axiosCreate["default"].post("/user/signin", loginData).then(function (result) {
      var _result$data = result.data,
          token = _result$data.token,
          image = _result$data.image,
          username = _result$data.username;

      var expiresIn = _jsonwebtoken["default"].decode(token).exp;

      var expiration = new Date(expiresIn * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiration);
      localStorage.setItem("image", image);
      localStorage.setItem("username", username);
      dispatch(loginSuccess(token));
      checkAuthTimeout(expiresIn);

      if (props.location.search) {
        var redirect = Boolean(props.location.search.split("=").pop());

        if (redirect) {
          props.history.goBack();
        }
      } else {
        props.history.push("/home");
      }
    })["catch"](function (error) {
      console.log(error.response);
      dispatch(loginFailed(error.response.data));
    });
  };
};

exports.login = login;

var setInit = function setInit() {
  return {
    type: actionTypes.SET__INIT
  };
};

exports.setInit = setInit;

var logout = function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("image");
  localStorage.removeItem("username");
  return {
    type: actionTypes.LOGOUT__INIT
  };
};

exports.logout = logout;

var checkAuth = function checkAuth() {
  return function (dispatch) {
    var token = localStorage.getItem("token");
    var expiration = localStorage.getItem("expiresIn");
    var expiresIn = new Date(expiration);

    if (!token || expiresIn <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess(token));
      dispatch(checkAuthTimeout(Math.ceil(expiresIn.getTime() - new Date().getTime()) / 1000));
    }
  };
};

exports.checkAuth = checkAuth;