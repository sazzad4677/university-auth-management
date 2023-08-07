import { Model, Types } from 'mongoose';
import { bloodGroup, genders } from '../../../constants/genetics';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IFaculty as IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IFaculty = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: (typeof genders)[number];
  bloodGroup?: (typeof bloodGroup)[number];
  permanentAddress?: string;
  presentAddress?: string;

  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  designation: string;
};
export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: (typeof genders)[number];
  bloodGroup?: (typeof bloodGroup)[number];
  academicDepartment?: string;
  academicFaculty?: string;
  designation?: string;
};
