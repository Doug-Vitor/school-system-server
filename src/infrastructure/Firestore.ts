import { getApp, initializeApp } from 'firebase/app';

import { Firestore as FirestoreApp, CollectionReference, DocumentReference, DocumentData, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { collection, getFirestore, doc, addDoc, getDoc, getDocs, query, updateDoc, deleteDoc } from 'firebase/firestore';

import { env } from 'process';
import { converter } from './Converters/DefaultConverter';

export default class Firestore<T> {
    private _database: FirestoreApp;

    private _collectionName: string;
    private _collection: CollectionReference;

    constructor(collectionName: string) {
        this._database = this.initializeFirestore();


        this._collectionName = collectionName;
        this._collection = collection(this._database, collectionName).withConverter(converter<T>());
    }

    private initializeFirestore() {
        const options = {
            apiKey: env.MAIN_DATABASE_KEY,
            authDomain: env.MAIN_DATABASE_AUTH_DOMAIN
        };

        return getApp() ? getFirestore(getApp()) : getFirestore(initializeApp(options));
    }

    private getDocRefById(id: string): DocumentReference<T> {
        return doc(this._collection, id).withConverter(converter<T>());
    }

    addDoc(data: T): Promise<DocumentReference<DocumentData>> {
        return addDoc(this._collection, data);
    }

    getDocById(id: string): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this._database, this._collectionName, id));
    }

    getDocs(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(query(this._collection));
    }

    updateDoc(id: string, data: {}): Promise<void> {
        return updateDoc(this.getDocRefById(id), data);
    }

    deleteDoc(id: string): Promise<void> {
        return deleteDoc(this.getDocRefById(id));
    }
}