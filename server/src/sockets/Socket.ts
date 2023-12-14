import http from "http";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types/socketTypes.js";

export class Socket {
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  private io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  constructor(server: http.Server) {
    this.server = server;
    this.io = this.createServer();
    this.connection();
  }

  private connection() {
    this.io.on("connection", (socket) => {
      console.log(`user ${socket.id} connected`);

      socket.on("join_room", (room_id) => {
        socket.join(room_id);
        console.log(`User ${socket.id} joined room ${room_id}`);
      });

      socket.on("send_message", (data) => {
        console.log("message broad casted");
        socket.to(data.room).emit("receive_message", data);
      });
      socket.on("disconnect", () => {
        console.log(`user disconnected`);
      });
    });
  }

  createServer() {
    return new Server(this.server, {
      cors: { origin: "http://localhost:3000" },
    });
  }
}
