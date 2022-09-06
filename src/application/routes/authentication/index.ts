import express, { Request, Response, NextFunction } from 'express';

import User from '../../../domain/Entities/Authentication/User';
import UserServices from '../../../services/UserServices';

import ErrorResponse from '../../../domain/Responses/ErrorResponse';
import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
import Student from '../../../domain/Entities/Person/Student';

const router = express.Router();
const services = new UserServices();

router.post('/student', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, birthdate, phoneNumber, realId, zipCode, classroomId, academicYear, isActive } = req.body
        const student = new Student(name, birthdate, phoneNumber, realId, zipCode, classroomId, academicYear, isActive);
        res.send(await new BaseRepository<Student>("Students").Insert(student))
    } catch (error: ErrorResponse<unknown> | any) { next(error) }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        res.send(await services.ValidateLogin(username, password));
    } catch (error: ErrorResponse<unknown> | any) { next(error) }
});

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = req.body;
        res.send(await services.CreateUser(new User(email, username, password)));
    } catch (error: ErrorResponse<unknown> | any) { next(error) }
});

export default router;