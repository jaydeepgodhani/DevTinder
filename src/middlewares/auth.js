const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { validateSignupData } = require("../utils/validation");

const userAuth = async (req, res, next) => {
  // read the tokenfrom req cookie
  // validate the token
  // find the user
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send('Not Authorized Bro...');
    }
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(400).json({message: "ERROR : " + err.message});
  }
};

module.exports = {
  userAuth,
};
