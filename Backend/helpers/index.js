const { bcryptCompare, bcryptHash, salt } = require("./bcrypt");
const { clearImage } = require("./clearImage");
const { sendMail } = require("./sendMail");
const { errors } = require("./error");
const { authentication } = require("./isAuthenticated");
const { jwtSignIn, jwtVerify } = require("./jwt");
const { SERVER_CONFIG, SERVER_ENDPOINT } = require("./env");

module.exports = {
  SERVER_CONFIG,
  SERVER_ENDPOINT,
  jwtSignIn,
  jwtVerify,
  authentication,
  errors,
  sendMail,
  clearImage,
  bcryptCompare,
  bcryptHash,
  salt,
};
