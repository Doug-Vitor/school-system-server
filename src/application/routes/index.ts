import express from 'express';
import authenticationMiddleware, { ensureIsAdmin } from '../middlewares/authentication';

import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';

const router = express.Router();

router.use('/protected', authenticationMiddleware, protectedRoutes);
router.use('/', publicRoutes);

export default router;