import Grade from "../../domain/Entities/Core/Grade";
import Teacher from "../../domain/Entities/Person/Teacher";

import IGradeServices from "../../domain/Interfaces/Services/IGradeServices";
import BaseRepository from "../../infrastructure/Repositories/BaseRepository";
import { collectionNames } from "../../domain/Constants";

import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";
import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";

import DefaultResponse from "../../domain/Responses/DefaultResponse";
import ErrorResponse from "../../domain/Responses/ErrorResponse";

export default class GradeServices implements IGradeServices {
    private _repository: BaseRepository<Grade>;
    private _teacherRepository: BaseRepository<Teacher>;

    constructor() {
        this._repository = new BaseRepository(collectionNames.grades);
        this._teacherRepository = new BaseRepository(collectionNames.teachers);
    }

    private async EnsureTeacherHasSubjectId(authenticatedTeacherId: string, subjectId: string): Promise<boolean> {
        try {
            const teacher = (await this._teacherRepository.GetById(authenticatedTeacherId)).data;
            if (teacher.SubjectsIds.includes(subjectId)) return true;
            throw ErrorResponse.AccessDenied();
        } catch (error) { throw error; }
    }

    public async Insert(authenticatedTeacherId: string, grade: Grade): Promise<DefaultResponse<Grade>> {
        try {
            this.EnsureTeacherHasSubjectId(authenticatedTeacherId, grade.SubjectId);
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
            await this.EnsureTeacherHasSubjectId(authenticatedTeacherId, id);
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