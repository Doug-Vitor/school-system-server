import express, { NextFunction, Request, Response } from 'express';

import User from '../../domain/Entities/User';
import UserServices from '../../services/UserServices';

const router = express.Router();
const services = new UserServices();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        res.send(await services.ValidateLogin(username, password));
    } catch (error) { next(error) }
});

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = req.body;
        res.send(await services.CreateUser(new User(email, username, password)));
    } catch (error) { next(error) }
});

export default router;