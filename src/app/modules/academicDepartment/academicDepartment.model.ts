import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interfaces';

const AcademicDepartmentSchema = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    syncId: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema);
