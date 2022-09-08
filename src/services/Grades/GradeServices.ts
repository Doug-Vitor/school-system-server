import Grade from "../../domain/Entities/Core/Grade";
import Subject from "../../domain/Entities/Core/Subject";
import Teacher from "../../domain/Entities/Person/Teacher";
import Student from "../../domain/Entities/Person/Student";

import IGradeServices from "../../domain/Interfaces/Services/IGradeServices";
import GenericRepository from "../../infrastructure/Repositories/GenericRepository";
import { collectionNames } from "../../domain/Constants";

import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";
import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";

import Responses from "../../domain/Responses/Responses";
import DefaultResponse from "../../domain/Responses/DefaultResponse";
import ErrorResponse from "../../domain/Responses/ErrorResponse";

export default class GradeServices implements IGradeServices {
    private _repository: GenericRepository<Grade>;

    constructor() {
        this._repository = new GenericRepository(collectionNames.grades);
    }

    private async EnsureEntitiesExists(subjectId: string, studentId: string, authenticatedTeacherId: string) {
        this.ValidateTeacherPermissions(authenticatedTeacherId, await this.GetStudentClassRoomId(studentId), subjectId);
        this.EnsureSubjectExists(subjectId);
    }

    private async ValidateTeacherPermissions(authenticatedTeacherId: string, classRoomId: string, subjectId: string): Promise<void> {
        const repository = new GenericRepository<Teacher>(collectionNames.teachers);
        const searchPayload: IFirestoreSearchPayload = {
            FieldName: "UserId",
            OperatorString: "==",
            SearchValue: authenticatedTeacherId
        };

        const teacher = (await repository.GetByField(searchPayload, {})).data[0];
        
        if (!teacher.SubjectsIds.includes(subjectId)) throw ErrorResponse.Unauthorized("Você não leciona essa matéria e, portanto, não pode fazer alterações na nota desse aluno.");
        if (!teacher.ClassroomsIds.includes(classRoomId)) throw ErrorResponse.Unauthorized("Você não leciona nessa sala de aula e, portanto, não pode fazer alterações na nota desse aluno.");
    }

    private async GetStudentClassRoomId(studentId: string): Promise<string> {
        const repository = new GenericRepository<Student>(collectionNames.students);
        const student = (await repository.GetById(studentId)).data;
        return student.ClassroomId;
    }

    private async EnsureSubjectExists(subjectId: string): Promise<void> {
        const repository = new GenericRepository<Subject>(collectionNames.subjects);
        repository.GetById(subjectId).catch(() => {
          const response = Responses.BAD_REQUEST_ERROR;
          throw new ErrorResponse(response.StatusCode, "Não foi possível encontrar esta matéria. Por favor, entre em contato com um administrador");  
        });
    }

    public async Insert(authenticatedTeacherId: string, grade: Grade): Promise<DefaultResponse<Grade>> {
        try {
            this.EnsureEntitiesExists(grade.SubjectId, grade.StudentId, authenticatedTeacherId);
            return this._repository.Insert(grade);
        } catch (error) { throw error }
    }

    public async GetBySubject(subjectId: string, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>> {
        try {
            const searchPayload: IFirestoreSearchPayload = {
                FieldName: "SubjectId",
                OperatorString: "==",
                SearchValue: subjectId
            }

            return await this._repository.GetByField(searchPayload, paginationPayload)
        } catch (error) { throw error; }
    }

    public async GetByStudent(studentId: string, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>> {
        try {
            const searchPayload: IFirestoreSearchPayload = {
                FieldName: "StudentId",
                OperatorString: "==",
                SearchValue: studentId
            }

            return await this._repository.GetByField(searchPayload, paginationPayload)
        } catch (error) { throw error; }
    }

    public async GetByAcademicYear(academicYear: number, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>> {
        try {
            const searchPayload: IFirestoreSearchPayload = {
                FieldName: "AcademicYear",
                OperatorString: "==",
                SearchValue: academicYear
            }

            return await this._repository.GetByField(searchPayload, paginationPayload)
        } catch (error) { throw error; }
    }

    public async Update(authenticatedTeacherId: string, id: string, grade: Grade): Promise<DefaultResponse<Grade>> {
        try {
            await this.EnsureEntitiesExists(grade.SubjectId, grade.StudentId, authenticatedTeacherId);
            return await this._repository.Update(id, grade);
        } catch (error) { throw error; }
    }

    public async Delete(authenticatedTeacherId: string, id: string): Promise<DefaultResponse<void>> {
        try {
            const grade = (await this._repository.GetById(id)).data;
            this.ValidateTeacherPermissions(authenticatedTeacherId, await this.GetStudentClassRoomId(grade.StudentId), grade.SubjectId);
            return await this._repository.Delete(id);
        } catch (error) { throw error; }
    }
}