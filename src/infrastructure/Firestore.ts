import { getApps, initializeApp } from 'firebase/app';
import { env } from 'process';

export default class Firestore {
    constructor() {
        if (getApps().length === 0) {
            initializeApp({
                apiKey: env.MAIN_DATABASE_KEY,
                authDomain: env.MAIN_DATABASE_AUTH_DOMAIN
            })
        }
    }
}