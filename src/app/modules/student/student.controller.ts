import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, pagination);
  const filters = pick(req.query, studentFilterableFields);
  const result = await StudentService.getStudent(filters, paginationOptions);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});
const getStudentByID = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getStudentByID(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.updateStudent(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.deleteStudent(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});

export const StudentController = {
  getStudent,
  getStudentByID,
  deleteStudent,
  updateStudent,
};
