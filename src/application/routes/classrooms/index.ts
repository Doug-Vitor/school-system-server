import express from 'express';
import { getWithPagination, getById } from '../../controllers/classroomsController';

const router = express.Router();
router.use('/', getWithPagination);
router.use('/', getById);

export default router;