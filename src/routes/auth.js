const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, photoUrl, skills, about } = req.body;

  try {
    validateSignupData(req);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      photoUrl,
      skills,
      about,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully... ");
  } catch (err) {
    res.status(400).send("user not added..." + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8*3600000),
      });
      return res.json({message: "Login Successful !", user});
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Login failed..." + err.message);
  }
});

authRouter.post('/logout', async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
  });
  res.send('You\'re logout');
});

module.exports = authRouter;