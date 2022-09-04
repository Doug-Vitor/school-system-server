import IPaginationPayload from "../Pagination/IPaginationPayload";
import DefaultResponse from "../../../Responses/DefaultResponse";

export default interface IBaseRepository<T> {
    Insert(object: T): Promise<DefaultResponse<T>>
    GetById(id: string): Promise<DefaultResponse<T>>
    GetByField(fieldName: string, query: string, pagination: IPaginationPayload): Promise<DefaultResponse<T[]>>
    GetWithPagination(pagination: IPaginationPayload): Promise<DefaultResponse<T[]>>
    Update(id: string, object: T): Promise<DefaultResponse<T>>
    Delete(id: string): Promise<DefaultResponse<void>>
}