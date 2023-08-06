import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
);
router.get('/:id', StudentController.getStudentByID);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
