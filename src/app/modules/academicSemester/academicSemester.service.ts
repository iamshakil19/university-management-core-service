import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IGenericResponse } from './../../../interfaces/common';
import { academicSemesterSearchableFields } from './academicSemester.constant';
import { IAcademicSemesterFilters } from './academicSemester.interface';

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterSearchableFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  console.log(options);

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortBy
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page: page,
      limit: limit,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<AcademicSemester | null> => {
  console.log(id);

  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteSemester = async (id: string): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  deleteSemester,
  updateSemester
};
