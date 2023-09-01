import { OfferedCourseClassSchedule, Prisma } from '@prisma/client';
import { OfferedCourseClassScheduleUtils } from './offeredCourseClassSchedule.utils';
import prisma from '../../../shared/prisma';
import { IOfferedCourseClassScheduleFilter } from './offeredCourseClassSchedule.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  offeredCourseClassScheduleRelationalFields,
  offeredCourseClassScheduleRelationalFieldsMapper,
  offeredCourseClassScheduleSearchableFields,
} from './offeredCourseClassSchedule.constant';

const createOfferedCourseClassSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await OfferedCourseClassScheduleUtils.checkRoomAvailable(data);
  await OfferedCourseClassScheduleUtils.checkFacultyAvailable(data);

  // existing: 12:30 - 13:30
  // new slot: 12:50 - 13:50

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      semesterRegistration: true,
      offeredCourseSection: true,
      room: true,
      faculty: true,
    },
  });

  return result;
};

const getAllOfferedCourseClassSchedule = async (
  filters: IOfferedCourseClassScheduleFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseClassScheduleSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseClassScheduleRelationalFields.includes(key)) {
          return {
            [offeredCourseClassScheduleRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseClassSchedule.findMany({
    include: {
      faculty: true,
      semesterRegistration: true,
      room: true,
      offeredCourseSection: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.offeredCourseClassSchedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleOfferedCourseClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.findUnique({
    where: {
      id,
    },
    include: {
      offeredCourseSection: true,
      faculty: true,
      room: true,
    },
  });
  return result;
};

const updateOfferedCourseClassSchedule = async (
  id: string,
  payload: Partial<OfferedCourseClassSchedule>
): Promise<OfferedCourseClassSchedule> => {
  const result = await prisma.offeredCourseClassSchedule.update({
    where: {
      id,
    },
    data: payload,
    include: {
      offeredCourseSection: true,
      faculty: true,
      room: true,
    },
  });
  return result;
};

const deleteOfferedCourseClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule> => {
  const result = await prisma.offeredCourseClassSchedule.delete({
    where: {
      id,
    },
    include: {
      offeredCourseSection: true,
      faculty: true,
      room: true,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
  getSingleOfferedCourseClassSchedule,
  updateOfferedCourseClassSchedule,
  deleteOfferedCourseClassSchedule,
};
