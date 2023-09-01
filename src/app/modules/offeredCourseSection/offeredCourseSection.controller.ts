import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OfferedCourseSectionService } from './offeredCourseSection.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { offeredCourseSectionFilterableFields } from './offeredCourseSection.constant';
import pick from '../../../shared/pick';

const createOfferCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferedCourseSectionService.createOfferCourseSection(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course Section created successfully',
      data: result,
    });
  }
);

const getAllOfferCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, offeredCourseSectionFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await OfferedCourseSectionService.getAllOfferCourseSection(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course Sections fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await OfferedCourseSectionService.getSingleOfferedCourseSection(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourseSection fetched successfully',
      data: result,
    });
  }
);

const updateOfferCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseSectionService.updateOfferCourseSection(
      id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course Section updated successfully',
      data: result,
    });
  }
);

const deleteOfferCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseSectionService.deleteOfferCourseSection(
      id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourseSection deleted successfully',
      data: result,
    });
  }
);

export const OfferedCourseSectionController = {
  createOfferCourseSection,
  getAllOfferCourseSection,
  getSingleOfferedCourseSection,
  updateOfferCourseSection,
  deleteOfferCourseSection,
};
