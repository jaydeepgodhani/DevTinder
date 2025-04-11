const express = require('express')

const app = express();

app.use("/admin", (req, res, next) => {
  // handle auth middleware for all GET, POST, DELETE etc
  // If we want middlewares only for GET then use as app.get
  const token = 'valid';
  const isAdmin = token === 'valid';
  if(isAdmin) {
    next();
  } else {
    res.send("you are not authorized");
  }
});

app.get("/admin/getAllData", (req, res) => {
  const token = 'valid';
  const isAdmin = token === 'valid';
  if(isAdmin) {
    res.send("you are admin");
  } else {
    res.send("you are not authorized");
  }
  // now what if we want to check for authorization for all admin requests
  // in that case middleware is used
  // you can use with app.use('/admin') and all request will go through first /admin then to the actual request /admin/xyz
  // updated code below
  res.send("you are admin");
})

// route /ur or /user works
app.get("/us?r", (req, res) => {
  res.send({yo: "man", what: "up ??"});
})

// route /ussssr or /usr... works
app.get("/us+r", (req, res) => {
  res.send({yo: "man", what: "up ??"});
})

// route /usabcdr /usr /usABCr... works
app.get("/us*r", (req, res) => {
  res.send({yo: "man", what: "up ??"});
})

// this will only handle GET call to /user/*
app.get("/user", (req, res) => {
  res.send({yo: "man", what: "up ??"});
})

// this will match all the HTTP method API calls to /test/*
app.use("/test/:userId", (req, res, next) => {
  // request query with ?abc=xyz&name=jaydeep
  console.log(req.query);
  // dynamic params with /test/708
  console.log(req.params); // {userId: 708}
  res.send("hi there"); // commenting this line wont send control to next handler
  next(); // to let this work, comment out res.send first
  // even if you dont comment res.send then next handler will be called also we'll get output in postman as hi there
  // all this functions with next() is called middleware
  // here we can export this function as middleware and use it here, in case of next() only call the next function
}, (req, res) => {
  console.log('second route handler');
  res.send("second handler");
})

// Ideally this path should be the last to catch err from any of the above path if uncaught
app.use("/", (err, req, res, next) => {
  // in case of 4 parameters, first one is err, then req, res, next
  if(err) {
    res.send("there's uncaught err above somewhere my friend");
  }
})

app.listen(7777, () => {
  console.log("server is listening on 7777...");
});