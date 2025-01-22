"use client";
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

type Message = { id: string; text: string };

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("message", (data: Message) =>
      setMessages((prev) => [...prev, data])
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim() || !socket) return;
    const data = { id: socket.id ?? "desconhecido", text: message };
    socket.emit("message", data);
    setMessage("");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-black min-h-screen ">
      <div className="max-w-4xl mx-auto bg-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Socket.io</h1>
        <div className="border-blue-500 rounded-lg p-4 h-80 overflow-y-auto mb-4 bg-blue-500 shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 mb-2 rounded-lg transition-all duration-300 ease-in-out ${
                msg.id === socket?.id
                  ? "bg-blue-200 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <span className="block text-sm text-gray-700">
                {msg.id === socket?.id ? "Você" : `Usuário (${msg.id})`}
              </span>
              <p className="text-lg text-black">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none text-blue-500 font-semibold"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
