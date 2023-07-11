import { ErrorRequestHandler } from "express";
import config from "../../config";
import { ApiError } from "../../errors/ApiError";
import handleValidationError from "../../errors/handleValidationError";
import { IGenericErrorMessage } from "../../interfaces/error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(400).json({
    statusCode,
    success: false,
    message,
    errorMessages,
    stack: config.env === "DEVELOPMENT" && err?.stack,
  });
  next();
};
export default errorHandler;
