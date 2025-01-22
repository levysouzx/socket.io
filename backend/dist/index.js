"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(4000, {
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on("message", (data) => {
        var _a;
        if ((_a = data.text) === null || _a === void 0 ? void 0 : _a.trim()) {
            io.emit("message", { id: socket.id, text: data.text });
        }
    });
    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});
console.log("Servidor rodando na porta 4000");
