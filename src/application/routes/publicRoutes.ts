import express, { Request, Response } from 'express';

import authenticationRoutes from './authenticationRoutes';

const router = express.Router();

router.get('/', (_: Request, res: Response) => res.send('My first API with typescript'));
router.use('/authentication', authenticationRoutes);

export default router;