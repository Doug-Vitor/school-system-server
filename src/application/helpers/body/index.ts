import Person from "../../../domain/Entities/Person/Person";
import Teacher from "../../../domain/Entities/Person/Teacher";
import Student from "../../../domain/Entities/Person/Student";

const getPersonFromBody = (body: Record<string, any>): Person => {
    const { name, birthdate, zipCode, phoneNumber, realId } = body;
    return {
        Id: '',
        CreatedAt: new Date(),
        Name: name,
        Birthdate: new Date(birthdate),
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

const getStudentFromBody = (body: Record<string, any>): Student => {
    const person = getPersonFromBody(body);

    const { classroomId, academicYear, isActive, medicalObservations } = body;
    return new Student(person.Name, person.Birthdate, person.PhoneNumber, person.RealId, person.ZipCode, classroomId, academicYear, isActive, medicalObservations);
}

export { getPersonFromBody, getTeacherFromBody, getStudentFromBody };