import express, { Request, Response, NextFunction } from 'express';
import { getPaginationParams, getTeacherFromBody } from '../../helpers';

import Teacher from '../../../domain/Entities/Person/Teacher';
import GenericRepository from '../../../infrastructure/Repositories/GenericRepository';
import { collectionNames } from '../../../domain/Constants';
import TeacherServices from '../../../services/Teachers/TeacherServices';

const router = express.Router();
const services = new TeacherServices();

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await services.GetWithPagination(getPaginationParams(req.params)));
    } catch (error) { next(error) }
}

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Insert(getTeacherFromBody(req.body, req.headers.authenticatedUserId as string)))
    } catch (error) { next(error) }
});

router.get('/', getAll);
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.GetById(req.params.id as string));
    } catch (error) { next(error) }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authenticatedUserId = req.headers.authenticatedUserId as string;
        res.send(await services.Update(authenticatedUserId, getTeacherFromBody(req.body, authenticatedUserId)))
    } catch (error) { next(error) }
});

export default router;