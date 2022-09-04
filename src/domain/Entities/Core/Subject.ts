import ISubject from "../../Interfaces/Entities/Core/ISubject";
import BaseEntity from "../BaseEntity";

export default class Subject extends BaseEntity implements ISubject {
    public Theme: string;
    
    constructor(theme: string, createdAt?: Date, id?: string) {
        super(id, createdAt);
        
        this.Theme = theme;
    }
}