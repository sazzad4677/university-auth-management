import { z } from 'zod';

const createDeptSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic department is required',
    }),
  }),
});
const updateDeptSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is Required',
      })
      .optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const deptValidation = { createDeptSchema, updateDeptSchema };
