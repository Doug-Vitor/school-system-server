import express, { Request, Response, NextFunction } from 'express';

import { ensureIsAdmin } from '../../middlewares/authentication';
import protectedRoutes from './protected';

import { getPaginationParams } from '../../helpers';

import StudentRepository from '../../../infrastructure/Repositories/StudentRepository';

const router = express.Router();
const repository = new StudentRepository();

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