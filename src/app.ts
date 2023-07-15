import cors from 'cors';
import express, { Application } from 'express';
import errorHandler from './app/middlewares/globalErrorHandler';
import routes from './routes';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/', routes);

app.use(errorHandler);

export default app;
