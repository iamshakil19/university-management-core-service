import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { OfferedCourseSectionValidation } from './offeredCourseSection.validation';

const router = express.Router();

router.get('/', OfferedCourseSectionController.getAllOfferCourseSection);
router.get(
  '/:id',
  OfferedCourseSectionController.getSingleOfferedCourseSection
);
router.post(
  '/',
  validateRequest(
    OfferedCourseSectionValidation.createOfferCourseSectionZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.createOfferCourseSection
);

router.patch(
  '/:id',
  validateRequest(
    OfferedCourseSectionValidation.UpdateOfferCourseSectionZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.updateOfferCourseSection
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.deleteOfferCourseSection
);

export const offeredCourseSectionRoutes = router;
