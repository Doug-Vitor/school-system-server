import express, { Request, Response, NextFunction } from 'express';
import { getPagination } from '../../helpers';

import Subject from '../../../domain/Entities/Core/Subject';
import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';

const router = express.Router();
const repository = new BaseRepository<Subject>(Subject.name + 's');

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { theme } = req.body
        res.send(await repository.Insert(new Subject(theme)))
    } catch (error) { next(error) }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetWithPagination(getPagination(req.query)));
    } catch (error) { next(error) }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        res.send(await repository.GetById(id as string));
    } catch (error) { next(error) }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;
        const { theme } = req.body;
        res.send(await repository.Update(id as string, new Subject(theme)));
    } catch (error) { next(error) }
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;
        res.send(await repository.Delete(id as string));
    } catch (error) { next(error) }
});

export default router;