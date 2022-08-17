import express, { Request, Response } from 'express';

import User from '../../domain/Entities/User';
import UserServices from '../../services/UserServices';

import ErrorResponse from '../../domain/Responses/ErrorResponse';
import Responses from '../../domain/Responses/Responses';

const router = express.Router();
const services = new UserServices();

const sendErrorResponse = (error: ErrorResponse<unknown> | any, res: Response) => {
    if (error.StatusCode) res.status(error.StatusCode).send({ error });
    else {
        const response = Responses.BAD_REQUEST_ERROR;
        res.status(response.StatusCode).send(new ErrorResponse(response.StatusCode, response.Message));
    }
}

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        res.send(await services.ValidateLogin(username, password));
    } catch (error: ErrorResponse<unknown> | any) { sendErrorResponse(error, res) }
});

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;
        res.send(await services.CreateUser(new User(email, username, password)));
    } catch (error: ErrorResponse<unknown> | any) { sendErrorResponse(error, res) }
});

export default router;