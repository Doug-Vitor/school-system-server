import express from 'express';

import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';

const router = express.Router();

router.use('/protected', protectedRoutes);
router.use('/', publicRoutes);

export default router;