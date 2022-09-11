import BaseEntity from '../domain/Entities/BaseEntity';

import IFirestore from '../domain/Interfaces/Infrastructure/Firestore/IFirestore';
import IFirestoreSearchPayload from '../domain/Interfaces/Infrastructure/Firestore/IFirestoreSearchPayload';
import IPagination from '../domain/Interfaces/Infrastructure/Pagination/IPagination';
import IPaginationPayload from '../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload';
import IFirestorePaginationResponse from '../domain/Interfaces/Infrastructure/Firestore/IFirestorePaginationResponse';

import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore as FirestoreApp, CollectionReference, DocumentReference, DocumentSnapshot, getFirestore, QueryConstraint, Query, QuerySnapshot, QueryDocumentSnapshot, FieldPath } from 'firebase/firestore';
import { collection, doc, query, where, orderBy, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { converter } from './Converters/DefaultConverter';

import { config } from 'dotenv';
config();

export default class Firestore<T extends BaseEntity> implements IFirestore<T> {
    private _database: FirestoreApp;
    private _converter;

    private _collectionName: string;
    private _collection: CollectionReference;

    constructor(collectionName: string, entityConverter = converter<T>()) {
        this._database = this.InitializeFirestore();
        this._converter = entityConverter;

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

    private GetWhereConstraint(searchPayload: IFirestoreSearchPayload | IFirestoreSearchPayload[]) {
        return Array.isArray(searchPayload) ? 
            searchPayload.map(search => where(search.FieldName, search.OperatorString, search.SearchValue))
            : [where(searchPayload.FieldName, searchPayload.OperatorString, searchPayload.SearchValue)];
    }

    private GetDefaultQuery(queryConstraints: QueryConstraint[] = []): Query<T> {
        queryConstraints.unshift(orderBy("CreatedAt"));
        return query(this._collection, ...queryConstraints).withConverter(this._converter);
    }

    private PaginateDocs(documentsSnapshot: QuerySnapshot<T>, page: number, itemsPerPage: number): QueryDocumentSnapshot<T>[] {
        return documentsSnapshot.docs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }

    public async AddDoc(data: T): Promise<DocumentReference> {
        return addDoc(this._collection, data);
    }

    public GetDocById(id: string): Promise<DocumentSnapshot<T>> {
        return getDoc(doc(this._database, this._collectionName, id).withConverter(this._converter));
    }
    
    public async GetDocs(pagination?: IPaginationPayload): Promise<IFirestorePaginationResponse<T>> {
        const page = pagination?.Page || 1;
        const itemsPerPage = pagination?.ItemsPerPage || 10;
        
        const documentsSnapshot = await getDocs(this.GetDefaultQuery());
        return {
            Documents: this.PaginateDocs(documentsSnapshot, page, itemsPerPage),
            Pagination: this.GetPagination(page, itemsPerPage, documentsSnapshot.size)
        };
    }

    public async SearchDoc(searchPayload: IFirestoreSearchPayload): Promise<DocumentSnapshot<T>> {
        return (await getDocs(this.GetDefaultQuery(this.GetWhereConstraint(searchPayload)))).docs[0];
    }

    public async SearchDocs(searchPayload: IFirestoreSearchPayload | IFirestoreSearchPayload[], pagination?: IPaginationPayload): Promise<IFirestorePaginationResponse<T>> {
        const page = pagination?.Page || 1;
        const itemsPerPage = pagination?.ItemsPerPage || 10;
        
        const documentsSnapshot = await getDocs(this.GetDefaultQuery(this.GetWhereConstraint(searchPayload)));
        return {
            Documents: this.PaginateDocs(documentsSnapshot, page, itemsPerPage),
            Pagination: this.GetPagination(page, itemsPerPage, documentsSnapshot.size)
        }
    }
    
    public async UpdateDoc(id: string, data: {}): Promise<void> {
        return updateDoc(this.GetDocRefById(id), data);
    }
    
    public DeleteDoc(id: string): Promise<void> {
        return deleteDoc(this.GetDocRefById(id));
    }
    
    private GetPagination(page: number, itemsPerPage: number, collectionSize: number): IPagination {
        return {
            CurrentPage: page,
            HasPreviousPage: page > 1,
            HasNextPage: page * itemsPerPage < collectionSize
        }
    }
}