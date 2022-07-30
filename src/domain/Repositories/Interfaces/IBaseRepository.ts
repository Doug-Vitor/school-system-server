export default interface IBaseRepository<T> {
    insert(object: T): Promise<T>
    getById(id: String | Number): Promise<T>
    getWithPagination(page?: Number): Promise<T[]>
    update(id: String | Number, object: T): Promise<T>
    delete(id: String | Number): Promise<Boolean>
}