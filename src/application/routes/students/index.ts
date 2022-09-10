import express from 'express';
import { ensureIsAdmin } from '../../middlewares/authentication';
import { insert, getById, getWithPagination, update } from '../../controllers/studentsController';

const router = express.Router();

router.post('/', ensureIsAdmin, insert);
router.patch('/', ensureIsAdmin, update);
router.get('/', getWithPagination);
router.get('/:id', getById);

export default router;