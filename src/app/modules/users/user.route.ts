import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.get("/", UserController.getUser);
router.post("/create-user", UserController.createUser);

export const UserRoutes = router;
