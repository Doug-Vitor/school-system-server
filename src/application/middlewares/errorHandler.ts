import { Request, Response } from 'express'
import ErrorResponse from '../../domain/Responses/ErrorResponse'

export default (error: any, _: Request, res: Response) => error instanceof ErrorResponse ?
    res.status(error.StatusCode).send(error) : res.status(500).send(new ErrorResponse());