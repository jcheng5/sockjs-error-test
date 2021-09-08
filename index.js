const http = require("http");
const sockjs = require("sockjs");
const node_static = require('node-static');

const echo = sockjs.createServer();
echo.on("connection", function(conn) {
  conn.on("data", function(message) {
    console.log("Message received:", message);
    conn.write(message);
  });
  conn.on("close", function() {
    console.log("Close");
  });
});

const static_directory = new node_static.Server(__dirname);

const server = http.createServer();
server.on("request", (req, res) => {
  static_directory.serve(req, res);
});
echo.installHandlers(server, {prefix: "/echo"});
server.listen(9999, "0.0.0.0");
