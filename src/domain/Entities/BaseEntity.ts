import IBaseEntity from "./Interfaces/IBaseEntity";

export default abstract class BaseEntity implements IBaseEntity {
    Id?: string | number;
    CreatedAt: Date;

    constructor(id? : string | number, createdAt: Date = new Date()) {
        this.Id = id;
        this.CreatedAt = createdAt;
    }
}