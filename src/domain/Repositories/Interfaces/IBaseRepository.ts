import DefaultResponse from "../../Responses/DefaultResponse"

export default interface IBaseRepository<T> {
    Insert(object: T): Promise<DefaultResponse<T>>
    GetById(id: string): Promise<DefaultResponse<T>>
    GetByField(fieldName: string, query: string): Promise<DefaultResponse<T[]>>
    GetWithPagination(page?: number): Promise<DefaultResponse<T[]>>
    Update(id: string, object: T): Promise<DefaultResponse<T>>
    Delete(id: string): Promise<DefaultResponse<void>>
}