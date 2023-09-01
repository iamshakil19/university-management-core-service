import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { offeredCourseClassScheduleFilterableFields } from './offeredCourseClassSchedule.constant';

const createOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await OfferedCourseClassScheduleService.createOfferedCourseClassSchedule(
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course Class Schedule Created!',
      data: result,
    });
  }
);

const getAllOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, offeredCourseClassScheduleFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result =
      await OfferedCourseClassScheduleService.getAllOfferedCourseClassSchedule(
        filters,
        options
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse class schedule fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await OfferedCourseClassScheduleService.getSingleOfferedCourseClassSchedule(
        id
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourseClassSchedule fetched successfully',
      data: result,
    });
  }
);

const updateOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await OfferedCourseClassScheduleService.updateOfferedCourseClassSchedule(
        id,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourseClassSchedule updated successfully',
      data: result,
    });
  }
);

const deleteOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await OfferedCourseClassScheduleService.deleteOfferedCourseClassSchedule(
        id
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourseClassSchedule deleted successfully',
      data: result,
    });
  }
);

export const OfferedCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
  getSingleOfferedCourseClassSchedule,
  updateOfferedCourseClassSchedule,
  deleteOfferedCourseClassSchedule,
};
