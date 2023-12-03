export class RestApiError extends Error {
  statusCode: number; // HTTP status code associated with the error.
  errorCode: string;

  /**
   * @param {string} message - Error message.
   * @param {number} statusCode - HTTP status code (default: 500).
   */
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "A server error occurred.";
    this.statusCode = statusCode ?? 500;
    this.errorCode = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
