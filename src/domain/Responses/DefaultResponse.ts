import IPagination from '../Interfaces/Infrastructure/Pagination/IPagination';
import Responses from './Responses';

export default class DefaultResponse<T> {
    public readonly StatusCode: number;
    public readonly Message: string;
    public readonly Data?: T;
    public readonly Pagination?: IPagination;

    constructor(data?: T, pagination?: IPagination, statusCode?: number, message?: string) {
        this.StatusCode = statusCode ?? Responses.SUCCESS.StatusCode;
        this.Message = message ?? Responses.SUCCESS.Message;
        this.Data = data;
        this.Pagination = pagination;
    }
}