import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './academicFaculty.interface';
import { FacultyService } from './academicFaculty.service';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, pagination);
  // const filters = pick(req.query, academicSemesterFilterableFields);
  const result = await FacultyService.getAllFaculty(paginationOptions);
  sendResponse<IFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully Retrieved',
    data: result.data,
    meta: result.meta,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const data: IFaculty = req.body;
  const result = await FacultyService.createFaculty(data);
  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully Created',
    data: result,
  });
});
const getFacultyByID = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getFacultyByID(id);
  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully Retrieved Faculty',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await FacultyService.updateFaculty(id, data);
  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully updated Faculty',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully deleted Faculty',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  createFaculty,
  getFacultyByID,
  updateFaculty,
  deleteFaculty,
};
