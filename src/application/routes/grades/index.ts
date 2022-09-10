import express from 'express';
import { insert, update, remove } from '../../controllers/gradesController';

const router = express.Router();

router.post('/', insert);
router.patch('/', update);
router.delete('/', remove);

export default router;