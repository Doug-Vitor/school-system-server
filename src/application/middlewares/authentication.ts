import { Request, Response, NextFunction } from "express";
import { validateToken } from '../../services/AuthServices';

export default (req: Request, _: Response, next: NextFunction) => {
    try {
        req.headers.authenticatedUserId = validateToken(req.headers.authorization).userId;
        next();
    } catch (error) { next(error) }
}