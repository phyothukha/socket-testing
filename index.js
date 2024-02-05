const express = require("express");
const socket = require("socket.io");

/** server set up */
const app = express();

const server = app.listen(4000, () => {
  console.log("server is running on port 4000");
});

/** ---route set up */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

const io = socket(server);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});
