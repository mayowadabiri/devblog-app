"use strict";

var express = require("express");

var path = require("path");

var mongoose = require("mongoose");

var multer = require("multer");

var authRoutes = require("./routes/auth");

var blogRoutes = require("./routes/blog");

var commentRoutes = require("./routes/comment");

var userRoutes = require("./routes/user");

var _require = require("./constants/mongoose"),
    MONGO_URI = _require.MONGO_URI;

var app = express();
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "images");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.originalname));
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "images/gif") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({
  storage: storage,
  fileFilter: fileFilter
}).single("image"));
app.use(express.json());
app.use(express.urlencoded());
app.use("/images", express["static"](path.join(__dirname, "images")));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use("/user", authRoutes);
app.use(blogRoutes);
app.use(commentRoutes);
app.use(userRoutes);
app.use(function (error, req, res, next) {
  console.log(error);
  var status = error.statusCode;
  var message = error.message;
  var data = error.data;
  res.status(status).json({
    message: message,
    status: status,
    data: data
  });
});
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  app.listen(8081, function () {
    console.log("Listening");
  });
})["catch"](function (error) {
  console.log(error);
});