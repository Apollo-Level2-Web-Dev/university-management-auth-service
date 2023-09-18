/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { RedisClient } from '../../../shared/redis';
import { User } from '../user/user.model';
import { EVENT_FACULTY_UPDATED, facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const { name, ...FacultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData,
    { new: true }
  )
    .populate('academicFaculty')
    .populate('academicDepartment')
    ;

  if (result) {
    await RedisClient.publish(EVENT_FACULTY_UPDATED, JSON.stringify(result))
  }
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return faculty;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const FacultyService = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
