import ITeacher from "../../Interfaces/Entities/Person/ITeacher";
import Person from "./Person";

import { ArrayMaxSize, ArrayMinSize, IsArray, } from "class-validator";
import { getInvalidPropertyErrorString } from "../../Constants";

export default class Teacher extends Person implements ITeacher {
    public userId: string;

    @IsArray({ message: getInvalidPropertyErrorString("matéria") })
    @ArrayMinSize(1, { message: "É necessário informar pelo menos uma matéria para lecionar." })
    @ArrayMaxSize(3, { message: "São permitidas apenas 3 matérias por professor" })
    public subjectsIds: string[];

    @IsArray({ message: getInvalidPropertyErrorString("sala de aula") })
    @ArrayMinSize(1, { message: "É necessário informar pelo menos uma sala de aula para lecionar." })
    public classroomsIds: string[];

    constructor(userId: string, name: string, birthdate: Date, phoneNumber: string, realId: string, zipCode: string, subjectsIds: string[], classroomsIds: string[], createdAt?: Date) {
        super(name, birthdate, phoneNumber, realId, zipCode, createdAt);

        this.userId = userId;
        this.subjectsIds = subjectsIds;
        this.classroomsIds = classroomsIds;
    }
}