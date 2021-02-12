const express = require("express");
const socialController = require("../controllers/social")

const router = express.Router();

router.post("/google", socialController.google)


module.exports = router