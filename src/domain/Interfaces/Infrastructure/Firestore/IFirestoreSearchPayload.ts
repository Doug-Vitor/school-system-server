import { FieldPath, WhereFilterOp } from "firebase/firestore";

export default interface IFirestoreSearchPayload {
    FieldName: string | FieldPath,
    OperatorString: WhereFilterOp,
    SearchValue: unknown
}