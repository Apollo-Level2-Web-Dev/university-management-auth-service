import { Model } from 'mongoose';

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IAcademicSemesterTitles;
  year: number;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
  syncId: string
};

export type AcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};

export type IAcademicSemesterCreatedEvent = {
  title: string,
  year: string,
  code: string,
  startMonth: string,
  endMonth: string,
  id: string
}
