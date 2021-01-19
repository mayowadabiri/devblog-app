"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  commentId: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Blog", blogSchema);