import { NextFunction, Request, Response } from "express";

const setCors = (_: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT, PATCH,');

    next();
}

export { setCors };