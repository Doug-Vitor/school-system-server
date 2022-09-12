import { Router } from 'express';
import { getByPerformanceId } from '../../controllers/students/activitiesController';
import { getById } from '../../controllers/students/performancesController';

const router = Router();

router.get('/:id', getById);
router.get('/activities/:id', getByPerformanceId);

export default router;