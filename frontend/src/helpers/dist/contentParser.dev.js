"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseContent = void 0;

var parseContent = function parseContent(blogContent) {
  var content = blogContent.split(" ");
  var newContent = [];
  var count = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = content[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var s = _step.value;

      for (var x = 0; x < s.length; x++) {
        count++;
      }

      if (count > 210) {
        break;
      }

      newContent.push(s);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newContent.join(" ");
};

exports.parseContent = parseContent;