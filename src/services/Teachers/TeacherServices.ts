import Teacher from "../../domain/Entities/Person/Teacher";
import Student from "../../domain/Entities/Person/Student";
import Subject from "../../domain/Entities/Core/Subject";
import Classroom from "../../domain/Entities/Core/Classroom";

import ITeacherServices from "../../domain/Interfaces/Services/ITeacherServices";
import GenericRepository from "../../infrastructure/Repositories/GenericRepository";
import { collectionNames } from "../../domain/Constants";

import ErrorResponse from "../../domain/Responses/ErrorResponse";
import DefaultResponse from "../../domain/Responses/DefaultResponse";

export default class TeacherServices extends GenericRepository<Teacher> implements ITeacherServices {
    private _classRoomRepository: GenericRepository<Classroom>;
    private _subjectRepository: GenericRepository<Subject>

    constructor() {
        super(collectionNames.teachers);

        this._classRoomRepository = new GenericRepository(collectionNames.classrooms);
        this._subjectRepository = new GenericRepository(collectionNames.subjects);
    }

    public override Insert(object: Teacher): Promise<DefaultResponse<Teacher>> {
        this.ValidateTeacherArrays(object.ClassroomsIds, object.SubjectsIds);
        return super.Insert(object);
    }

    public Update(id: string, object: Teacher): Promise<DefaultResponse<Teacher>> {
        this.ValidateTeacherArrays(object.ClassroomsIds, object.SubjectsIds);
        return super.Update(id, object);
    }

    public async ValidateTeacherPermissions(authenticatedTeacherId: string, subjectId: string, studentId: string): Promise<void> {
        const authenticatedTeacher = (await this.GetById(authenticatedTeacherId)).data;
        const student = (await new GenericRepository<Student>(collectionNames.students).GetById(studentId)).data;

        if (!authenticatedTeacher.ClassroomsIds.includes(student.ClassroomId))
            throw ErrorResponse.Unauthorized("Você não leciona nessa sala de aula e, portanto, não pode realizar alterações por aqui.");
        if (!authenticatedTeacher.SubjectsIds.includes(subjectId))
            throw ErrorResponse.Unauthorized("Você não leciona essa matéria e, portanto, não pode realizar alterações por aqui.");
    }

    private ValidateTeacherArrays(classroomsIds: string[], subjectsIds: string[]) {
        classroomsIds.forEach(id => this._classRoomRepository.GetById(id));
        subjectsIds.forEach(id => this._subjectRepository.GetById(id));
    }
}