import cors from "cors";
import express, { Express, Router } from "express";
import http from "http";
import { BaseController } from "./controllers/BaseController.js";
import { Routes } from "./routes/index.js";
import { Socket } from "./sockets/Socket.js";

class App {
  private port: number;
  private express: Express;
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  constructor() {
    this.port = Number(process.env.PORT) || 8080;
    this.express = express();
    this.server = http.createServer(this.express);
    this.socketConnection();
    this.appConfig();
    this.includeRoutes();
  }

  private socketConnection() {
    new Socket(this.server);
  }

  private appConfig() {
    this.express.use(cors());
    // Error handler
    const controller = new BaseController();
    this.express.use(controller.errorHandler);
  }

  private includeRoutes() {
    const router = Router();
    this.express.use(router);
    new Routes(router);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

const app = new App();
app.start();
