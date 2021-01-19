const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", ""],
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    isVerified:{
      type: Boolean,
      default: false,
      required: true
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Blog",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
