export default interface IBaseRepository<T> {
    Insert(object: T): Promise<T>
    GetById(id: string): Promise<T>
    GetByField(fieldName: string, query: string): Promise<T>
    GetWithPagination(page?: number): Promise<T[]>
    Update(id: string, object: T): Promise<T>
    Delete(id: string): Promise<boolean>
}