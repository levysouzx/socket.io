import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("message", (data) => {
    if (data.text?.trim()) {
      io.emit("message", { id: socket.id, text: data.text });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

console.log("Servidor rodando na porta 4000");
