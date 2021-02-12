// @ts-nocheck
const express = require("express");
const passport = require("passport");
require("./controllers/social");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const multer = require("multer");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");
const socialRoutes = require("./routes/social");
const { SERVER_ENDPOINT, SERVER_CONFIG } = require("./helpers/index");

console.log(process.env.GOOGLE_CLIENT_ID);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "images/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use(express.urlencoded());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// app.use("/", (req, res, next) => {
//   res.send("Server up and running");
//   res.end();
// });
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/social", socialRoutes);

app.use((error, req, res, next) => {
  if (error.name !== "Error") {
    console.log(error);
    return res.status(500).json({
      message: "Error proceessing request",
      code: 500,
    });
  }
  return res.status(400).json({
    message: error.msg,
    code: error.code,
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0bj1i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    const server = app.listen(SERVER_CONFIG.port, () => {
      console.log(`Server listening on ${SERVER_ENDPOINT}`);
    });
    const io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["OPTIONS, GET, POST, PUT, PATCH, DELETE"],
        credentials: true,
      },
    });
    io.on("connection", (socket) => {
      io.emit("hello", "world");
      io.on("reply", (arg) => {
        console.log(arg);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
