import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_: Request, res: Response) => res.send('Protected routes'));

export default router;