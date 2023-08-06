import express from 'express';
import { DeptRoute } from '../app/modules/academicDepartment/academicDepartment.route';
import { FacultyRoute } from '../app/modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../app/modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../app/modules/student/student.route';
import { UserRoutes } from '../app/modules/users/user.route';

const route = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoute },
  { path: '/faculty', route: FacultyRoute },
  { path: '/dept', route: DeptRoute },
  { path: '/students', route: StudentRoutes },
];

moduleRoutes.forEach(v => route.use(v.path, v.route));

export default route;
