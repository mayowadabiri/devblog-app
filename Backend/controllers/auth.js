const User = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const { validationResult, body } = require("express-validator");
const {
  bcryptCompare,
  bcryptHash,
  errors,
  jwtSignIn,
  transporter,
  salt,
} = require("../helpers/index");

exports.signup = async (req, res, next) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const err = errors(
        "Error processing request, check your inputs again",
        401
      );
      err.data = result.array();
      throw err;
    }
    const {
      username,
      fullName,
      email,
      password,
      gender,
      twitter,
      github,
      linkedIn,
    } = req.body;
    const findByMail = await User.findOne({ email: email });
    if (findByMail) {
      const error = errors("User already exist with email address", 403);
      throw error;
    }
    const findByUsername = await User.findOne({ username: username });
    if (findByUsername) {
      const error = errors("Username chosen, Pls select another", 403);
      throw error;
    }
    const hash = await bcryptHash(password, salt);
    const user = new User({
      email: email,
      password: hash,
      username: username,
      fullName: fullName,
      gender: gender,
      twitter: twitter,
      linkedIn: linkedIn,
      github: github,
      isVerified: false,
    });
    const token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      userId: user._id,
    });
    const newUser = await user.save();
    await token.save();
    let mailOptions = {
      from: "no-reply@devstory.com",
      to: newUser.email,
      subject: "Email Account Verification",
      html: `<p> Hi, ${newUser.fullName},</p>
          <p>You have successfully registered on the Dev Blog platform, to continue, you need to verify your email </p>
          <p>Click <a href=${`http://localhost:3000/confirmemail/${token.token}`}>here</a> to verify</p>
          <p>Pls, note that this link lasts for 1 hour after which it gets expired</p>
          <br>
          <p>Warm Regards</p>
          <p>The DevBlog Team</p> 
      `,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        const error = errors("Error sending email", 500);
        throw new error();
      }
    });
    res.status(201).json({
      message: "User Created",
      email,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const err = errors("Login Failed", 422);
      err.data = result.array();
      throw err;
    }
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username });
    if (!user) {
      const error = errors("No user found with such record", 404);
      throw error;
    }
    if (!user.isVerified) {
      const error = errors(
        "Account not verified yet, Verify your email to continue",
        405
      );
      throw error;
    }
    const doMatch = await bcryptCompare(password, user.password);
    if (!doMatch) {
      const error = errors("Incorrect email/password", 400);
      throw error;
    }

    const token = await jwtSignIn(user.email, user._id.toString());

    return res.status(200).json({
      message: "Loggedin successfully",
      token,
      id: user._id.toString(),
      username: user.username,
      image: user.image,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.confirmation = async (req, res, next) => {
  try {
    const token = req.params.token;

    const userToken = await Token.findOne({ token: token });
    if (!userToken) {
      const error = errors(
        "Email confirmation has expired, kindly resend to confirm your email",
        400
      );
      throw error;
    }
    const user = await User.findOne({ _id: userToken.userId });
    if (!user) {
      const error = errors("Token already expired", 400);
      throw error;
    }
    if (user.isVerified) {
      const error = errors(
        "User already verified, login to start blogging",
        404
      );
      throw error;
    }

    user.isVerified = true;
    await user.save();
    await Token.deleteOne({ token: token });
    return res.status(200).json({
      message: "Email address successfully verified. You can login",
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = errors("No user found with such email address", 404);
      throw error;
    }
    const token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      userId: user._id,
    });
    await token.save();
    const mailOptions = {
      from: "no-reply@devstory.com",
      to: email,
      subject: "Password Recovery",
      html: `<p> Hi, ${user.fullName},</p>
          <p>A request has been made to reset your password on the DevBlog platform </p>
          <p>Click <a href=${`http://localhost:3000/resetpassword/${token.token}`}>here</a> to reset</p>
          <p>If you don't wish to rest your password, pls disregard this mail and no action will be taken</p>
          <p>Pls, note that this link lasts for 1 hour after which it gets expired</p>
          <br>
          <p>Warm Regards</p>
          <p>The DevBlog Team</p> 
      `,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        const error = errors("Error sending email", 500);
        throw error;
      }
      console.log(info)
      console.log(`Password reset sent to ${email}`);
    });
    res.status(200).json({
      message: "Successful",
      email,
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const tokenId = req.params.token;
    const token = await Token.findOne({ token: tokenId });
    if (!token) {
      const error = errors("Token expired", 500);
      throw error;
    }
    const user = await User.findOne({ _id: token.userId });
    const password = req.body.password;
    const hash = await bcryptHash(password, salt);
    user.password = hash;
    await user.save();
    await Token.deleteOne({ token: tokenId });
    return res.status(200).json({
      message: "Successful",
    });
  } catch (error) {
    next(error);
  }
};

exports.resendLink = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = errors("No user found with such email address", 404);
      throw error;
    }
    const token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      userId: user._id,
    });
    await token.save();
    let mailOptions = {
      from: "no-reply@devstory.com",
      to: user.email,
      subject: "Email Account Verification",
      html: `<p> Hi, ${user.fullName},</p>
          <p>Click <a href=${`http://localhost:3000/confirmemail/${token.token}`}>here</a> to verify</p>
          <p>Pls, note that this link lasts for 1 hour after which it gets expired</p>
          <br>
          <p>Warm Regards</p>
          <p>The DevBlog Team</p> 
      `,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        const error = errors("Error sending email", 500);
        throw new error();
      }
    });
    res.status(200).json({
      email: user.email,
      message: "Sent Successfully"
    })
  } catch (error) {
    next(error);
  }
};
