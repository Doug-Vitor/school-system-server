import { QueryDocumentSnapshot } from "firebase/firestore";
import IPagination from "../Pagination/IPagination";

export default interface IFirestorePaginationResponse<T> {
    Documents: QueryDocumentSnapshot<T>[],
    Pagination: IPagination
}