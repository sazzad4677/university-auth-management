import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, pagination);
  const filters = pick(req.query, academicSemesterFilterableFields);
  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions,
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: '',
    data: result.data,
    meta: result.meta,
  });
  //  next();
});

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Created Successfully',
      data: result,
    });
    next();
  },
);

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrieved the data',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updatedData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully updated',
    data: result,
  });
});
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await AcademicSemesterService.deleteSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully Deleted',
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
