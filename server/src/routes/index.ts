import { Router } from "express";
import { BaseController } from "../controllers/BaseController.js";

export class Routes {
  private router: Router;
  private baseController: BaseController;
  constructor(router: Router) {
    this.router = router;
    this.baseController = new BaseController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.baseController.base);
  }
}
