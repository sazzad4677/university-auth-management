import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import { ApiError } from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/pagination';
import { IFaculty } from './academicFaculty.interface';
import { Faculty } from './academicFaculty.model';

const getAllFaculty = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const total = await Faculty.countDocuments();

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Faculty.find()
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

const createFaculty = async (payload: IFaculty): Promise<IFaculty> => {
  const result = await Faculty.create(payload);
  // result.save();
  return result;
};
const getFacultyByID = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById({ _id: id });
  return result;
};
const updateFaculty = async (id: string, data: IFaculty): Promise<IFaculty> => {
  const isExist = await Faculty.findOne({ title: data.title });
  if (isExist)
    throw new ApiError(StatusCodes.CONFLICT, 'Faculty Already Exists');

  const result = await Faculty.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (!result) throw new ApiError(StatusCodes.BAD_REQUEST, "ID doesn't exist");
  return result;
};
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOneAndDelete({ _id: id });
  return result;
};

export const FacultyService = {
  getAllFaculty,
  createFaculty,
  getFacultyByID,
  updateFaculty,
  deleteFaculty,
};
