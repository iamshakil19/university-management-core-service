import { OfferedCourse, Prisma } from '@prisma/client';
import {
  ICreateOfferedCourse,
  IOfferedCourseFilter,
} from './offeredCourse.interface';
import { asyncForEach } from '../../../shared/utils';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  offeredCourseRelationalFields,
  offeredCourseRelationalFieldsMapper,
  offeredCourseSearchableFields,
} from './offeredCourse.constant';

const createOfferCourse = async (
  data: ICreateOfferedCourse
): Promise<OfferedCourse[]> => {
  const { courseIds, academicDepartmentId, semesterRegistrationId } = data;
  const result: OfferedCourse[] = [];
  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });

    if (!alreadyExist) {
      const insertOfferedCourse = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });
      result.push(insertOfferedCourse);
    }
  });
  return result;
};

const getAllOfferedCourse = async (
  filters: IOfferedCourseFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourse[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSearchableFields.map(field => ({
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
        if (offeredCourseRelationalFields.includes(key)) {
          return {
            [offeredCourseRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.OfferedCourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourse.findMany({
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
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
  const total = await prisma.offeredCourse.count({
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

const getSingleOfferedCourse = async (
  id: string
): Promise<OfferedCourse | null> => {
  const result = await prisma.offeredCourse.findUnique({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const updateOfferedCourse = async (
  id: string,
  payload: Partial<OfferedCourse>
): Promise<OfferedCourse> => {
  const result = await prisma.offeredCourse.update({
    where: {
      id,
    },
    data: payload,
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const deleteOfferedCourse = async (id: string): Promise<OfferedCourse> => {
  const result = await prisma.offeredCourse.delete({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const OfferedCourseService = {
  createOfferCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
