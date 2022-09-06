import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'class-validator';

import Responses from '../../domain/Responses/Responses';
import ErrorResponse from '../../domain/Responses/ErrorResponse'

export default (error: Error, _req: Request, res: Response, _: NextFunction) => {
    if (error instanceof ErrorResponse) res.status(error.StatusCode).send(error);
    else if (error instanceof Array<ValidationError>) {
        const response = Responses.BAD_REQUEST_ERROR;
        const errors = error.map((validationError: ValidationError) => validationError.constraints);
        res.status(response.StatusCode).send(new ErrorResponse(response.StatusCode, response.Message, errors));
    }
    else res.status(500).send(new ErrorResponse());
}