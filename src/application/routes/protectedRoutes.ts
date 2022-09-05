import express, { Request, Response } from 'express';
import subjectsRoute from './subjects';

import BaseRepository from '../../infrastructure/Repositories/BaseRepository';
import { getPaginationParams, getSearchParams } from '../helpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { collectionName} = req.query;

    const [searchPayload, paginationPayload] = [getSearchParams(req.query), getPaginationParams(req.query)];
    res.send(await new BaseRepository(collectionName as string).GetByField(searchPayload, paginationPayload));
});

router.use('/subjects', subjectsRoute);

export default router;