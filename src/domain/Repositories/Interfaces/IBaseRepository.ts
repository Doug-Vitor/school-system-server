export default interface IBaseRepository<T> {
    insert(object: T): Promise<T>
    getById(id: string | number): Promise<T>
    getWithPagination(page?: number): Promise<T[]>
    update(id: string | number, object: T): Promise<T>
    delete(id: string | number): Promise<Boolean>
}