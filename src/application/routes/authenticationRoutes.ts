import express, { Request, Response } from 'express';

import DefaultResponse from '../../domain/Responses/ErrorResponse';
import ErrorResponse from '../../domain/Responses/ErrorResponse';
import Responses from '../../domain/Responses/Responses';

import User from '../../domain/Entities/User';
import { generateToken } from '../../services/AuthServices';
import UserServices from '../../services/UserServices';

const router = express.Router();
const repository = new UserServices();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await repository.ValidateLogin(username, password);
        if (user) res.send(new DefaultResponse(Responses.SUCCESS.StatusCode, Responses.SUCCESS.Message, {
            token: generateToken(user.Id)
        }))
    } catch (error: ErrorResponse<unknown> | any) {
        res.status(error.StatusCode).send({ error });
    }
});

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        const user = (await repository.CreateUser(new User(email, username, password))).Data;
        if (user) res.send(new DefaultResponse(Responses.SUCCESS.StatusCode, Responses.SUCCESS.Message, {
            token: generateToken(user.Id)
        }))
    } catch (error: ErrorResponse<unknown> | any) {
        res.status(error.StatusCode).send({ error });
    }
});

export default router;