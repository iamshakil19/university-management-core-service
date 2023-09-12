import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { StudentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { studentEnrolledCourseMarkFilterableFields } from './studentEnrolledCourseMark.constant';

const getAllStudentCourseMark = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result =
      await StudentEnrolledCourseMarkService.getAllStudentCourseMark(
        filters,
        options
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student course marks fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateStudentMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseMarkService.updateStudentMarks(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks updated successfully',
    data: result,
  });
});

const updateFinalMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseMarkService.updateFinalMarks(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Final marks updated!',
    data: result,
  });
});

export const StudentEnrolledCourseMarkController = {
  updateStudentMarks,
  getAllStudentCourseMark,
  updateFinalMarks,
};
