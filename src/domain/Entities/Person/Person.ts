import BaseEntity from "../BaseEntity";
import IPerson from "../../Interfaces/Entities/Person/IPerson";

import { IsDate, IsPhoneNumber, IsString, Length } from "class-validator";
import { IsCpf, IsCep } from '../../Validators/index';

import { getInvalidPropertyErrorString,getLengthErrorString } from '../../Constants'

export default abstract class Person extends BaseEntity implements IPerson {
    @IsString({ message: getInvalidPropertyErrorString("Nome") })
    @Length(3, 100, { message: getLengthErrorString("Nome") })
    Name: string;

    @IsDate({ message: getInvalidPropertyErrorString("Data de nascimento") })
    Birthdate: Date;

    @IsCpf({ message: getInvalidPropertyErrorString("CPF") }) public RealId: string;
    @IsPhoneNumber("BR", { message: getInvalidPropertyErrorString("Número de telefone") }) public PhoneNumber: string
    @IsCep({ message: getInvalidPropertyErrorString("CEP") }) public ZipCode: string;

    constructor(name: string, birthdate: Date, phoneNumber: string, realId: string, zipcode: string, createdAt?: Date, id?: string) {
        super(id, createdAt);

        this.Name = name;
        this.Birthdate = birthdate;

        this.PhoneNumber = phoneNumber;
        this.RealId = realId;
        this.ZipCode = zipcode;
    }
}