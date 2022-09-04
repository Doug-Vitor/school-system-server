import IPaginationParameters from "../../Interfaces/Infrastructure/Pagination/IPaginationParameters";
import DefaultResponse from "../../Responses/DefaultResponse";

export default interface IBaseRepository<T> {
    Insert(object: T): Promise<DefaultResponse<T>>
    GetById(id: string): Promise<DefaultResponse<T>>
    GetByField(fieldName: string, query: string, pagination: IPaginationParameters): Promise<DefaultResponse<T[]>>
    GetWithPagination(pagination: IPaginationParameters): Promise<DefaultResponse<T[]>>
    Update(id: string, object: T): Promise<DefaultResponse<T>>
    Delete(id: string): Promise<DefaultResponse<void>>
}