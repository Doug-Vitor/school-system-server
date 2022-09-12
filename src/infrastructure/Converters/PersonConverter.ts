import { FieldPath, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";
import Person from "../../domain/Entities/Person/Person";

const toDate = (snapshot: QueryDocumentSnapshot, field: string | FieldPath) => (snapshot.get(field) as Timestamp).toDate();

const converter = () => ({
    toFirestore(data: Person) {
        return { ...data } as {};
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, _: SnapshotOptions): Person {
        const object = snapshot.data() as Person;

        object.id = snapshot.id;
        object.createdAt = toDate(snapshot, "createdAt");
        object.birthdate = toDate(snapshot, "birthdate");

        return object;
    }
});

export { converter };