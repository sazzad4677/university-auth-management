import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import { ApiError } from '../../../errors/ApiError';
import { FacultyModel, IFaculty } from './academicFaculty.interface';

const FacultySchema = new Schema<IFaculty>(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

FacultySchema.pre('save', async function (next) {
  const isExist = await Faculty.findOne({ title: this.title });
  if (isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Faculty already Exist');
  }
  next();
});

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);
