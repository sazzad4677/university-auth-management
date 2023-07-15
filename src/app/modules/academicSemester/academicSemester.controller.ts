import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    );
    next();
    sendResponse(res, {
      statusCode: StatusCodes.ACCEPTED,
      success: true,
      message: 'Semester Created Successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createSemester,
};
