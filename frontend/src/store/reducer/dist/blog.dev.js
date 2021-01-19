"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var actionTypes = _interopRequireWildcard(require("../action/actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  blogs: [],
  blog: {
    userId: {}
  },
  loading: false,
  error: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actionTypes.CREATE__BLOG__START:
      return _objectSpread({}, state, {
        loading: true
      });

    case actionTypes.CREATE__BLOG__SUCCESS:
      return _objectSpread({}, state, {
        loading: false
      });

    case actionTypes.CREATE__BLOG__FAILED:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case actionTypes.FETCH__BLOGS__START:
      return _objectSpread({}, state, {
        loading: true,
        error: null
      });

    case actionTypes.FETCH__BLOGS__SUCCESS:
      return _objectSpread({}, state, {
        blogs: action.blogs,
        loading: false
      });

    case actionTypes.FETCH__BLOGS__FAILED:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case actionTypes.FETCH__BLOG__START:
      return _objectSpread({}, state, {
        loading: true,
        blog: {
          userId: {}
        }
      });

    case actionTypes.FETCH__BLOG__SUCCESS:
      return _objectSpread({}, state, {
        blog: action.blog,
        loading: false
      });

    case actionTypes.FETCH__BLOG__FAILED:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case actionTypes.UPDATE__BLOG__START:
      return _objectSpread({}, state, {
        loading: true
      });

    case actionTypes.UPDATE__BLOG__SUCCESS:
      return _objectSpread({}, state, {
        loading: false
      });

    case actionTypes.UPDATE__BLOG__FAILED:
      return _objectSpread({}, state, {
        loading: false,
        error: action.error
      });

    case actionTypes.SET__BLOG__INIT:
      return _objectSpread({}, state, {
        blog: {
          comments: [],
          user: {},
          loading: false
        }
      });

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;