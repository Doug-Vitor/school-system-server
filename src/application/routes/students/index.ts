import express, { Request, Response, NextFunction } from 'express';

import { ensureIsAdmin } from '../../middlewares/authentication';
import protectedRoutes from './protected';

import { getPaginationParams } from '../../helpers';

import Student from '../../../domain/Entities/Person/Student';
import GenericRepository from '../../../infrastructure/Repositories/GenericRepository';
import { collectionNames } from '../../../domain/Constants';

const router = express.Router();
const repository = new GenericRepository<Student>(collectionNames.students);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetWithPagination(getPaginationParams(req.params)));
    } catch (error) { next(error) }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetById(req.params.id as string));
    } catch (error) { next(error) }
});

router.use('/', ensureIsAdmin, protectedRoutes);

export default router;