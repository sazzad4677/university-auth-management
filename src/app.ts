import cors from 'cors';
import express, { Application } from 'express';
import errorHandler from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoute } from './app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from './app/modules/users/user.route';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Route
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semesters', AcademicSemesterRoute);

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//     // throw new Error("Hello");
//     // res.status(200).json({
//     //     message: "hello"
//     // })
// });

app.use(errorHandler);

export default app;
