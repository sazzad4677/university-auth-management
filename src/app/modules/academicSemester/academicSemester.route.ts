import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.get('/', AcademicSemesterController.getAllSemester);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);
router.put(
  '/update-semester/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
);
router.delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoute = router;
