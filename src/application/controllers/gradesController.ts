import { Request, Response, NextFunction } from 'express';
import { getGradeFromBody } from '../helpers';

import GradeServices from '../../services/Grades/GradeServices';

const services = new GradeServices();

const insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Insert(req.headers.authenticatedUserId as string, getGradeFromBody(req.body)));
    } catch (error) { next(error); }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Update(req.headers.authenticatedUserId as string, req.params.id as string, getGradeFromBody(req.body)));
    } catch (error) { next(error); }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Delete(req.headers.authenticatedUserId as string, req.params.id as string));
    } catch (error) { next(error); }
};

export { insert, update, remove };