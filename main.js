const express = require("express");
const fs = require("fs");
const { Server } = require("socket.io");
require("dotenv").config();
const app = express();
const PORT = 3000;
const isDevelopment = process.env.NODE_ENV === "development";

let options = {};
if (isDevelopment) {
  options = {
    key: fs.readFileSync("./localhost.key"),
    cert: fs.readFileSync("./localhost.crt"),
  };
}
const server = require(isDevelopment ? "https" : "http").Server(options, app);

app.use(express.static("public"));

const io = new Server(server);
const clients = {};
io.on("connection", (socket) => {
  clients[socket.id] = { id: socket.id };

  socket.on("signal", (peerId, signal) => {
    console.log(`Received signal from ${socket.id} to ${peerId}`);
    io.to(peerId).emit("signal", peerId, signal, socket.id);
  });

  io.emit("clients", clients);
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
