import Grade from "../../domain/Entities/Core/Grade";
import Subject from "../../domain/Entities/Core/Subject";
import Teacher from "../../domain/Entities/Person/Teacher";
import Student from "../../domain/Entities/Person/Student";

import IGradeServices from "../../domain/Interfaces/Services/IGradeServices";
import BaseRepository from "../../infrastructure/Repositories/BaseRepository";
import { collectionNames } from "../../domain/Constants";

import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";
import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";

import Responses from "../../domain/Responses/Responses";
import DefaultResponse from "../../domain/Responses/DefaultResponse";
import ErrorResponse from "../../domain/Responses/ErrorResponse";

export default class GradeServices implements IGradeServices {
    private _repository: BaseRepository<Grade>;

    constructor() {
        this._repository = new BaseRepository(collectionNames.grades);
    }

    private async EnsureEntitiesExists(subjectId: string, studentId: string, authenticatedTeacherId: string) {
        this.EnsureTeacherHasSubjectId(authenticatedTeacherId, subjectId);
        this.EnsureStudentExists(studentId);
        this.EnsureSubjectExists(subjectId);
    }

    private async EnsureTeacherHasSubjectId(authenticatedTeacherId: string, subjectId: string): Promise<void> {
        const repository = new BaseRepository<Teacher>(collectionNames.teachers);
        const teacher = (await repository.GetById(authenticatedTeacherId)).data;
        if (teacher.SubjectsIds.includes(subjectId)) return;
        throw ErrorResponse.AccessDenied();
    }

    private async EnsureStudentExists(studentId: string): Promise<void> {
        const repository = new BaseRepository<Student>(collectionNames.students);
        repository.GetById(studentId).catch(() => {
          const response = Responses.BAD_REQUEST_ERROR;
          throw new ErrorResponse(response.StatusCode, "Não foi possível encontrar este aluno.");  
        });
    }

    private async EnsureSubjectExists(subjectId: string): Promise<void> {
        const repository = new BaseRepository<Subject>(collectionNames.subjects);
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
            await this.EnsureTeacherHasSubjectId(authenticatedTeacherId, id);
            return await this._repository.Delete(id);
        } catch (error) { throw error; }
    }
}