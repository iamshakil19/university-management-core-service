import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { semesterRegistrationService } from './semesterRegistration.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constant';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await semesterRegistrationService.createSemesterRegistration(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration successfully',
      data: result,
    });
  }
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await semesterRegistrationService.getAllSemesterRegistration(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistrations fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.getSingleSemesterRegistration(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistration fetched successfully',
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await semesterRegistrationService.updateSemesterRegistration(
      id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistration updated successfully',
      data: result,
    });
  }
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await semesterRegistrationService.deleteSemesterRegistration(
      id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistration deleted successfully',
      data: result,
    });
  }
);

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await semesterRegistrationService.startMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student SemesterRegistration started successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
  startMyRegistration,
};
