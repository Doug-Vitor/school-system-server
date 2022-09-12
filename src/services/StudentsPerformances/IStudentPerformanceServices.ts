import IStudentPerformance from "../../domain/Interfaces/Services/IStudentPerformance";

import StudentPerformance from "../../domain/Entities/Core/StudentPerformance";
import Activity from "../../domain/Entities/Core/Activity";

import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";
import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";

import DefaultResponse from "../../domain/Responses/DefaultResponse";
import GenericRepository from "../../infrastructure/Repositories/GenericRepository";
import { collectionNames } from "../../domain/Constants";
import TeacherRepository from "../../infrastructure/Repositories/TeacherRepository";
import StudentRepository from "../../infrastructure/Repositories/StudentRepository";

export default class StudentPerformanceServices implements IStudentPerformance {
    private _repository: GenericRepository<StudentPerformance>;

    private _activityInsert;
    private _teacherPermissionValidator;
    private _getStudentById;

    constructor() {
        this._repository = new GenericRepository(collectionNames.performances);

        this._activityInsert = new GenericRepository(collectionNames.activities).Insert;
        this._teacherPermissionValidator = new TeacherRepository().ValidateTeacherPermissions;
        this._getStudentById = new StudentRepository().GetById;
    }

    private async EnsurePerformanceExists(performance: StudentPerformance) {
        const searchPayloads = new Array<IFirestoreSearchPayload>();
        searchPayloads.push({
            FieldName: "StudentId",
            OperatorString: "==",
            SearchValue: performance.StudentId
        }, {
            FieldName: "SubjectId",
            OperatorString: "==",
            SearchValue: performance.SubjectId
        });

        return (await this.GetFirst(searchPayloads)).data;
    }

    private async GetStudentClassRoomId(studentId: string) {
        return (await this._getStudentById(studentId)).data.ClassroomId;
    }

    private async InsertActivities(performanceId: string, activities?: Activity[]) {
        try {
            if (activities)
                for await (const activity of activities) {
                    activity.StudentPerformanceId = performanceId;
                    await this._activityInsert(activity);
                }
        } catch (error) { throw error }
    }

    public async Insert(authenticatedTeacherId: string, performance: StudentPerformance, activities?: Activity[] | undefined): Promise<DefaultResponse<StudentPerformance>> {
        try {
            this._teacherPermissionValidator(authenticatedTeacherId, performance.SubjectId, await this.GetStudentClassRoomId(performance.StudentId));
            const existingPerformance = await this.EnsurePerformanceExists(performance);
            if (existingPerformance) return this.Update(authenticatedTeacherId, existingPerformance.Id, existingPerformance);

            const newPerformance = await this._repository.Insert(performance);
            this.InsertActivities(newPerformance.data.Id, activities);
            return newPerformance;
        } catch (error) { throw error }
    }

    public async GetById(id: string): Promise<DefaultResponse<StudentPerformance>> {
        try {
            return await this._repository.GetById(id);
        } catch (error) { throw error }
    }

    public async GetFirst(searchPayload: IFirestoreSearchPayload): Promise<DefaultResponse<StudentPerformance>> {
        try {
            return await this._repository.GetFirst(searchPayload);
        } catch (error) { throw error }
    }

    public async GetAll(pagination: IPaginationPayload): Promise<DefaultResponse<StudentPerformance[]>> {
        try {
            return await this._repository.GetAll(pagination);
        } catch (error) { throw error }
    }

    public async Search(searchPayload: IFirestoreSearchPayload | IFirestoreSearchPayload[], pagination: IPaginationPayload): Promise<DefaultResponse<StudentPerformance[]>> {
        try {
            return await this._repository.Search(searchPayload, pagination);
        } catch (error) { throw error }
    }

    public async Update(id: string, authenticatedTeacherId: string, performance: StudentPerformance, activities?: Activity[]): Promise<DefaultResponse<StudentPerformance>> {
        try {
            this._teacherPermissionValidator(authenticatedTeacherId, performance.SubjectId, await this.GetStudentClassRoomId(performance.StudentId))
            return this._repository.Update(id, performance);
        } catch (error) { throw error }
    }

    public async Delete(id: string, authenticatedTeacherId: string): Promise<DefaultResponse<void>> {
        try {
            const performance = await (await this.GetById(id)).data;
            this._teacherPermissionValidator(authenticatedTeacherId, performance.SubjectId, await this.GetStudentClassRoomId(performance.StudentId))
            return await this._repository.Delete(performance.Id);
        } catch (error) { throw error }
    }
}