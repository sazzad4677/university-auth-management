import express from 'express';
import { FacultyRoute } from '../app/modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../app/modules/users/user.route';

const route = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoute },
  { path: '/faculty', route: FacultyRoute },
];

moduleRoutes.forEach(v => route.use(v.path, v.route));

export default route;
