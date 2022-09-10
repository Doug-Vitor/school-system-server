import { NextFunction, Request, Response } from "express";
import { getPaginationParams, getTeacherFromBody } from "../helpers";

import TeacherRepository from "../../infrastructure/Repositories/TeacherRepository";

const repository = new TeacherRepository();

const insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.Insert(getTeacherFromBody(req.body, req.headers.authenticatedUserId as string)))
    } catch (error) { next(error) }
};

const getWithPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetWithPagination(getPaginationParams(req.params)));
    } catch (error) { next(error) }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetById(req.params.id as string));
    } catch (error) { next(error) }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authenticatedUserId = req.headers.authenticatedUserId as string;
        res.send(await repository.Update(authenticatedUserId, getTeacherFromBody(req.body, authenticatedUserId)))
    } catch (error) { next(error) }
};

export { insert, getById, getWithPagination, update }