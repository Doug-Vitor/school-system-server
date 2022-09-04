import BaseEntity from '../domain/Entities/BaseEntity';

import IPagination from '../domain/Interfaces/Infrastructure/Pagination/IPagination';
import IPaginationParameters from '../domain/Interfaces/Infrastructure/Pagination/IPaginationParameters';
import IFirestorePaginationResponse from '../domain/Interfaces/Infrastructure/Firestore/IFirestorePaginationResponse';

import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore as FirestoreApp, CollectionReference, DocumentReference, DocumentSnapshot, getFirestore, QueryConstraint, Query, DocumentData } from 'firebase/firestore';
import { collection, doc, query, where, orderBy, startAt, limit, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { converter } from './Converters/DefaultConverter';

import { config } from 'dotenv';
config();

export default class Firestore<T extends BaseEntity> {
    private _database: FirestoreApp;
    private _converter;

    private _collectionName: string;
    private _collection: CollectionReference;

    constructor(collectionName: string) {
        this._database = this.InitializeFirestore();
        this._converter = converter<T>();

        this._collectionName = collectionName;
        this._collection = collection(this._database, collectionName).withConverter(this._converter);
    }

    private InitializeFirestore() {
        const { MAIN_DATABASE_KEY, MAIN_DATABASE_AUTH_DOMAIN, MAIN_DATABASE_PROJECT_ID } = process.env;
        const options: FirebaseOptions = {
            apiKey: MAIN_DATABASE_KEY,
            authDomain: MAIN_DATABASE_AUTH_DOMAIN,
            projectId: MAIN_DATABASE_PROJECT_ID
        };

        return getApps().length === 0 ? getFirestore(initializeApp(options)) : getFirestore(getApp());
    }

    private GetDocRefById(id: string): DocumentReference<T> {
        return doc(this._collection, id).withConverter(this._converter);
    }

    private GetDefaultQuery(orderByField: string = "Id", queryConstraints: QueryConstraint[] = []): Query<T> {
        return query(this._collection, orderBy(orderByField), ...queryConstraints).withConverter(this._converter);
    }

    public async AddDoc(data: T): Promise<DocumentReference> {
        return addDoc(this._collection, data);
    }

    public GetDocById(id: string): Promise<DocumentSnapshot<T>> {
        return getDoc(doc(this._database, this._collectionName, id).withConverter(this._converter));
    }

    public async GetDocsByField(fieldName: string, searchValue: string, pagination?: IPaginationParameters): Promise<IFirestorePaginationResponse<T>> {
        const page = pagination?.Page ?? 1;
        const itemsPerPage = pagination?.ItemsPerPage ?? 10;
        const orderByField = pagination?.OrderByField;
        
        const sharedConstraints = [where(fieldName, "==", searchValue)];
        const mainConstraints = [startAt((page - 1) * itemsPerPage), limit(itemsPerPage), ...sharedConstraints];
        
        return {
            DocumentsSnapshot: getDocs(this.GetDefaultQuery(orderByField, mainConstraints)),
            Pagination: this.GetPagination(page, itemsPerPage, (await getDocs(this.GetDefaultQuery(orderByField, sharedConstraints))).size)
        }
    }

    public async GetDocs(pagination?: IPaginationParameters): Promise<IFirestorePaginationResponse<T>> {
        const page = pagination?.Page ?? 1;
        const itemsPerPage = pagination?.ItemsPerPage ?? 10;
        const orderByField = pagination?.OrderByField;

        const mainConstraints = [startAt((page - 1) * itemsPerPage), limit(itemsPerPage)];
        
        return {
            DocumentsSnapshot: getDocs(this.GetDefaultQuery(orderByField, mainConstraints)),
            Pagination: this.GetPagination(page, itemsPerPage, (await getDocs(this.GetDefaultQuery(orderByField))).size)
        };
    }

    public async UpdateDoc(id: string, data: {}): Promise<void> {
        return updateDoc(this.GetDocRefById(id), data);
    }

    public DeleteDoc(id: string): Promise<void> {
        return deleteDoc(this.GetDocRefById(id));
    }

    private GetPagination(page: number, itemsPerPage: number, docsLength: number): IPagination {
        return {
            CurrentPage: page,
            HasPreviousPage: page > 1,
            HasNextPage: page * itemsPerPage < docsLength
        }
    }
}