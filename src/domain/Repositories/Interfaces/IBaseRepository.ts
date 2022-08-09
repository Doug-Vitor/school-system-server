export default interface IBaseRepository<T> {
    insert(object: T): T
    getById(id: string | number): T
    getWithPagination(page?: number): T[]
    update(id: string | number, object: T): T
    delete(id: string | number): boolean
}