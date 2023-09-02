import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import errorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import routes from './routes';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/', routes);

// handle not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Invalid Path',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Path not found',
      },
    ],
  });
  next();
});

app.use(errorHandler);

export default app;
