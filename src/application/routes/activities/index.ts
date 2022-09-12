import { Router } from 'express';
import { getById } from '../../controllers/students/activitiesController';

const router = Router();

router.get('/:id', getById);

export default router;