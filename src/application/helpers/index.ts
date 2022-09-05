import { WhereFilterOp } from "firebase/firestore";

import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";
import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload"

import * as authenticationHelpers from "./authentication/index";

const getPaginationParams = (queryParams: any): IPaginationPayload => {
    const { page, itemsPerPage, orderByField } = queryParams;

    return {
        Page: page as unknown as number,
        ItemsPerPage: itemsPerPage as unknown as number,
        OrderByField: orderByField as string
    }
}

const getSearchParams = (queryParams: any): IFirestoreSearchPayload => {
    const { searchInField, searchOperator, searchString } = queryParams;

    return {
        FieldName: searchInField as string,
        OperatorString: searchOperator as WhereFilterOp || '==',
        SearchValue: searchString as string
    }
}

export { getPaginationParams, getSearchParams, authenticationHelpers }