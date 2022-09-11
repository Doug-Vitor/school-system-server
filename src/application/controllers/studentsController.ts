import express, { Request, Response, NextFunction } from 'express';
import { getPaginationParams, getStudentFromBody } from '../helpers';

import StudentRepository from '../../infrastructure/Repositories/StudentRepository';

const router = express.Router();
const repository = new StudentRepository();

const insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.Insert(getStudentFromBody(req.body)));
    } catch (error) { next(error) }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetById(req.params.id as string));
    } catch (error) { next(error) }
};

const getWithPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetAll(getPaginationParams(req.params)));
    } catch (error) { next(error) }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.Update(req.params.id as string, getStudentFromBody(req.body)))
    } catch (error) { next(error) }
};

export { insert, getById, getWithPagination, update };