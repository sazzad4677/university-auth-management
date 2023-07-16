import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, pagination);
  const result = await AcademicSemesterService.getAllSemester(
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

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
