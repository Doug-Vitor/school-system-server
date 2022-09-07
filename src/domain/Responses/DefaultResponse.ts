import IPagination from '../Interfaces/Infrastructure/Pagination/IPagination';
import Responses from './Responses';

export default class DefaultResponse<T> {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data: T;
    public readonly pagination?: IPagination;

    constructor(data: T = {} as T, pagination?: IPagination, statusCode?: number, message?: string) {
        this.statusCode = statusCode ?? Responses.SUCCESS.StatusCode;
        this.message = message ?? Responses.SUCCESS.Message;
        this.data = data;
        this.pagination = pagination;
    }
}