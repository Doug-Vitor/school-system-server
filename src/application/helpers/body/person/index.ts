import Person from "../../../../domain/Entities/Person/Person";
import Teacher from "../../../../domain/Entities/Person/Teacher";
import Student from "../../../../domain/Entities/Person/Student";

const getPersonFromBody = (body: Record<string, any>): Person => {
    const { name, birthdate, zipCode, phoneNumber, realId } = body;
    return {
        id: '',
        createdAt: new Date(),
        name,
        birthdate: new Date(birthdate),
        zipCode,
        phoneNumber,
        realId
    }
}

const getTeacherFromBody = (body: Record<string, any>, ownerUserId: string): Teacher => {
    const person = getPersonFromBody(body);

    const { subjectsIds, classroomsIds } = body;
    return new Teacher(ownerUserId, person.name, person.birthdate, person.phoneNumber, person.realId, person.zipCode, subjectsIds, classroomsIds);
}

const getStudentFromBody = (body: Record<string, any>): Student => {
    const person = getPersonFromBody(body);

    const { classroomId, academicYear, isActive, medicalObservations } = body;
    return new Student(person.name, person.birthdate, person.phoneNumber, person.realId, person.zipCode, classroomId, academicYear, isActive, medicalObservations);
}

export { getPersonFromBody, getTeacherFromBody, getStudentFromBody };