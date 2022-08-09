import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

const converter = <T>() => ({
    toFirestore(data: {}) {
        return data;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        return snapshot.id, snapshot.data() as T;
    }
});

export { converter };