import express, { Request, Response, NextFunction } from 'express';

import { getStudentFromBody } from '../../helpers';

import Student from '../../../domain/Entities/Person/Student';
import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
import { collectionNames } from '../../../domain/Constants';

const router = express.Router();
const repository = new BaseRepository<Student>(collectionNames.students);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.Insert(getStudentFromBody(req.body)));
    } catch (error) { next(error) }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.Update(req.params.id as string, getStudentFromBody(req.body)))
    } catch (error) { next(error) }
});

export default router;