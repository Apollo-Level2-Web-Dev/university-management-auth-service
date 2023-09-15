import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  syncId: string
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};

export type AcademicDepartmentCreatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentUpdatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentDeletedEvent = {
  id: string;
};