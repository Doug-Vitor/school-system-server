import express, { Request, Response } from 'express';

import { routes } from '../../domain/Constants';
import subjectsRoutes from './subjects';
import * as classroomController from '../controllers/classRoomsController';
import teachersRoutes from './teachers';
import studentsRoutes from './students';
import gradesRoutes from './grades';

import GenericRepository from '../../infrastructure/Repositories/GenericRepository';
import { getPaginationParams, getSearchParams, } from '../helpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { collectionName } = req.query;

    const [searchPayload, paginationPayload] = [getSearchParams(req.query), getPaginationParams(req.query)];
    res.send(await new GenericRepository(collectionName as string).GetByField(searchPayload, paginationPayload));
});

router.use(routes.subjects, subjectsRoutes);
router.use(routes.teachers, teachersRoutes);
router.use(routes.students, studentsRoutes);
router.use(routes.grades, gradesRoutes);

router.use('/', classroomController.getWithPagination);
router.use('/:id', classroomController.getById);

export default router;