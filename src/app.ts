import cors from "cors";
import express, { Application } from "express";
import errorHandler from "./app/middlewares/globalErrorHandler";
import { UserRoutes } from "./app/modules/users/user.route";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Route
app.use("/api/v1/users", UserRoutes);

// app.get("/", async (req: Request, res: Response) => {
//   // throw new ApiError(400,"Hello I Got an Error")
// });

app.use(errorHandler);

export default app;
