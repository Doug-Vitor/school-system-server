import { NextFunction, Request, Response } from "express";
import { getPaginationParams } from "../helpers";

import Subject from "../../domain/Entities/Core/Subject";

import { collectionNames } from "../../domain/Constants";
import GenericRepository from "../../infrastructure/Repositories/GenericRepository";

const repository = new GenericRepository<Subject>(collectionNames.subjects);

const insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { theme } = req.body
        res.send(await repository.Insert(new Subject(theme)))
    } catch (error) { next(error) }
};

const getWithPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await repository.GetAll(getPaginationParams(req.query)));
    } catch (error) { next(error) }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        res.send(await repository.GetById(id as string));
    } catch (error) { next(error) }
};

export { insert, getById, getWithPagination };