import Grade from "../../Entities/Core/Grade";
import IPaginationPayload from "../Infrastructure/Pagination/IPaginationPayload";
import DefaultResponse from "../../Responses/DefaultResponse";

export default interface IGradeServices {
    Insert(authenticatedTeacherId: string, grade: Grade): Promise<DefaultResponse<Grade>>
    GetBySubject(subjectId: string, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>>
    GetByStudent(studentId: string, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>>
    GetByAcademicYear(academicYear: number, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>>
    Update(authenticatedTeacherId: string, id: string, grade: Grade): Promise<DefaultResponse<Grade>>
    Delete(authenticatedTeacherId: string, id: string): Promise<DefaultResponse<void>>
}