import { z } from 'zod';

const createFacultySchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});
const updateFacultySchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});

export const facultyValidation = { createFacultySchema, updateFacultySchema };
