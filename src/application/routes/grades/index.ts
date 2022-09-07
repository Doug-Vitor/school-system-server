import express, { Request, Response, NextFunction } from 'express';
import { getPaginationParams, getGradeFromBody } from '../../helpers';

import GradeServices from '../../../services/Grades/GradeServices';

const router = express.Router();
const services = new GradeServices()

router.get('/subject/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.GetBySubject(req.params.id as string, getPaginationParams(req.query)));
    } catch (error) { next(error); }
});

router.get('/student/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.GetByStudent(req.params.id as string, getPaginationParams(req.query)));
    } catch (error) { next(error); }
});

router.get('/year', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        res.send(await services.GetByAcademicYear(+(query.year as string), getPaginationParams(query)));
    } catch (error) { next(error); }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Insert(req.headers.authenticatedUserId as string, getGradeFromBody(req.body)));
    } catch (error) { next(error); }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Update(req.headers.authenticatedUserId as string, req.params.id as string, getGradeFromBody(req.body)));
    } catch (error) { next(error); }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Delete(req.headers.authenticatedUserId as string, req.params.id as string));
    } catch (error) { next(error); }
});

export default router;