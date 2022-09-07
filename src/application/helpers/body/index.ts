import Person from "../../../domain/Entities/Person/Person";
import Teacher from "../../../domain/Entities/Person/Teacher";

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
    const person = getPersonFromBody(body);

    const { subjectsIds, classroomsIds } = body;
    return new Teacher(ownerUserId, person.Name, person.Birthdate, person.PhoneNumber, person.RealId, person.ZipCode, subjectsIds, classroomsIds);
}

export { getPersonFromBody, getTeacherFromBody };