import IFirestoreSearchPayload from "../../../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";

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

export { getPerformanceSearchPayload }