import express from "express";
import http from "http";
import { Server } from "socket.io";
import baseController from "./controller/base.js";
const { env } = process;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {});
const controller = new baseController()
app.get("/", controller.base);

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

const port = env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
