
import ISubject from "../../Interfaces/Entities/Core/ISubject";
import BaseEntity from "../BaseEntity";

import { IsString, Length } from "class-validator";
import { getInvalidPropertyErrorString, getLengthErrorString } from '../../Constants';

export default class Subject extends BaseEntity implements ISubject {
    @IsString({ message: getInvalidPropertyErrorString("Tema da matéria") })
    @Length(4, 80, { message: getLengthErrorString("Tema da matéria") })
    public theme: string;

    constructor(theme: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.theme = theme;
    }
}