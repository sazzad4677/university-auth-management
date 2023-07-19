import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUser();
  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: '',
    data: result,
  });
});
const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getUser,
};
