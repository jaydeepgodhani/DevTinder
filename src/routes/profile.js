const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileDate } = require("../utils/validation");
const bcrypt = require('bcrypt');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isValid = validateEditProfileDate(req);
    if (!isValid) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({
      messsage: 'Profile updated successfully',
      data: loggedInUser
    })
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const isValid = Object.keys(req.body).includes('password');
    if (!isValid) {
      throw new Error("Password field required to update password");
    }
    const loggedInUser = req.user;
    const newPasswordIsValid = true;

    if(newPasswordIsValid) {
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      loggedInUser.password = passwordHash;
    } else {
      throw new Error('Password validation error');
    }
    await loggedInUser.save();
    res.json({
      messsage: 'Password updated successfully',
      data: loggedInUser
    })
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
