export default interface IBaseRepository<T> {
    insert(object: T): Promise<T>
    getById(id: string): Promise<T>
    getByField(fieldName: string, query: string): Promise<T>
    getWithPagination(page?: number): Promise<T[]>
    update(id: string, object: T): Promise<T>
    delete(id: string): Promise<boolean>
}