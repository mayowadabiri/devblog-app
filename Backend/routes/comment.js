const router = require("express").Router();
const commentController = require("../controllers/comment");
const { authentication } = require("../helpers/index");
// const { redisMiddleware } = require("../helpers/rediscache");

router.post("/create/comment/:id", authentication, commentController.postComment);

router.get("/comment/blog/:id", commentController.getComments)

module.exports = router;
