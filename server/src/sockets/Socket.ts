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
