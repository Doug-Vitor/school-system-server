import express from 'express';

import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';

const router = express.Router();

router.use('/', publicRoutes);
router.use('/protected', protectedRoutes);

export default router;