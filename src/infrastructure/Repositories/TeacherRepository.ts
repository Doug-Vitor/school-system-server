import Teacher from "../../domain/Entities/Person/Teacher";
import Subject from "../../domain/Entities/Core/Subject";
import Classroom from "../../domain/Entities/Core/Classroom";

import ITeacherRepository from "../../domain/Interfaces/Infrastructure/Repositories/ITeacherRepository";
import GenericRepository from "./GenericRepository";
import { collectionNames } from "../../domain/Constants";

import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";
import ErrorResponse from "../../domain/Responses/ErrorResponse";
import DefaultResponse from "../../domain/Responses/DefaultResponse";

export default class TeacherRepositoy extends GenericRepository<Teacher> implements ITeacherRepository {
    private _classRoomRepository: GenericRepository<Classroom>;
    private _subjectRepository: GenericRepository<Subject>

    constructor() {
        super(collectionNames.teachers);

        this._classRoomRepository = new GenericRepository(collectionNames.classrooms);
        this._subjectRepository = new GenericRepository(collectionNames.subjects);
    }

    public override async Insert(object: Teacher): Promise<DefaultResponse<Teacher>> {
        try {
            await this.ValidateTeacherArrays(object.ClassroomsIds, object.SubjectsIds);
            return super.Insert(object);
        } catch (error) { throw error; }
    }

    public override async Update(id: string, object: Teacher): Promise<DefaultResponse<Teacher>> {
        try {
            const teacher = (await super.GetByField({ FieldName: "UserId", OperatorString: "==", SearchValue: id }, {})).data[0]
            await this.ValidateTeacherArrays(object.ClassroomsIds, object.SubjectsIds);
            return super.Update(teacher.Id, object);
        } catch (error) { throw error; }
    }

    public async ValidateTeacherPermissions(authenticatedTeacherId: string, subjectId: string, classroomId: string): Promise<void> {
        try {
            const searchPayload: IFirestoreSearchPayload = {
                FieldName: "UserId",
                OperatorString: "==",
                SearchValue: authenticatedTeacherId
            }
            const authenticatedTeacher = (await this.GetByField(searchPayload, {})).data[0];

            if (!authenticatedTeacher.ClassroomsIds.includes(classroomId))
                throw ErrorResponse.Unauthorized("Você não leciona nessa sala de aula e, portanto, não pode realizar alterações por aqui.");
            if (!authenticatedTeacher.SubjectsIds.includes(subjectId))
                throw ErrorResponse.Unauthorized("Você não leciona essa matéria e, portanto, não pode realizar alterações por aqui.");
        } catch (error) { throw error; }
    }

    private async ValidateTeacherArrays(classroomsIds: string[], subjectsIds: string[]) {
        await this.ValidateClassRoomsIds(classroomsIds);
        await this.ValidateSubjectsIds(subjectsIds);
    }

    private async ValidateClassRoomsIds(classroomsIds: string[]) {
        try {
            for await (const id of classroomsIds) await this._classRoomRepository.GetById(id);
        } catch (error) { this.GetNotFoundError(error, "Sala de aula") }
    }

    private async ValidateSubjectsIds(subjectsIds: string[]) {
        try {
            for await (const id of subjectsIds) await this._subjectRepository.GetById(id);
        } catch (error) { this.GetNotFoundError(error, "Matéria") }
    }

    private GetNotFoundError(error: unknown, entity: string): ErrorResponse<unknown> {
        if (error instanceof ErrorResponse && error.statusCode === 404)
            return super.GetErrorObject(ErrorResponse.NotFound(entity))
        return super.GetErrorObject(error);

    }
}