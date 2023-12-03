import autoBind from "auto-bind";
import { NextFunction, Response, Request } from "express";
import { RestApiError } from "../errors/RestApiError.js";

export class BaseController {
  constructor() {
    autoBind(this);
  }

  base(req: Request, res: Response, next: NextFunction) {
    try {
      return this.response(res, 200, "Chat Api Running");
    } catch (error) {
      next(error);
    }
  }

  /** Rest api error handler */
  errorHandler(error: any, req: Request, res: Response) {
    if (error instanceof RestApiError) {
      return this.ErrResponse(res, error);
    }
    return this.ErrResponse(res, new RestApiError(error.message));
  }

  /** HTTP error response */
  protected ErrResponse(res: Response, error: RestApiError) {
    return res.status(error.statusCode).json({
      success: false,
      status: error.statusCode,
      error: error.name,
      message: error.message,
    });
  }

  /** Data transfer objet for an HTTP response */
  protected response(
    res: Response,
    code: number,
    message: string,
    data?: Record<string, any>
  ): Response {
    const dto: Record<string, any> = { success: true, status: code, message };

    if (data) dto.data = data;
    return res.status(code).json(dto);
  }
}
