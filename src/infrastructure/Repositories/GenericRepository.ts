import BaseEntity from "../../domain/Entities/BaseEntity";

import Firestore from "../Firestore";
import IGenericRepository from "../../domain/Interfaces/Infrastructure/Repositories/IGenericRepository";
import IFirestoreSearchPayload from "../../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload";
import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload";
import { getIdNotProvidedErrorString, getNotFoundErrorString } from "../../domain/Constants";

import Responses from "../../domain/Responses/Responses";
import DefaultResponse from "../../domain/Responses/DefaultResponse";
import ErrorResponse from '../../domain/Responses/ErrorResponse';
import { validateOrReject, ValidationError } from "class-validator";

export default class GenericRepository<T extends BaseEntity> implements IGenericRepository<T> {
    protected _firestore: Firestore<T>;

    constructor(collectionName: string) {
        this._firestore = new Firestore<T>(collectionName);
    }

    private ValidateId(id: string) {
        if (!id) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, getIdNotProvidedErrorString());
    }

    private async ValidateObject(object: T) {
        await validateOrReject(object);
    }

    public async Insert(object: T): Promise<DefaultResponse<T>> {
        try {
            this.ValidateObject(object);
            return this.GetById((await this._firestore.AddDoc(object)).id);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async GetById(id: string): Promise<DefaultResponse<T>> {
        try {
            this.ValidateId(id);
            const object = (await this._firestore.GetDocById(id)).data();

            if (object) return new DefaultResponse(object);
            throw new ErrorResponse(Responses.NOT_FOUND_ERROR.StatusCode, getNotFoundErrorString());
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async GetByField(searchPayload: IFirestoreSearchPayload, pagination: IPaginationPayload): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];
            
            const response = await this._firestore.GetDocsByField(searchPayload, pagination);
            response.Documents.forEach(doc => objects.push(doc.data()));

            return new DefaultResponse(objects, response.Pagination);
        } catch (error) { console.error(error); throw this.GetErrorObject(error) }
    }

    public async GetWithPagination(pagination: IPaginationPayload): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];
            
            const response = await this._firestore.GetDocs(pagination);
            response.Documents.forEach(doc => objects.push(doc.data()));

            return new DefaultResponse(objects, response.Pagination);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async Update(id: string, object: T): Promise<DefaultResponse<T>> {
        try {
            const updated = Object.assign({ ...(await this.GetById(id)).data }, object);
            await this.ValidateObject(updated);

            this._firestore.UpdateDoc(id, updated);
            return new DefaultResponse(updated);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async Delete(id: string): Promise<DefaultResponse<void>> {
        try {
            await this._firestore.DeleteDoc((await this.GetById(id)).data.Id);
            return new DefaultResponse();
        } catch (error) { throw this.GetErrorObject(error) }
    }

    private GetErrorObject(error: ErrorResponse<unknown> | unknown) {
        if (error instanceof ErrorResponse) return error;
        else if (error instanceof Array<ValidationError>) {
            const response = Responses.BAD_REQUEST_ERROR;
            const errors = error.map((validationError: ValidationError) => validationError.constraints);
            return new ErrorResponse(response.StatusCode, response.Message, errors);
        }

        return new ErrorResponse();
    }
}