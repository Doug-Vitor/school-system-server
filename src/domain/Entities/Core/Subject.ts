
import ISubject from "../../Interfaces/Entities/Core/ISubject";
import BaseEntity from "../BaseEntity";

import { IsString, Length } from "class-validator";
import { errors } from '../../../../constants.json';

export default class Subject extends BaseEntity implements ISubject {
    @IsString()
    @Length(4, 80, { message: errors["pt-br"].themeLength })
    public Theme: string;
    
    constructor(theme: string, createdAt?: Date, id?: string) {
        super(id, createdAt);
        
        this.Theme = theme;
    }
}