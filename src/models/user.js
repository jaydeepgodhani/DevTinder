const mongoose = require("mongoose");
const validtor = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validtor.isEmail(value)) {
          throw new Error("Invalid email id my man...");
        }
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ['female', 'male'],
        message: '{VALUE} is not a gender'
      },
      validate(value) {
        // only called at creation time
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender not valid bro...");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "default about section",
    },
    skills: {
      // mongo adds default array even you dont pass
      type: [String],
    },
  },
  {
    timestamps: true, // mongo adds createdAt, updatedAt
  }
);

userSchema.index({firstName: 1, lastName: 1});

// arrow function wont work
userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "secretkey", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (pwd) {
  const user = this;
  const password = user.password;

  const isPasswordValid = bcrypt.compare(pwd, user.password);
  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
