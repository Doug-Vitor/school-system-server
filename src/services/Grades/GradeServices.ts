import Grade from "../../domain/Entities/Core/Grade";
import Subject from "../../domain/Entities/Core/Subject";

import GenericRepository from "../../infrastructure/Repositories/GenericRepository";
import { collectionNames } from "../../domain/Constants";

import IGradeServices from "../../domain/Interfaces/Services/IGradeServices";
import TeacherRepository from "../../infrastructure/Repositories/TeacherRepository";

import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";
import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";

import DefaultResponse from "../../domain/Responses/DefaultResponse";

export default class GradeServices implements IGradeServices {
    private _repository: GenericRepository<Grade>;
    private _teacherRepository: TeacherRepository;

    constructor() {
        this._repository = new GenericRepository(collectionNames.grades);
        this._teacherRepository = new TeacherRepository();
    }

    private async EnsureEntitiesExists(subjectId: string, studentId: string, authenticatedTeacherId: string) {
        try {
            await new GenericRepository<Subject>(collectionNames.subjects).GetById(subjectId);
            await this._teacherRepository.ValidateTeacherPermissions(authenticatedTeacherId, subjectId, studentId);
        } catch (error) { throw error; }
    }

    public async Insert(authenticatedTeacherId: string, grade: Grade): Promise<DefaultResponse<Grade>> {
        try {
            console.log(grade);
            await this.EnsureEntitiesExists(grade.SubjectId, grade.StudentId, authenticatedTeacherId);
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
            this._teacherRepository.ValidateTeacherPermissions(authenticatedTeacherId, grade.SubjectId, grade.StudentId);
            return await this._repository.Delete(grade.Id);
        } catch (error) { throw error; }
    }
}