import { ICodes, IMonth, ITitles } from './academicSemester.interface';

export const academicSemesterMonths: IMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitle: ITitles[] = ['Spring', 'Summer', 'Fall'];
export const academicSemesterCode: ICodes[] = ['01', '02', '03'];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Spring: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];

export const academicSemesterSearchable = ['title', 'code', 'year'];
