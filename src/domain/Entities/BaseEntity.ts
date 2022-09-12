import IBaseEntity from "../Interfaces/Entities/IBaseEntity";

export default abstract class BaseEntity implements IBaseEntity {
    id: string;
    createdAt: Date;

    constructor(id: string = '', createdAt: Date = new Date()) {
        this.id = id;
        this.createdAt = createdAt;
    }
}