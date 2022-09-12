import IStudentPerformance from "../../domain/Interfaces/Services/IStudentPerformance";

import Student from "../../domain/Entities/Person/Student";
import StudentPerformance from "../../domain/Entities/Core/StudentPerformance";
import Activity from "../../domain/Entities/Core/Activity";

import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";
import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";

import DefaultResponse from "../../domain/Responses/DefaultResponse";
import GenericRepository from "../../infrastructure/Repositories/GenericRepository";
import { collectionNames } from "../../domain/Constants";
import TeacherRepository from "../../infrastructure/Repositories/TeacherRepository";
import StudentRepository from "../../infrastructure/Repositories/StudentRepository";
import ErrorResponse from "../../domain/Responses/ErrorResponse";

export default class StudentPerformanceServices implements IStudentPerformance {
    private _repository: GenericRepository<StudentPerformance>;

    private _activityRepository: GenericRepository<Activity>;
    private _teacherRepository: TeacherRepository;
    private _studentRepository: StudentRepository;

    constructor() {
        this._repository = new GenericRepository(collectionNames.performances);

        this._activityRepository = new GenericRepository(collectionNames.activities);
        this._teacherRepository = new TeacherRepository();
        this._studentRepository = new StudentRepository();
    }

    private async EnsurePerformanceNotExists(performance: StudentPerformance) {
        const searchPayloads = new Array<IFirestoreSearchPayload>();
        searchPayloads.push({
            FieldName: "studentId",
            OperatorString: "==",
            SearchValue: performance.studentId
        }, {
            FieldName: "subjectId",
            OperatorString: "==",
            SearchValue: performance.subjectId
        });

        if ((await this.GetFirst(searchPayloads)).data.id)
            throw ErrorResponse.BadRequest("Esse aluno já possui desempenho registrado para esta matéria.");
    }

    private async ValidateTeacherPermissions(authenticatedTeacherId: string, subjectId: string, studentId: string) {
        try {
            await this._teacherRepository.ValidateTeacherPermissions(authenticatedTeacherId, subjectId, await this.GetStudentClassRoomId(studentId));
        } catch (error) { throw error; }
    }

    private async GetStudent(studentId: string) {
        return (await this._studentRepository.GetById(studentId)).data;
    }

    private async GetStudentClassRoomId(studentId: string) {
        try {
            return (await this.GetStudent(studentId)).classroomId;
        } catch (error) { throw error; }
    }

    private SetStaticFields(performance: StudentPerformance, academicYearFromStudent: number) {
        performance.year = new Date().getFullYear();
        performance.academicYear = academicYearFromStudent;

        return performance;
    }

    private async InsertActivities(performanceId: string, activities?: Activity[]) {
        try {
            if (activities)
                for await (const activity of activities) {
                    activity.studentPerformanceId = performanceId;
                    await this._activityRepository.Insert(activity);
                }
        } catch (error) { throw error }
    }

    private async UpdateActivities(performanceId: string, activities?: Activity[]) {
        try {
            if (activities)
                for await (const activity of activities) {
                    activity.studentPerformanceId = performanceId;
                    await this._activityRepository.Update(activity.id, activity);
                }
        } catch (error) { throw error }
    }


    public async Insert(authenticatedTeacherId: string, performance: StudentPerformance, activities?: Activity[] | undefined): Promise<DefaultResponse<StudentPerformance>> {
        try {
            const student = await this.GetStudent(performance.studentId)
            await this.ValidateTeacherPermissions(authenticatedTeacherId, performance.subjectId, student.id);

            await this.EnsurePerformanceNotExists(performance);

            const newPerformance = (await this._repository.Insert(this.SetStaticFields(performance, student.academicYear))).data;
            this.InsertActivities(newPerformance.id, activities);

            return new DefaultResponse(newPerformance);
        } catch (error) { throw error }
    }

    public async GetById(id: string): Promise<DefaultResponse<StudentPerformance>> {
        try {
            return await this._repository.GetById(id);
        } catch (error) { throw error }
    }

    public async GetFirst(searchPayload: IFirestoreSearchPayload | IFirestoreSearchPayload[]): Promise<DefaultResponse<StudentPerformance>> {
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
            const student = await this.GetStudent(performance.studentId)
            await this.ValidateTeacherPermissions(authenticatedTeacherId, performance.subjectId, student.id);

            const updatedPerformance = (await this._repository.Update(id, this.SetStaticFields(performance, student.academicYear))).data;
            await this.UpdateActivities(updatedPerformance.id, activities);
            return new DefaultResponse(updatedPerformance);
        } catch (error) { throw error }
    }

    public async Delete(id: string, authenticatedTeacherId: string): Promise<DefaultResponse<void>> {
        try {
            const performance = (await this.GetById(id)).data;
            await this.ValidateTeacherPermissions(authenticatedTeacherId, performance.subjectId, performance.studentId);
            return await this._repository.Delete(performance.id);
        } catch (error) { throw error }
    }
}