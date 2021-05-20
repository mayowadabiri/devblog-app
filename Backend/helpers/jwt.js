const jsonwebtoken = require("jsonwebtoken");
const { privateKey, publicKey } = require("../constants/index");

exports.jwtSignIn = async (email, id) => {
  try {
    const token = await jsonwebtoken.sign(
      {
        email,
        id,
      },
      privateKey,
      { expiresIn: "2h", algorithm: "RS256" }
    );

    return token;
  } catch {
    throw new jsonwebtoken.JsonWebTokenError(
      "Error generation token, try after few mins"
    );
  }
};

exports.jwtVerify = async (token) => {
  try {
    const signatory = await jsonwebtoken.verify(token, publicKey);
    return signatory;
  } catch (error) {
    console.log(error);
    throw new jsonwebtoken.JsonWebTokenError("Error, proceessing Request");
  }
};
