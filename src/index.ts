import express from "express";
import http from "http";
import { Server } from "socket.io";
const { env } = process;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {});

app.get("/", (req, res, next) => {
  res.send("Hello, World!");
});

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
