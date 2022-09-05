import express, { Request, Response } from 'express';
import { WhereFilterOp } from 'firebase/firestore';

import BaseRepository from '../../infrastructure/Repositories/BaseRepository';
import IFirestoreSearchPayload from '../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload';
import IPaginationPayload from '../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { collectionName, page, itemsPerPage, orderBy, searchInField, searchOperator, searchString } = req.query;

    const searchPayload: IFirestoreSearchPayload = {
        FieldName: searchInField as string,
        OperatorString: searchOperator as WhereFilterOp || '==',
        SearchValue: searchString as string
    }

    const paginationPayload: IPaginationPayload = {
        Page: page as unknown as number,
        ItemsPerPage: itemsPerPage as unknown as number,
        OrderByField: orderBy as string
    }

    res.send(await new BaseRepository(collectionName as string).GetByField(searchPayload, paginationPayload));
});

export default router;