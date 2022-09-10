import express, { Request, Response } from 'express';
import { routes } from '../../domain/Constants';

import authenticationRoutes from './authentication';
import { getWithPagination } from '../controllers/teachersController';

const router = express.Router();

router.get('/', (_: Request, res: Response) => res.send('My first API with typescript'));
router.use(routes.authentication, authenticationRoutes);
router.get(routes.teachers, getWithPagination);

export default router;