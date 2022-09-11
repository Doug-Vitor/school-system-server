import IPaginationPayload from "../../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";
import { WhereFilterOp } from "firebase/firestore";
import IFirestoreSearchPayload from "../../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";

const getPaginationParams = (queryParams: any): IPaginationPayload => {
    const { page, itemsPerPage } = queryParams;

    return {
        Page: page as unknown as number,
        ItemsPerPage: itemsPerPage as unknown as number
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

const getPerformanceSearchPayload = (studentId: string, queryParams: any): IFirestoreSearchPayload[] => {
    const { year, subjectId } = queryParams;

    const searchPayload = new Array<IFirestoreSearchPayload>();
    searchPayload.push({
        FieldName: "StudentId",
        OperatorString: "==",
        SearchValue: studentId
    });

    if (year) searchPayload.push({
        FieldName: "Year",
        OperatorString: "==",
        SearchValue: year as number
    });

    if (subjectId) searchPayload.push({
        FieldName: "SubjectId",
        OperatorString: "==",
        SearchValue: subjectId as string
    });

    return searchPayload;
}

export { getPaginationParams, getSearchParams, getPerformanceSearchPayload }