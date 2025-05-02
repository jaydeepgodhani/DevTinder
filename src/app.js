const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// this is middleware provided by express by default to get json data
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require("./routes/user");

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const users = await User.find({ emailId: email });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("nothing to find for...");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("nothing to find for...");
  }
});

app.delete("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  try {
    const users = await User.findByIdAndDelete(userId); // _id or ({ _id: userId })
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch (err) {
    res.status(400).send("nothing to delete for...");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );

  try {
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("nothing to update for...");
  }
});

connectDb()
  .then(() => {
    console.log("db connected !!");

    app.listen(7777, () => {
      console.log("server running ...");
    });
  })
  .catch((err) => {
    console.log("err is ... "+ err);
  });
