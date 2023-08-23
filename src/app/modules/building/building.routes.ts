import express from 'express';
import { BuildingController } from './building.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BuildingValidations } from './building.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', BuildingController.getAllBuilding);
router.get('/:id', BuildingController.getSingleBuilding);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BuildingValidations.createBuildingZodSchema),
  BuildingController.createBuilding
);

router.patch(
  '/:id',
  validateRequest(BuildingValidations.updateBuildingZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BuildingController.updateBuilding
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BuildingController.deleteBuilding
);

export const buildingRoutes = router;
