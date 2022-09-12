import { NextFunction, Request, Response } from "express";

import GenericRepository from "../../../infrastructure/Repositories/GenericRepository";
import { collectionNames } from "../../../domain/Constants";
import IFirestoreSearchPayload from "../../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";

import { getPaginationParams } from "../../helpers";
import Activity from "../../../domain/Entities/Core/Activity";

const repository = new GenericRepository<Activity>(collectionNames.activities);

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetById(req.params.id as string));
    } catch (error) { next(error) }
}

const getByPerformanceId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchPayload: IFirestoreSearchPayload = {
            FieldName: "gradeId",
            OperatorString: "==",
            SearchValue: req.params.id as string
        }

        res.send(await repository.Search(searchPayload, getPaginationParams(req.query)));
    } catch (error) { next(error) }
}

export { getById, getByPerformanceId }