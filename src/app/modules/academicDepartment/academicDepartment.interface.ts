import { Model, Types } from 'mongoose';
import { IFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IFaculty;
};

export type AcademicDepartmentModel = Model<IAcademicDepartment, object>;
