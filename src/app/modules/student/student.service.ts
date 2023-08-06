import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import { ApiError } from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/pagination';
import { Student } from '../student/student.model';
import { IStudent, IStudentFilters } from './../student/student.interface';
import { studentFilterableFields } from './student.constant';

const getStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentFilterableFields.map(v => {
        return { [v]: { $regex: searchTerm, $options: 'i' } };
      }),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const total = await Student.countDocuments();
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
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
const getStudentByID = async (id: string): Promise<IStudent | null> => {
  const student = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return student;
};
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = Student.findOne({ id });
  if (!isExist) throw new ApiError(StatusCodes.NOT_FOUND, 'Student Not Found');
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const gurdianKey = `guardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[gurdianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate(
    { _id: id },
    updatedStudentData,
    {
      new: true,
    },
  );
  return result;
};
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const students = await Student.findByIdAndDelete({ id });
  return students;
};

export const StudentService = {
  getStudent,
  getStudentByID,
  deleteStudent,
  updateStudent,
};
