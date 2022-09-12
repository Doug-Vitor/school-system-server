import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";
import BaseEntity from "../../domain/Entities/BaseEntity";

const converter = <T extends BaseEntity>() => ({
    toFirestore(data: T) {
        let converted: Record<string, any> = {};
        for (const key in data) converted[key] = data[key];
        return converted;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        const object = snapshot.data() as T;
        object.id = snapshot.id;
        object.createdAt = (snapshot.get("createdAt") as Timestamp).toDate();
        
        return object;
    }
});

export { converter };