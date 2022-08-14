import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/login', (_: Request, res: Response) => res.send("Login route"));
router.post('/signup', (_: Request, res: Response) => res.send("Sign up route"));

export default router;