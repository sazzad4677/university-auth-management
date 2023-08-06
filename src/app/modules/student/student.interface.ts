import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IFaculty } from './../academicFaculty/academicFaculty.interface';
import { bloodGroup as blood, genders } from './student.constant';

// Interface for Guardian
type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

// Interface for LocalGuardian
type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// Interface for Student
export type IStudent = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  gender: (typeof genders)[number];
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: (typeof blood)[number];
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicFaculty: Types.ObjectId | IFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
  profileImage?: string;
};
export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
};
export type StudentModel = Model<IStudent, Record<string, unknown>>;
