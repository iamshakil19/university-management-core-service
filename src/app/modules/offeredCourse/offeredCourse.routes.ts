import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', OfferedCourseController.getAllOfferedCourse);

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

router.post(
  '/',
  validateRequest(OfferedCourseValidation.createOfferedCourseZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseController.createOfferCourse
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseController.updateOfferedCourse
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseController.deleteOfferedCourse
);

export const offeredCourseRoutes = router;
