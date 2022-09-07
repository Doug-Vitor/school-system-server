import express, { Request, Response } from 'express';
import { routes } from '../../domain/Constants';

import authenticationRoutes from './authentication';
import { getAll } from './teachers';

const router = express.Router();

router.get('/', (_: Request, res: Response) => res.send('My first API with typescript'));
router.use(routes.authentication, authenticationRoutes);
router.use(routes.teachers, getAll);

export default router;