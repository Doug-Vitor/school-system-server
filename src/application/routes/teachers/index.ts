import express, { Request, Response, NextFunction } from 'express';
import { getPaginationParams, getTeacherFromBody } from '../../helpers';

import Teacher from '../../../domain/Entities/Person/Teacher';
import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
import { collectionNames } from '../../../domain/Constants';

const router = express.Router();
const repository = new BaseRepository<Teacher>(collectionNames.teachers);

const getAll = async (req: Request, res: Response, next: NextFunction) => {
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

export { getAll }
export default router;