
import ISubject from "../../Interfaces/Entities/Core/ISubject";
import BaseEntity from "../BaseEntity";

import { IsString, Length } from "class-validator";
import { errors } from '../../Constants';

export default class Subject extends BaseEntity implements ISubject {
    @IsString({ message: errors.getInvalidPropertyErrorString("Tema da matéria") })
    @Length(4, 80, { message: errors.getLengthErrorString("Tema da matéria") })
    public Theme: string;

    constructor(theme: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.Theme = theme;
    }
}