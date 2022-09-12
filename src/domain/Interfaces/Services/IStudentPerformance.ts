import StudentPerformance from "../../Entities/Core/StudentPerformance"
import Activity from "../../Entities/Core/Activity"

import IFirestoreSearchPayload from "../Infrastructure/Firestore/IFirestoreSearchPayload"
import IPaginationPayload from "../Infrastructure/Pagination/IPaginationPayload"

import DefaultResponse from "../../Responses/DefaultResponse"

export default interface IStudentPerformance{
    Insert(performance: StudentPerformance, activities?: Activity[]): Promise<DefaultResponse<StudentPerformance>>
    GetById(id: string): Promise<DefaultResponse<StudentPerformance>>
    GetFirst(searchPayload: IFirestoreSearchPayload): Promise<DefaultResponse<StudentPerformance>>
    GetAll(pagination: IPaginationPayload): Promise<DefaultResponse<StudentPerformance[]>>
    Search(searchPayload: IFirestoreSearchPayload | IFirestoreSearchPayload[], pagination: IPaginationPayload): Promise<DefaultResponse<StudentPerformance[]>>
    Update(id: string, performance: StudentPerformance): Promise<DefaultResponse<StudentPerformance>>
    Delete(id: string): Promise<DefaultResponse<void>>
}