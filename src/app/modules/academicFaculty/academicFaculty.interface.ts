import { Model } from 'mongoose';

export type IFaculty = {
  title: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
