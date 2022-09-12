import { NextFunction, Request, Response } from "express";

import { getActivitiesFromBody, getPaginationParams, getPerformanceFromBody, getPerformanceSearchPayload } from "../../helpers";
import StudentPerformanceServices from "../../../services/StudentsPerformances/StudentPerformanceServices";

const services = new StudentPerformanceServices();

const insert = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const [performance, activities] = [getPerformanceFromBody(req.body), getActivitiesFromBody(req.body)];
        res.send(await services.Insert(req.headers.authenticatedUserId as string, performance, activities));
    } catch (error) { next(error) }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.GetById(req.params.id as string));
    } catch (error) { next(error) }
}

const getByStudentId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Search(getPerformanceSearchPayload(req.params.id as string, req.query), getPaginationParams(req.query)));
    } catch (error) { next(error) }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [performance, activities] = [getPerformanceFromBody(req.body), getActivitiesFromBody(req.body)];
        res.send(await services.Update(req.params.id, req.headers.authenticatedUserId as string, performance, activities));
    } catch (error) { next(error) }
}
const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.Delete(req.params.id, req.headers.authenticatedUserId as string));
    } catch (error) { next(error) }
}

export { insert, getById, getByStudentId, update, remove }