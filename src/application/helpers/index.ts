import { WhereFilterOp } from "firebase/firestore";
import Person from "../../domain/Entities/Person/Person";
import Teacher from "../../domain/Entities/Person/Teacher";

import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";
import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload"

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

const getPersonFromBody = (body: Record<string, any>): Person => {
    const { name, birthdate, zipCode, phoneNumber, realId } = body;
    return {
        Id: '',
        CreatedAt: new Date(),
        Name: name,
        Birthdate: birthdate,
        ZipCode: zipCode,
        PhoneNumber: phoneNumber,
        RealId: realId
    }
}

const getTeacherFromBody = (body: Record<string, any>, ownerUserId: string): Teacher => {
    const teacher = getPersonFromBody(body) as Teacher;

    const { subjectsIds, classroomsIds } = body;
    teacher.SubjectsIds = subjectsIds;
    teacher.ClassroomsIds = classroomsIds;

    teacher.UserId = ownerUserId;
    return teacher;
}

export { getPaginationParams, getSearchParams, getPersonFromBody, getTeacherFromBody }