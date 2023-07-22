import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import { ApiError } from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/pagination';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const getAllDept = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const total = await AcademicDepartment.countDocuments();

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicDepartment.find()
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createDept = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  // result.save();
  return result;
};
const getDeptByID = async (id: string): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};
const updateDept = async (
  id: string,
  data: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const isExist = await AcademicDepartment.findOne({ title: data.title });
  if (isExist)
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic Department Already Exists',
    );

  const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, data, {
    new: true,
  }).populate('academicFaculty');
  if (!result) throw new ApiError(StatusCodes.BAD_REQUEST, "ID doesn't exist");
  return result;
};
const deleteDept = async (id: string): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicDeptService = {
  getAllDept,
  createDept,
  getDeptByID,
  updateDept,
  deleteDept,
};
