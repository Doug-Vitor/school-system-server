import { Router } from 'express';
import { getById, insert, update, remove } from '../../controllers/students/performancesController';
import { getByPerformanceId } from '../../controllers/students/activitiesController';

const router = Router();

router.get('/:id', getById);
router.get('/activities/:id', getByPerformanceId);
router.post('/', insert);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;