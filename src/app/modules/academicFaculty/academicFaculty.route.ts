import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './academicFaculty.controller';
import { facultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.post(
  '/create-faculty',
  validateRequest(facultyValidation.createFacultySchema),
  FacultyController.createFaculty,
);
router.get('/:id', FacultyController.getFacultyByID);
router.put(
  '/update-faculty/:id',
  validateRequest(facultyValidation.updateFacultySchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoute = router;
