import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';

import { Firestore as FirestoreApp, CollectionReference, DocumentReference, DocumentData, DocumentSnapshot, QuerySnapshot, getFirestore } from 'firebase/firestore';
import { collection, doc, addDoc, getDoc, getDocs, query, updateDoc, deleteDoc } from 'firebase/firestore';

import { converter } from './Converters/DefaultConverter';

export default class Firestore<T> {
    private _database: FirestoreApp;
    private converter;

    private _collectionName: string;
    private _collection: CollectionReference;

    constructor(collectionName: string) {
        this._database = this.initializeFirestore();
        this.converter = converter<T>();

        this._collectionName = collectionName;
        this._collection = collection(this._database, collectionName).withConverter(this.converter);
    }

    private initializeFirestore() {
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

    private getDocRefById(id: string): DocumentReference<T> {
        return doc(this._collection, id).withConverter(this.converter);
    }

    addDoc(data: T): Promise<DocumentReference> {
        return addDoc(this._collection, data);
    }

    getDocById(id: string): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this._database, this._collectionName, id).withConverter(this.converter));
    }

    getDocs(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(query(this._collection).withConverter(this.converter));
    }

    updateDoc(id: string, data: {}): Promise<void> {
        return updateDoc(this.getDocRefById(id), data);
    }

    deleteDoc(id: string): Promise<void> {
        return deleteDoc(this.getDocRefById(id));
    }
}