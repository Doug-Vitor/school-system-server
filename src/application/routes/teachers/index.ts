import express from 'express';
import { insert, getById, getWithPagination, update } from '../../controllers/teachersController';

const router = express.Router();

router.post('/', insert);
router.get('/:id', getById);
router.get('/', getWithPagination);
router.patch('/', update);

export default router;