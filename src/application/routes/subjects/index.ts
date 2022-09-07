import express, { Request, Response, NextFunction } from 'express';
import { getPaginationParams } from '../../helpers';

import Subject from '../../../domain/Entities/Core/Subject';
import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
import { collectionNames } from '../../../domain/Constants';

const router = express.Router();
const repository = new BaseRepository<Subject>(collectionNames.subjects);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { theme } = req.body
        res.send(await repository.Insert(new Subject(theme)))
    } catch (error) { next(error) }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetWithPagination(getPaginationParams(req.query)));
    } catch (error) { next(error) }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        res.send(await repository.GetById(id as string));
    } catch (error) { next(error) }
});

export default router;