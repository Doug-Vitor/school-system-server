import express from 'express';
import { insert, getWithPagination, getById } from '../../controllers/subjectsController';

const router = express.Router();

router.use('/', insert);
router.use('/', getWithPagination);
router.use('/:id', getById);

export default router;