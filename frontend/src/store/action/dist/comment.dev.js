"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchComments = exports.fetchCommentsFailed = exports.fetchCommentsSuccess = exports.fetchCommentsStart = exports.createComment = exports.createCommentFailed = exports.createCommentSuccess = exports.createCommentStart = void 0;

var _axiosCreate = _interopRequireDefault(require("../../constants/axios-create"));

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var token = localStorage.getItem("token");

var createCommentStart = function createCommentStart() {
  return {
    type: actionTypes.CREATE__COMMENT__START
  };
};

exports.createCommentStart = createCommentStart;

var createCommentSuccess = function createCommentSuccess(comment) {
  return {
    type: actionTypes.CREATE__COMMENT__SUCCESS,
    comment: comment
  };
};

exports.createCommentSuccess = createCommentSuccess;

var createCommentFailed = function createCommentFailed(error) {
  return {
    type: actionTypes.CREATE__COMMENT__FAILED,
    error: error
  };
};

exports.createCommentFailed = createCommentFailed;

var createComment = function createComment(commentData, id) {
  return function (dispatch) {
    dispatch(createCommentStart());

    _axiosCreate["default"].post("/create/comment/".concat(id), commentData, {
      headers: {
        "Authorization": "Bearer ".concat(token)
      }
    }).then(function (result) {
      console.log(result.data);
      dispatch(createCommentSuccess(result.data.comment));
      dispatch(fetchComments(id));
    })["catch"](function (error) {
      dispatch(createCommentFailed(error.response));
    });
  };
};

exports.createComment = createComment;

var fetchCommentsStart = function fetchCommentsStart() {
  return {
    type: actionTypes.FETCH__COMMENT__START
  };
};

exports.fetchCommentsStart = fetchCommentsStart;

var fetchCommentsSuccess = function fetchCommentsSuccess(comments) {
  return {
    type: actionTypes.FETCH__COMMENT__SUCCESS,
    comments: comments
  };
};

exports.fetchCommentsSuccess = fetchCommentsSuccess;

var fetchCommentsFailed = function fetchCommentsFailed(error) {
  return {
    type: actionTypes.FETCH__COMMENT__FAILED,
    error: error
  };
};

exports.fetchCommentsFailed = fetchCommentsFailed;

var fetchComments = function fetchComments(id) {
  return function (dispatch) {
    dispatch(fetchCommentsStart());

    _axiosCreate["default"].get("/comment/blog/".concat(id), {
      headers: {
        "Authorization": "Bearer ".concat(token)
      }
    }).then(function (result) {
      dispatch(fetchCommentsSuccess(result.data.comments));
    })["catch"](function (error) {
      dispatch(fetchCommentsFailed(error.response));
    });
  };
};

exports.fetchComments = fetchComments;