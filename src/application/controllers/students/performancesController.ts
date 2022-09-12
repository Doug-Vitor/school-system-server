import { NextFunction, Request, Response } from "express";
import StudentPerformance from "../../../domain/Entities/Core/StudentPerformance";

import GenericRepository from "../../../infrastructure/Repositories/GenericRepository";
import { collectionNames } from "../../../domain/Constants";

import { getPaginationParams, getPerformanceSearchPayload } from "../../helpers";

const repository = new GenericRepository<StudentPerformance>(collectionNames.performances);

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetById(req.params.id as string));
    } catch (error) { next(error) }
}

const getByStudentId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.Search(getPerformanceSearchPayload(req.params.id as string, req.query), getPaginationParams(req.query)));
    } catch (error) { next(error) }
}

export { getById, getByStudentId }