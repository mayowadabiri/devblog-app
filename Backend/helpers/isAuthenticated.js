// @ts-nocheck
const { jwtVerify } = require("./jwt");
const { errors } = require("./error");
exports.authentication = async (req, res, next) => {
  try {
    const authority = req.get("Authorization");
    if (!authority) {
      const error = errors("You need to login to view details", 400);
      throw error;
    }
    const token = authority.split(" ")[1];
    if (!token) {
      const error = errors("Error parsing token", 401);
      throw error;
    }
    const signatory = await jwtVerify(token);
    req.userId = signatory.id;
    next();
  } catch (error) {
    next(error);
  }
};
