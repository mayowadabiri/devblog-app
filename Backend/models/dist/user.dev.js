"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    "default": ""
  },
  image: {
    type: String,
    "default": ""
  },
  gender: {
    type: String,
    required: true,
    "enum": ["Male", "Female", ""],
    "default": ""
  },
  title: {
    type: String,
    "default": ""
  },
  stack: [String],
  blogId: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Blog"
  }]
});
module.exports = mongoose.model("User", userSchema);