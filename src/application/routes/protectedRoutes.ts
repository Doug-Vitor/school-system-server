import express, { Request, Response } from 'express';

import { routes } from '../../domain/Constants';
import subjectsRoutes from './subjects';
import classroomsRoutes from './classrooms';
import teachersRoutes from './teachers';
import studentsRoutes from './students';
import performancesRoutes from './performances';
import activitiesRoutes from './activities';

import GenericRepository from '../../infrastructure/Repositories/GenericRepository';
import { getPaginationParams, getSearchParams, } from '../helpers';
import { getAuthenticatedTeacher } from '../controllers/teachers/teachersController';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { collectionName } = req.query;

    const [searchPayload, paginationPayload] = [getSearchParams(req.query), getPaginationParams(req.query)];
    res.send(await new GenericRepository(collectionName as string).Search(searchPayload, paginationPayload));
});

router.use(routes.subjects, subjectsRoutes);
router.use(routes.classrooms, classroomsRoutes);
router.use(routes.teachers, teachersRoutes);
router.get(routes.teacher, getAuthenticatedTeacher)
router.use(routes.students, studentsRoutes);
router.use(routes.activities, activitiesRoutes);
router.use(routes.performances, performancesRoutes);

export default router;