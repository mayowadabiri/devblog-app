"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var axiosURL = _axios["default"].create({
  baseURL: "https://api-dev-story.herokuapp.com/"
});

var _default = axiosURL;
exports["default"] = _default;