import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required ',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is needed',
    }),
    endMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is needed',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
