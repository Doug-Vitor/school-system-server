import { QuerySnapshot } from "firebase/firestore";
import IPagination from "../Pagination/IPagination";

export default interface IFirestorePaginationResponse<T> {
    DocumentsSnapshot: Promise<QuerySnapshot<T>>,
    Pagination: IPagination
}