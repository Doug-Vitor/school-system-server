import { ValidationOptions, buildMessage, ValidateBy } from 'class-validator';

const validateCep = (value: string): boolean => {
    return value && value.length === 9 ?
        value.substring(5) === "-" && value.replace(/\D/g, "").length === 8
        : false;
}

const isCep = (value: unknown) => typeof value === 'string' && validateCep(value);

export function IsCep(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy({
        name: "IsCep",
        validator: {
            validate: (value): boolean => isCep(value),
            defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be a valid CEP', validationOptions),
        },
    },
        validationOptions
    );
}