import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getUser();
    next();
    sendResponse(res, {
      statusCode: StatusCodes.ACCEPTED,
      success: true,
      message: '',
      data: result,
    });
  },
);
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await UserService.createUser(user);
    next();
    sendResponse(res, {
      statusCode: StatusCodes.ACCEPTED,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  },
);

export const UserController = {
  createUser,
  getUser,
};
