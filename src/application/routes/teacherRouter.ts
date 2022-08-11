import express, { Request, Response } from 'express';
import Teacher from '../../domain/Entities/Teacher';
import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

import ErrorResponse from '../../domain/Responses/ErrorResponse'

const router = express.Router();
const repository: BaseRepository<Teacher> = new BaseRepository<Teacher>("teachers");

router.get('/', async (req: Request, res: Response) => {
    try {
        res.send({ response: await repository.GetWithPagination() })
    }
    catch (error: ErrorResponse<unknown> | any) {
        res.status(error.StatusCode).send({ response: error });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        res.send({ response: await repository.GetById(req.params.id) })
    }
    catch (error: ErrorResponse<unknown> | any) {
        res.status(error.StatusCode).send({ response: error });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { name, birthdate } = req.body;
    try {
        res.send({ response: await repository.Insert(new Teacher(name, new Date(birthdate))) })
    }
    catch (error: ErrorResponse<unknown> | any) {
        res.status(error.StatusCode).send({ response: error });
    }
});

router.patch('/:id', async (req: Request, res: Response) => {
    const teacher: Teacher = { ...req.body };
    try {
        res.send({ response: await repository.Update(req.params.id, teacher) });
    }
    catch (error: ErrorResponse<unknown> | any) {
        res.status(error.StatusCode).send({ response: error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        res.send({ response: await repository.Delete(req.params.id) })
    }
    catch (error: ErrorResponse<unknown> | any) {
        res.status(error.StatusCode).send({ response: error });
    }
});

export default router;