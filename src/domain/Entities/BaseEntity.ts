import IBaseEntity from "../Interfaces/Entities/IBaseEntity";

export default abstract class BaseEntity implements IBaseEntity {
    Id: string;
    CreatedAt: Date;

    constructor(id: string = '', createdAt: Date = new Date()) {
        this.Id = id;
        this.CreatedAt = createdAt;
    }
}