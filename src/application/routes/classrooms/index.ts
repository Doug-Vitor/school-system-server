import express from 'express';
import { getById, getWithPagination } from '../../controllers/classrooms/classroomsController';

const router = express.Router();
router.get('/', getWithPagination);
router.get('/', getById);

export default router;