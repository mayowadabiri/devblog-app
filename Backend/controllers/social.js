const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const User

exports.google = async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return res.status(200).json({
      message: "Logged In successfully",
      payload,
    });
  } catch (error) {
    console.log(error);
  }
};
