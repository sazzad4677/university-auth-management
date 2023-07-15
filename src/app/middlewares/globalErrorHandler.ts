/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import { ApiError } from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';
import handleZodError from '../../errors/handleZodError';

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorMessages: IGenericErrorMessage[] = [];
  config.env === 'DEVELOPMENT'
    ? console.error('error', err)
    : errorLogger.error(err);

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'DEVELOPMENT' && err?.stack,
  });
  next();
};
export default errorHandler;
