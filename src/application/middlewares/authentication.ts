import { Request, Response, NextFunction } from "express";
import { validateToken } from '../../services/AuthServices';

export default (req: Request, res: Response, next: NextFunction) => {
    validateToken(req.headers.authorization);
    next();
}