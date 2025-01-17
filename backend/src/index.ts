const express = require("express");
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer();

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  io.emit("message", "Olá, mundo!", socket.id);
});

server.listen(4000, () => {
  console.log("Servidor iniciado na porta", 4000);
});
