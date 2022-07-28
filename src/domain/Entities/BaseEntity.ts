import IBaseEntity from "./Interfaces/IBaseEntity";

export default abstract class BaseEntity implements IBaseEntity {
    Id?: String | Number;
    CreatedAt: Date;

    constructor(id? : String | Number, createdAt: Date = new Date()) {
        this.Id = id;
        this.CreatedAt = createdAt;
    }
}