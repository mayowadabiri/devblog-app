const express = require("express");
const passport = require("passport");

const router = express.Router();


router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail",
  })
);

router.get("http://localhost:3000", (req, res) => {
  res.send("Failed attempt");
});

router.get("http://localhost:3000", (req, res) => {
  res.send("Success");
});



module.exports = router