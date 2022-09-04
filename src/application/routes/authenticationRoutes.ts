import express, { Request, Response, NextFunction } from 'express';

import IPaginationParameters from '../../domain/Interfaces/Infrastructure/Pagination/IPaginationParameters';
import ErrorResponse from '../../domain/Responses/ErrorResponse';

import User from '../../domain/Entities/User';
import UserServices from '../../services/UserServices';
import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

const router = express.Router();
const services = new UserServices();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page as unknown as number;
        const itemsPerPage = req.query.itemsPerPage as unknown as number;
        const pagination: IPaginationParameters = {
            Page: page,
            ItemsPerPage: itemsPerPage
        }

        const repository = new BaseRepository(User.name + 's');
        res.send(await repository.GetWithPagination(pagination));
    } catch (error: ErrorResponse<unknown> | any) { next(error) }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        res.send(await services.ValidateLogin(username, password));
    } catch (error: ErrorResponse<unknown> | any) { next(error) }
});

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = req.body;
        res.send(await services.CreateUser(new User(email, username, password)));
    } catch (error: ErrorResponse<unknown> | any) { next(error) }
});

export default router;