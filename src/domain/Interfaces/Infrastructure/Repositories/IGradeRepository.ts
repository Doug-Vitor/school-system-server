import Grade from "../../../Entities/Core/Grade";
import IBaseRepository from "./IBaseRepository";
import IPaginationPayload from "../Pagination/IPaginationPayload";
import DefaultResponse from "../../../Responses/DefaultResponse";

export default interface IGradeRepository extends IBaseRepository<Grade> {
    GetBySubject(subjectId: string, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>>
    GetByStudent(studentId: string, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>>
    GetByAcademicYear(academicYear: number, paginationPayload: IPaginationPayload): Promise<DefaultResponse<Grade[]>>
}