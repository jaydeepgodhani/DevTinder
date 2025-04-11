const http = require("node:http");

const server = http.createServer(function (req, res) {
  if (req.url === '/get-secret-data'){
    res.end("No secret data");
  }
  res.end("Hello from NodeJS");
});

server.listen(7777);