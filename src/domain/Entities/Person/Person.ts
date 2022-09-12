import BaseEntity from "../BaseEntity";
import IPerson from "../../Interfaces/Entities/Person/IPerson";

import { IsDate, IsPhoneNumber, IsString, Length } from "class-validator";
import { IsCpf, IsCep } from '../../Validators/index';

import { getInvalidPropertyErrorString,getLengthErrorString } from '../../Constants'

export default abstract class Person extends BaseEntity implements IPerson {
    @IsString({ message: getInvalidPropertyErrorString("Nome") })
    @Length(3, 100, { message: getLengthErrorString("Nome") })
    name: string;

    @IsDate({ message: getInvalidPropertyErrorString("Data de nascimento") }) birthdate: Date;

    @IsCpf({ message: getInvalidPropertyErrorString("CPF") }) public realId: string;
    @IsPhoneNumber("BR", { message: getInvalidPropertyErrorString("Número de telefone") }) public phoneNumber: string
    @IsCep({ message: getInvalidPropertyErrorString("CEP") }) public zipCode: string;

    constructor(name: string, birthdate: Date, phoneNumber: string, realId: string, zipcode: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.name = name;
        this.birthdate = birthdate;

        this.phoneNumber = phoneNumber;
        this.realId = realId;
        this.zipCode = zipcode;
    }
}