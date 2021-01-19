"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleEdit = exports.fetchDetails = exports.fetchDetailsFailed = exports.fetchDetailsSuccess = exports.fetchDetailsStart = exports.updateUser = exports.updateUserFailed = exports.updateUserSuccess = exports.updateUserStart = exports.fetchUser = exports.fetchUserFailed = exports.fetchUserSuccess = exports.fetchUserStart = void 0;

var _axiosCreate = _interopRequireDefault(require("../../constants/axios-create"));

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchUserStart = function fetchUserStart() {
  return {
    type: actionTypes.FETCH__USER__START
  };
};

exports.fetchUserStart = fetchUserStart;

var fetchUserSuccess = function fetchUserSuccess(user) {
  return {
    type: actionTypes.FETCH__USER__SUCCESS,
    user: user
  };
};

exports.fetchUserSuccess = fetchUserSuccess;

var fetchUserFailed = function fetchUserFailed(error) {
  return {
    type: actionTypes.FETCH__USER__FAILED,
    error: error
  };
};

exports.fetchUserFailed = fetchUserFailed;

var fetchUser = function fetchUser(username) {
  return function (dispatch) {
    var token = localStorage.getItem("token");
    dispatch(fetchUserStart());

    _axiosCreate["default"].get("/user/".concat(username), {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    }).then(function (result) {
      localStorage.setItem("image", result.data.user.image);
      dispatch(fetchUserSuccess(result.data.user));
    })["catch"](function (error) {
      dispatch(fetchUserFailed({
        message: "Error Fetching User, Pls try again later. You might want to check your network connection "
      }));
    });
  };
};

exports.fetchUser = fetchUser;

var updateUserStart = function updateUserStart() {
  return {
    type: actionTypes.UPDATE__USER__START
  };
};

exports.updateUserStart = updateUserStart;

var updateUserSuccess = function updateUserSuccess(user) {
  return {
    type: actionTypes.UPDATE__USER__SUCCESS,
    user: user
  };
};

exports.updateUserSuccess = updateUserSuccess;

var updateUserFailed = function updateUserFailed(error) {
  return {
    type: actionTypes.UPDATE__USER__FAILED,
    error: error
  };
};

exports.updateUserFailed = updateUserFailed;

var updateUser = function updateUser(data, props) {
  return function (dispatch) {
    dispatch(updateUserStart());
    var token = localStorage.getItem("token");
    var username = props.match.params.username;

    _axiosCreate["default"].put("/user/update", data, {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    }).then(function (result) {
      dispatch(updateUserSuccess(result.data.user));
      localStorage.removeItem("image");
      localStorage.setItem("image", result.data.user.image);
      props.history.push("/".concat(username));
    })["catch"](function (error) {
      dispatch(updateUserFailed(error.response));
    });
  };
};

exports.updateUser = updateUser;

var fetchDetailsStart = function fetchDetailsStart() {
  return {
    type: actionTypes.FETCH__DETAILS__START
  };
};

exports.fetchDetailsStart = fetchDetailsStart;

var fetchDetailsSuccess = function fetchDetailsSuccess(details) {
  return {
    type: actionTypes.FETCH__DETAILS__SUCCESS,
    details: details
  };
};

exports.fetchDetailsSuccess = fetchDetailsSuccess;

var fetchDetailsFailed = function fetchDetailsFailed(error) {
  return {
    type: actionTypes.FETCH__DETAILS__FAILED,
    error: error
  };
};

exports.fetchDetailsFailed = fetchDetailsFailed;

var fetchDetails = function fetchDetails(username) {
  return function (dispatch) {
    dispatch(fetchDetailsStart());

    _axiosCreate["default"].get("/userByUsername/".concat(username)).then(function (result) {
      dispatch(fetchDetailsSuccess(result.data.user));
    })["catch"](function (error) {
      dispatch(fetchDetailsFailed(error.response));
    });
  };
};

exports.fetchDetails = fetchDetails;

var toggleEdit = function toggleEdit() {
  return {
    type: actionTypes.CHANGE__EDIT__STATE
  };
};

exports.toggleEdit = toggleEdit;