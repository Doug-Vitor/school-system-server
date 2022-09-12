import express from 'express';
import { ensureIsAdmin } from '../../middlewares/authentication';

import { insert, getById as getStudentById, getWithPagination, update } from '../../controllers/students/studentsController';
import { getByStudentId } from '../../controllers/students/performancesController';

const router = express.Router();

router.post('/', ensureIsAdmin, insert);
router.patch('/', ensureIsAdmin, update);
router.get('/', getWithPagination);
router.get('/:id', getStudentById);

router.get('/performance/:id', getByStudentId);

export default router;