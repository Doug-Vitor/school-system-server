import BaseEntity from "../BaseEntity";
import IPerson from "../../Interfaces/Entities/Person/IPerson";

import { IsDate, IsString, Length } from "class-validator";
import { errors } from '../../Constants'

export default abstract class Person extends BaseEntity implements IPerson {
    @IsString({ message: errors.getInvalidPropertyErrorString("Nome") })
    @Length(3, 100, { message: errors.getLengthErrorString("Nome") })
    Name: string;

    @IsDate({ message: errors.getInvalidPropertyErrorString("Data de nascimento") })
    Birthdate: Date;

    constructor(name: string, birthdate: Date, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.Name = name;
        this.Birthdate = birthdate;
    }
}