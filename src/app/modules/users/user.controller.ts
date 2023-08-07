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
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...user } = req.body;
  const result = await UserService.createStudent(student, user);

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...user } = req.body;
  const result = await UserService.createFaculty(faculty, user);

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  getUser,
};
