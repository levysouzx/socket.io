"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server({
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
