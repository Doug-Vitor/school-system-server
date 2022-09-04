import { Request, Response, NextFunction } from "express";
import { validateToken } from '../../services/AuthServices';

export default (req: Request, _: Response, next: NextFunction) => {
    req.headers.authenticatedUserId = validateToken(req.headers.authorization).userId;
    console.log(req.headers.authenticatedUserId)
    next();
}