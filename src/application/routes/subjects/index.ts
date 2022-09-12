import express from 'express';
import { insert, getWithPagination, getById } from '../../controllers/subjects/subjectsController';

const router = express.Router();

router.post('/', insert);
router.get('/', getWithPagination);
router.get('/:id', getById);

export default router;