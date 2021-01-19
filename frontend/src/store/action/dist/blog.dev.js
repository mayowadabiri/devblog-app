"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBlogInit = exports.deleteBlog = exports.deleteBlogFailed = exports.deleteBlogSuccess = exports.deleteBlogStart = exports.updateBlog = exports.updateBlogFailed = exports.updateBlogSuccess = exports.updateBlogStart = exports.fetchBlog = exports.fetchBlogFailed = exports.fetchBlogSuccess = exports.fetchBlogStart = exports.fetchBlogs = exports.fetchBlogsFailed = exports.fetchBlogsSuccess = exports.fetchBlogsStart = exports.createBlog = exports.createFailed = exports.createSuccess = exports.createStart = void 0;

var _axiosCreate = _interopRequireDefault(require("../../constants/axios-create"));

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

var _user = require("./user");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createStart = function createStart() {
  return {
    type: actionTypes.CREATE__BLOG__START
  };
};

exports.createStart = createStart;

var createSuccess = function createSuccess(stories) {
  return {
    type: actionTypes.CREATE__BLOG__SUCCESS,
    stories: stories
  };
};

exports.createSuccess = createSuccess;

var createFailed = function createFailed(error) {
  return {
    type: actionTypes.CREATE__BLOG__FAILED,
    error: error
  };
};

exports.createFailed = createFailed;

var createBlog = function createBlog(data, props) {
  return function (dispatch) {
    var token = localStorage.getItem("token");
    dispatch(createStart());

    _axiosCreate["default"].post("/postBlog", data, {
      headers: {
        "Authorization": "Bearer ".concat(token)
      }
    }).then(function (result) {
      dispatch(createSuccess(result.data));
      props.history.push("/home");
    })["catch"](function (error) {
      dispatch(createFailed(error.response));
    });
  };
};

exports.createBlog = createBlog;

var fetchBlogsStart = function fetchBlogsStart() {
  return {
    type: actionTypes.FETCH__BLOGS__START
  };
};

exports.fetchBlogsStart = fetchBlogsStart;

var fetchBlogsSuccess = function fetchBlogsSuccess(blogs) {
  return {
    type: actionTypes.FETCH__BLOGS__SUCCESS,
    blogs: blogs
  };
};

exports.fetchBlogsSuccess = fetchBlogsSuccess;

var fetchBlogsFailed = function fetchBlogsFailed(error) {
  return {
    type: actionTypes.FETCH__BLOGS__FAILED,
    error: error
  };
};

exports.fetchBlogsFailed = fetchBlogsFailed;

var fetchBlogs = function fetchBlogs() {
  return function (dispatch) {
    dispatch(fetchBlogsStart());

    _axiosCreate["default"].get("/blogs").then(function (result) {
      var sortedBlogs = result.data.blogs.sort(function (a, b) {
        var x = new Date(a.createdAt),
            y = new Date(b.createdAt);
        return y - x;
      });
      dispatch(fetchBlogsSuccess(sortedBlogs));
    })["catch"](function (error) {
      dispatch(fetchBlogsFailed(error.response));
    });
  };
};

exports.fetchBlogs = fetchBlogs;

var fetchBlogStart = function fetchBlogStart() {
  return {
    type: actionTypes.FETCH__BLOG__START
  };
};

exports.fetchBlogStart = fetchBlogStart;

var fetchBlogSuccess = function fetchBlogSuccess(blog) {
  return {
    type: actionTypes.FETCH__BLOG__SUCCESS,
    blog: blog
  };
};

exports.fetchBlogSuccess = fetchBlogSuccess;

var fetchBlogFailed = function fetchBlogFailed(error) {
  return {
    type: actionTypes.FETCH__BLOG__FAILED,
    error: error
  };
};

exports.fetchBlogFailed = fetchBlogFailed;

var fetchBlog = function fetchBlog(id) {
  return function (dispatch) {
    dispatch(fetchBlogStart());

    _axiosCreate["default"].get("/blog/".concat(id)).then(function (result) {
      dispatch(fetchBlogSuccess(result.data.blog));
    })["catch"](function (error) {
      dispatch(fetchBlogFailed(error.response));
    });
  };
};

exports.fetchBlog = fetchBlog;

var updateBlogStart = function updateBlogStart() {
  return {
    type: actionTypes.UPDATE__BLOG__START
  };
};

exports.updateBlogStart = updateBlogStart;

var updateBlogSuccess = function updateBlogSuccess() {
  return {
    type: actionTypes.UPDATE__BLOG__SUCCESS
  };
};

exports.updateBlogSuccess = updateBlogSuccess;

var updateBlogFailed = function updateBlogFailed(error) {
  return {
    type: actionTypes.UPDATE__BLOG__FAILED,
    error: error
  };
};

exports.updateBlogFailed = updateBlogFailed;

var updateBlog = function updateBlog(data, props) {
  return function (dispatch) {
    var token = localStorage.getItem("token");
    dispatch(updateBlogStart());

    _axiosCreate["default"].put("blog/".concat(props.blog._id), data, {
      headers: {
        "Authorization": "Bearer ".concat(token)
      }
    }).then(function (result) {
      dispatch(updateBlogSuccess());
      props.history.push("/".concat(props.match.params.username));
    })["catch"](function (error) {
      dispatch(updateBlogFailed(error.response));
    });
  };
};

exports.updateBlog = updateBlog;

var deleteBlogStart = function deleteBlogStart() {
  return {
    type: actionTypes.DELETE__BLOG__START
  };
};

exports.deleteBlogStart = deleteBlogStart;

var deleteBlogSuccess = function deleteBlogSuccess(id) {
  return {
    type: actionTypes.DELETE__BLOG__SUCCESS,
    id: id
  };
};

exports.deleteBlogSuccess = deleteBlogSuccess;

var deleteBlogFailed = function deleteBlogFailed(error) {
  return {
    type: actionTypes.DELETE__BLOG__FAILED,
    error: error
  };
};

exports.deleteBlogFailed = deleteBlogFailed;

var deleteBlog = function deleteBlog(id, username) {
  return function (dispatch) {
    var token = localStorage.getItem("token");
    dispatch(deleteBlogStart());

    _axiosCreate["default"]["delete"]("/blog/".concat(id), {
      headers: {
        "Authorization": "Bearer ".concat(token)
      }
    }).then(function (result) {
      dispatch(deleteBlogSuccess(id));
      dispatch((0, _user.fetchUser)(username));
    })["catch"](function (error) {
      dispatch(deleteBlogFailed(error.response));
    });
  };
};

exports.deleteBlog = deleteBlog;

var setBlogInit = function setBlogInit() {
  return {
    type: actionTypes.SET__BLOG__INIT
  };
};

exports.setBlogInit = setBlogInit;