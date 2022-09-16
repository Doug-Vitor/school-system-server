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

    constructor(collectionName: string, converter?: any) {
        this._firestore = new Firestore<T>(collectionName, converter);
    }

    private ValidateId(id: string) {
        if (!id) throw new ErrorResponse(Responses.BAD_REQUEST_ERROR.StatusCode, getIdNotProvidedErrorString());
    }

    public async Insert(object: T): Promise<DefaultResponse<T>> {
        try {
            await validateOrReject(object);
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

    public async GetFirst(searchPayload: IFirestoreSearchPayload | IFirestoreSearchPayload[]): Promise<DefaultResponse<T>> {
        try {
            const object = await this._firestore.SearchDoc(searchPayload);
            return new DefaultResponse(object ? object.data() : undefined);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async GetAll(pagination: IPaginationPayload): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];

            const response = await this._firestore.GetDocs(pagination);
            response.Documents.forEach(doc => objects.push(doc.data()));

            return new DefaultResponse(objects, response.Pagination);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async Search(searchPayload: IFirestoreSearchPayload | IFirestoreSearchPayload[], pagination: IPaginationPayload): Promise<DefaultResponse<T[]>> {
        try {
            const objects: T[] = [];

            const response = await this._firestore.SearchDocs(searchPayload, pagination);
            response.Documents.forEach(doc => objects.push(doc.data()));

            return new DefaultResponse(objects, response.Pagination);
        } catch (error) { console.error(error); throw this.GetErrorObject(error) }
    }

    public async Update(id: string, object: T): Promise<DefaultResponse<T>> {
        try {
            const oldObject = (await this.GetById(id)).data;

            for (const key in object)
                if (!object[key]) object[key] = oldObject[key];

            await validateOrReject(object);

            await this._firestore.UpdateDoc(id, Object.assign({}, object));
            return new DefaultResponse(object);
        } catch (error) { throw this.GetErrorObject(error) }
    }

    public async Delete(id: string): Promise<DefaultResponse<void>> {
        try {
            await this._firestore.DeleteDoc((await this.GetById(id)).data.id);
            return new DefaultResponse();
        } catch (error) { throw this.GetErrorObject(error) }
    }

    protected GetErrorObject(error: ErrorResponse<unknown> | unknown) {
        if (error instanceof ErrorResponse) return error;
        else if (error instanceof Array<ValidationError>) {
            const response = Responses.BAD_REQUEST_ERROR;
            const errors = error.map((validationError: ValidationError) => Object.values(validationError.constraints ?? {}));
            return new ErrorResponse(response.StatusCode, response.Message, errors);
        }

        return new ErrorResponse();
    }
}