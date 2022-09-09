import express, { Request, Response, NextFunction } from 'express';

import Classroom from '../../../domain/Entities/Core/Classroom';
import GenericRepository from '../../../infrastructure/Repositories/GenericRepository';

import { collectionNames } from '../../../domain/Constants';

const router = express.Router();
const repository = new GenericRepository<Classroom>(collectionNames.classrooms);

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetWithPagination({ ItemsPerPage: 100 }));
    } catch (error) { next(error) }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        res.send(await repository.GetById(id as string));
    } catch (error) { next(error) }
});

export default router;