import express, { Request, Response, NextFunction } from 'express';

import StudentRepository from '../../../infrastructure/Repositories/StudentRepository';
import { getStudentFromBody } from '../../helpers';

const router = express.Router();
const repository = new StudentRepository();

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