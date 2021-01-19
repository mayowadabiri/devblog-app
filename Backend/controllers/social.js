const passport = require("passport");
const FacebookStrategy = require("passport-facebook")
const TwitterStrategy = require("passport-twitter");
require("dotenv").config()

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

 module.exports = passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      profile: ["displayName", "username"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log(accessToken);
      const { email, name } = profile._json;
      const userData = {
        email,
        fullName: name,
      };
      console.log(userData);
      done(null, profile);
    }
  )
);

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey
//     }
//   )
// )
