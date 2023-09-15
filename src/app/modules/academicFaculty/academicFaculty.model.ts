import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interfaces';

const AcademicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    syncId: {
      type: String,
      required: false,
      unique: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFacultySchema
);
