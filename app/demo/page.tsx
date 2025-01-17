"use client";
import React, { useMemo } from "react";
import { io } from "socket.io-client";

const Page = () => {
  const socket = useMemo(() => io("http://localhost:4000"), []);
  socket.on("connect", () => {
    console.log("Socket conectado");
  });
  socket.on("message", (data, id) => {
    console.log(data + " " + id);
  });
  return (
    <div>
      <h1>Página demo do sock</h1>
    </div>
  );
};

export default Page;
