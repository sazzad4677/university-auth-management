import { Model } from 'mongoose';
export type IMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type ITitles = 'Spring' | 'Summer' | 'Fall';
export type ICodes = '01' | '02' | '03';

export type IAcademicSemester = {
  title: ITitles;
  year: string;
  code: ICodes;
  startMonth: IMonth;
  endMonth: IMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester, object>;

export type IAcademicSemesterFilters = { searchTerm?: string };
