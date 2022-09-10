import express from 'express';
import { getWithPagination, getById } from '../../controllers/classroomsController';

const router = express.Router();
router.get('/', getWithPagination);
router.get('/', getById);

export default router;