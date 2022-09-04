import IPerson from "../Interfaces/Entities/IPerson";
import BaseEntity from "./BaseEntity";

import { IsDate, IsString, Length } from "class-validator";
import { errors } from '../../../constants.json';

export default abstract class Person extends BaseEntity implements IPerson {
    @IsString({ message: errors["pt-br"].invalidName })
    @Length(3, 100, { message: errors["pt-br"].nameLength })
    Name: string;

    @IsDate({ message: errors["pt-br"].invalidBirthdate })
    Birthdate: Date;

    constructor(name: string, birthdate: Date, id?: string) {
        super(id);

        this.Name = name;
        this.Birthdate = birthdate;
    }
}