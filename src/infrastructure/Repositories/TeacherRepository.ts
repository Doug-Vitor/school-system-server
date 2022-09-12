import Teacher from "../../domain/Entities/Person/Teacher";
import Subject from "../../domain/Entities/Core/Subject";
import Classroom from "../../domain/Entities/Core/Classroom";

import ITeacherRepository from "../../domain/Interfaces/Infrastructure/Repositories/ITeacherRepository";
import GenericRepository from "./GenericRepository";
import { converter } from "../Converters/PersonConverter";
import { collectionNames } from "../../domain/Constants";

import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";
import ErrorResponse from "../../domain/Responses/ErrorResponse";
import DefaultResponse from "../../domain/Responses/DefaultResponse";

export default class TeacherRepository extends GenericRepository<Teacher> implements ITeacherRepository {
    private _classRoomRepository: GenericRepository<Classroom>;
    private _subjectRepository: GenericRepository<Subject>

    constructor() {
        super(collectionNames.teachers, converter());

        this._classRoomRepository = new GenericRepository(collectionNames.classrooms);
        this._subjectRepository = new GenericRepository(collectionNames.subjects);
    }

    public override async Insert(object: Teacher): Promise<DefaultResponse<Teacher>> {
        try {
            await this.ValidateTeacherArrays(object.classroomsIds, object.subjectsIds);
            return super.Insert(object);
        } catch (error) { throw error; }
    }

    public override async Update(id: string, object: Teacher): Promise<DefaultResponse<Teacher>> {
        try {
            const teacher = (await super.GetFirst({ FieldName: "userId", OperatorString: "==", SearchValue: id })).data;
            await this.ValidateTeacherArrays(object.classroomsIds, object.subjectsIds);
            return super.Update(teacher.id, object);
        } catch (error) { throw error; }
    }

    public async ValidateTeacherPermissions(authenticatedTeacherId: string, subjectId: string, classroomId: string): Promise<void> {
        try {            
            const searchPayload: IFirestoreSearchPayload = {
                FieldName: "userId",
                OperatorString: "==",
                SearchValue: authenticatedTeacherId
            }
            const authenticatedTeacher = (await this.GetFirst(searchPayload)).data;

            if (!authenticatedTeacher.classroomsIds.includes(classroomId))
                throw ErrorResponse.AccessDenied("Você não leciona nessa sala de aula e, portanto, não pode realizar alterações por aqui.");
            if (!authenticatedTeacher.subjectsIds.includes(subjectId))
                throw ErrorResponse.AccessDenied("Você não leciona essa matéria e, portanto, não pode realizar alterações por aqui.");
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