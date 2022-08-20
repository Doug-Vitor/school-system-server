import { NextFunction, Request, Response } from 'express'
import ErrorResponse from '../../domain/Responses/ErrorResponse'

export default (error: Error, _req: Request, res: Response, _: NextFunction) => {
    if (error instanceof ErrorResponse) res.status(error.StatusCode).send(error);
    else res.status(500).send(new ErrorResponse());
}