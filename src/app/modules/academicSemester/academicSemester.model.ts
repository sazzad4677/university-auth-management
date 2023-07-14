import { Schema, model } from "mongoose";
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from "./academicSemester.constant";
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  { timestamps: true },
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemecter",
  academicSemesterSchema,
);
