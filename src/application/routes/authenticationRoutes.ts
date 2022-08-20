import express, { Request, Response, NextFunction } from 'express';

import ErrorResponse from '../../domain/Responses/ErrorResponse';
import { ValidationError } from 'class-validator';

import User from '../../domain/Entities/User';
import UserServices from '../../services/UserServices';

const router = express.Router();
const services = new UserServices();

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