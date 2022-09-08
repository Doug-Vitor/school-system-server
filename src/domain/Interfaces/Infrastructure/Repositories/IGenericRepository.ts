import DefaultResponse from "../../../Responses/DefaultResponse";
import IFirestoreSearchPayload from "../Firestore/IFirestoreSearchPayload";
import IPaginationPayload from "../Pagination/IPaginationPayload";

export default interface IBaseRepository<T> {
    Insert(object: T): Promise<DefaultResponse<T>>
    GetById(id: string): Promise<DefaultResponse<T>>
    GetByField(searchPayload: IFirestoreSearchPayload, pagination: IPaginationPayload): Promise<DefaultResponse<T[]>>
    GetWithPagination(pagination: IPaginationPayload): Promise<DefaultResponse<T[]>>
    Update(id: string, object: T): Promise<DefaultResponse<T>>
    Delete(id: string): Promise<DefaultResponse<void>>
    EnsureExists(searchPayload: IFirestoreSearchPayload, errorMessage?: string): Promise<boolean>
}