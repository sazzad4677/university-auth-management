import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDeptService } from './academicDepartment.service';

const getAllDept = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, pagination);
  // const filters = pick(req.query, academicSemesterFilterableFields);
  const result = await AcademicDeptService.getAllDept(paginationOptions);
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully Retrieved',
    data: result.data,
    meta: result.meta,
  });
});

const createDept = catchAsync(async (req: Request, res: Response) => {
  const data: IAcademicDepartment = req.body;
  const result = await AcademicDeptService.createDept(data);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully Created',
    data: result,
  });
});
const getDeptByID = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDeptService.getDeptByID(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully Retrieved Dept',
    data: result,
  });
});
const updateDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await AcademicDeptService.updateDept(id, data);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully updated Dept',
    data: result,
  });
});
const deleteDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDeptService.deleteDept(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully deleted Dept',
    data: result,
  });
});

export const DeptController = {
  getAllDept,
  createDept,
  getDeptByID,
  updateDept,
  deleteDept,
};
