import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

const converter = <T>() => ({
    toFirestore(data: T) {
        let converted: Record<string, any> = {};
        for (const key in data) converted[key] = data[key];
        return converted;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        return snapshot.id, snapshot.data() as T;
    }
});

export { converter };