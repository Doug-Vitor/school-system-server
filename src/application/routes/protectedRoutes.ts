import express, { Request, Response } from 'express';

import subjectsRoutes from './subjects';
import classroomsRoutes from './classrooms';
import teachersRoutes from './teachers';
import { routes } from '../../domain/Constants';

import BaseRepository from '../../infrastructure/Repositories/BaseRepository';
import { getPaginationParams, getSearchParams, } from '../helpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { collectionName } = req.query;

    const [searchPayload, paginationPayload] = [getSearchParams(req.query), getPaginationParams(req.query)];
    res.send(await new BaseRepository(collectionName as string).GetByField(searchPayload, paginationPayload));
});

router.use(routes.subjects, subjectsRoutes);
router.use(routes.classrooms, classroomsRoutes);
router.use(routes.teachers, teachersRoutes);

export default router;