import BaseEntity from "../../../Entities/BaseEntity";

import IPaginationPayload from "../Pagination/IPaginationPayload";
import IFirestoreSearchPayload from "./IFirestoreSearchPayload";
import IFirestorePaginationResponse from "./IFirestorePaginationResponse";

import { DocumentReference, DocumentSnapshot } from 'firebase/firestore';

export default interface IFirestore<T extends BaseEntity> {
    AddDoc(data: T): Promise<DocumentReference>
    GetDocById(id: string): Promise<DocumentSnapshot<T>>
    GetDoc(searchPayload: IFirestoreSearchPayload): Promise<DocumentSnapshot<T>>
    GetDocs(pagination?: IPaginationPayload): Promise<IFirestorePaginationResponse<T>>
    GetDocsByField(searchPayloads: IFirestoreSearchPayload[], pagination?: IPaginationPayload): Promise<IFirestorePaginationResponse<T>>
    UpdateDoc(id: string, data: {}): Promise<void>
    DeleteDoc(id: string): Promise<void>
}