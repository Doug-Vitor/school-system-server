import { Request, Response, NextFunction } from "express";
import { validateToken } from '../../services/AuthServices';
import ErrorResponse from "../../domain/Responses/ErrorResponse";

export function ensureIsAdmin(req: Request, _: Response, next: NextFunction) {
    try {
        validateToken(req.headers.authorization).IsAdmin ? next() : next(ErrorResponse.AccessDenied())
    } catch (error) { next(error) }
}

export default (req: Request, _: Response, next: NextFunction) => {
    try {
        req.headers.authenticatedUserId = validateToken(req.headers.authorization).UserId;
        next();
    } catch (error) { next(error) }
}