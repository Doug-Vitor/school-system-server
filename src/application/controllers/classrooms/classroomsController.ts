import { Request, Response, NextFunction } from "express";
import { collectionNames } from "../../../domain/Constants";

import Classroom from "../../../domain/Entities/Core/Classroom";
import GenericRepository from "../../../infrastructure/Repositories/GenericRepository";

const repository = new GenericRepository<Classroom>(collectionNames.classrooms);

const getWithPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { itemsPerPage } = req.query;
        res.send(await repository.GetAll({ ItemsPerPage: itemsPerPage as unknown as number ?? 100 }));
    } catch (error) { next(error) }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        res.send(await repository.GetById(id as string));
    } catch (error) { next(error) }
}

export { getById, getWithPagination };