import express, { Request, Response, NextFunction } from 'express';
import { getPaginationParams, getTeacherFromBody } from '../../helpers';

import Teacher from '../../../domain/Entities/Person/Teacher';
import GenericRepository from '../../../infrastructure/Repositories/GenericRepository';
import { collectionNames } from '../../../domain/Constants';

const router = express.Router();
const repository = new GenericRepository<Teacher>(collectionNames.teachers);

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await repository.GetWithPagination(getPaginationParams(req.params)));
    } catch (error) { next(error) }
}

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.Insert(getTeacherFromBody(req.body, req.headers.authenticatedUserId as string)))
    } catch (error) { next(error) }
});

router.get('/', getAll);
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetById(req.params.id as string));
    } catch (error) { next(error) }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authenticatedUserId = req.headers.authenticatedUserId as string;
        res.send(await repository.Update(authenticatedUserId, getTeacherFromBody(req.body, authenticatedUserId)))
    } catch (error) { next(error) }
});

export default router;