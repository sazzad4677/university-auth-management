import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DeptController } from './academicDepartment.controller';
import { deptValidation } from './academicDepartment.validation';

const router = express.Router();

router.get('/', DeptController.getAllDept);
router.post(
  '/create-dept',
  validateRequest(deptValidation.createDeptSchema),
  DeptController.createDept,
);
router.get('/:id', DeptController.getDeptByID);
router.put(
  '/update-dept/:id',
  validateRequest(deptValidation.updateDeptSchema),
  DeptController.updateDept,
);
router.delete('/:id', DeptController.deleteDept);

export const DeptRoute = router;
