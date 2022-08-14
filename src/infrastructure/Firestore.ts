import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';

import { Firestore as FirestoreApp, CollectionReference, DocumentReference, DocumentData, DocumentSnapshot, QuerySnapshot, getFirestore } from 'firebase/firestore';
import { collection, doc, where, query, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

import { converter } from './Converters/DefaultConverter';

export default class Firestore<T> {
    private _database: FirestoreApp;
    private converter;

    private _collectionName: string;
    private _collection: CollectionReference;

    constructor(collectionName: string) {
        this._database = this.InitializeFirestore();
        this.converter = converter<T>();

        this._collectionName = collectionName;
        this._collection = collection(this._database, collectionName).withConverter(this.converter);
    }

    private InitializeFirestore() {
        /* KNOWN ISSUE: customs environment variables is undefined (maybe the folder structuring?).
        const options: FirebaseOptions = {
            apiKey: process.env.MAIN_DATABASE_KEY,
            authDomain: process.env.MAIN_DATABASE_AUTH_DOMAIN,
            projectId: process.env.MAIN_DATABASE_PROJECT_ID
        };*/

        // SHOULD NOT BE HERE!
        const options: FirebaseOptions = {
            apiKey: "AIzaSyCupPnvf3ipjjvFGY64ttJ1fIfnz-di7yI",
            authDomain: "school-system-1914.firebaseapp.com",
            projectId: "school-system-1914"
        };

        return getApps().length === 0 ? getFirestore(initializeApp(options)) : getFirestore(getApp());
    }

    private GetDocRefById(id: string): DocumentReference<T> {
        return doc(this._collection, id).withConverter(this.converter);
    }

    public AddDoc(data: T): Promise<DocumentReference> {
        return addDoc(this._collection, data);
    }

    public GetDocById(id: string): Promise<DocumentSnapshot<T>> {
        return getDoc(doc(this._database, this._collectionName, id).withConverter(this.converter));
    }

    public GetDocsByField(fieldName: string, searchValue: string): Promise<QuerySnapshot<T>> {
        return getDocs(query(this._collection, where(fieldName, "==", searchValue)).withConverter(this.converter));
    }

    public GetDocs(): Promise<QuerySnapshot<T>> {
        return getDocs(query(this._collection).withConverter(this.converter));
    }

    public UpdateDoc(id: string, data: {}): Promise<void> {
        return updateDoc(this.GetDocRefById(id), data);
    }

    public DeleteDoc(id: string): Promise<void> {
        return deleteDoc(this.GetDocRefById(id));
    }
}