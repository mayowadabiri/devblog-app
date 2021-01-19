const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");

exports.postComment = async (req, res, next) => {
  try {
    const userId = req.userId;

    const id = req.params.id;
    const content = req.body.content;
    const comment = new Comment({
      content,
      blogId: id,
      userId: userId,
    });
    await comment.save();
    const user = await User.findById(userId);
    user.comments.push(comment);
    await user.save();
    const blog = await Blog.findById(id);
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json({
      message: "Posted successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ blogId: blogId })
      .lean()
      .populate("userId", "image");
    if (comments.length === 0) {
      return res.status(200).json({
        message: "No Comment",
        comments: [],
      });
    } else {
      return res.status(200).json({
        message: "Fetced Successfully",
        comments,
      });
    }
  } catch (error) {
    next(error);
  }
};
