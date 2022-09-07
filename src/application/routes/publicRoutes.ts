import express, { Request, Response } from 'express';

import authenticationRoutes from './authentication';
import { getAll } from './teachers';

const router = express.Router();

router.get('/', (_: Request, res: Response) => res.send('My first API with typescript'));
router.use('/authentication', authenticationRoutes);
router.use('/teachers', getAll);

export default router;