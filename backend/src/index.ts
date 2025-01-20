import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Permite conexões do frontend
  },
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("message", (data) => {
    io.emit("message", { id: socket.id, text: data.text }); // Envia a mensagem para todos os clientes
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log("Servidor começou na porta 4000");
});
