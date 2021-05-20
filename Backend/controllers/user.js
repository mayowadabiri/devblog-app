// @ts-nocheck
const User = require("../models/user");
const { errors } = require("../helpers/error");
const path = require("path");
const Blog = require("../models/blog");
const { clearImage } = require("../helpers/index");

exports.getUser = async (req, res, next) => {
  try {
    const username = req.params.id;
    const userName = await User.findOne({ username: username });

    if (userName._id.toString() !== req.userId) {
      const error = errors("Un-authorized", 403);
      throw error;
    }
    const user = await User.findById(req.userId).lean().populate("blogs");
    if (!user) {
      const error = errors("User not found", 404);
      throw error;
    }
    res.status(200).json({
      message: "Fetched Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const fullName = req.body.fullName;
    const bio = req.body.bio;
    const gender = req.body.gender;
    const title = req.body.title;
    let image = req.body.image;
    const email = req.body.email;
    if (req.file) {
      image = `images/${req.file.originalname}`;
    }

    const findByUsername = await User.findOne({ username: username });
    if (findByUsername && findByUsername._id.toString() !== req.userId) {
      const error = errors("Username chosen, pls select another one", 422);
      throw error;
    }

    const user = await User.findById(req.userId).populate("blogs");
    if (!user) {
      const error = errors("User not Found", 404);
      throw error;
    }
    if (image !== user.image) {
      clearImage(user.image);
    }
    user.username = username;
    user.fullName = fullName;
    user.bio = bio;
    user.gender = gender;
    user.title = title;
    user.email = email;
    user.image = image;
    await user.save();
    return res.status(201).json({
      message: "Updated Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }).populate("blogs");
    if (!user) {
      const error = errors("No user found", 404);
      throw error;
    }
    return res.status(200).json({
      message: "Fetched Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
