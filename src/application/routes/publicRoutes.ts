import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_: Request, res: Response) => res.send('My first API with typescript'));

export default router;