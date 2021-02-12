// @ts-nocheck
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const { errors, clearImage } = require("../helpers/index");
const cloudinary = require("cloudinary").v2;

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().lean().populate("userId", ["username"]);
    if (!blogs) {
      const error = errors("No Blog Found", 404);
      throw error;
    }
    res.status(200).json({
      status: 200,
      message: "Fetched Successfully",
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

exports.postBlog = async (req, res, next) => {
  const { file } = req;
  if (!file) {
    const error = errors("No image provided", 400);
    throw error;
  }
  try {
    const { title, content } = req.body;
    cloudinary.uploader.upload(
      `images/${file.originalname}`,
      {
        resource_type: "image",
        public_id: `${title.replace(/\s/g, "")}`,
      },
      async (error, result) => {
        let url = result.url;
        console.log(result.url, error);
        console.log(url, "from url");
        const blog = new Blog({
          title,
          content,
          image: url,
          userId: req.userId,
        });
        await blog.save();
        const user = await User.findById(req.userId);
        user.blogs.push(blog._id);
        await user.save();
        res.status(201).json({ message: "Created Successfully", blog });
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id)
      .lean()
      .populate("userId", ["fullName"])
      .exec();
    if (!blog) {
      const error = errors("No blog found", 404);
      throw error;
    }
    res.status(200).json({
      message: "Fetched successfully",
      blog,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      const error = errors("Not found", 404);
      throw error;
    }
    if (blog.userId.toString() !== req.userId) {
      const error = errors("You're not allowed to update this blog", 403);
      throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let image = req.body.image;
    if (req.file) {
      image = `images/${req.file.originalname}`;
    }
    blog.title = title;
    blog.content = content;
    blog.image = image;
    await blog.save();
    return res.status(201).json({
      message: "Fecthed Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      const error = errors("Not found", 404);
      error;
    }
    if (blog.userId.toString() !== req.userId.toString()) {
      const error = errors("You're not allowed to update this blog", 403);
      throw error;
    }
    clearImage(blog.image);
    await Blog.findByIdAndRemove(blogId);
    const user = await User.findById(blog.userId);
    await user.blogs.pull(blogId);
    await user.save();
    await Comment.deleteMany({ blogId: blogId });
    return res.status(201).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
