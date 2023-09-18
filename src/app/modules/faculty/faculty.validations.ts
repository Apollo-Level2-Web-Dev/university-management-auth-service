import { z } from 'zod';

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }).optional(),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    department: z.string().optional(),
    designation: z.string().optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
