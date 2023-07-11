import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUser();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to get user, ${error}`,
    });
  }
};
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getUser,
};
