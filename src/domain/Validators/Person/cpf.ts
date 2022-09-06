import { ValidationOptions, buildMessage, ValidateBy } from 'class-validator';

const validateCpf = (value: string): boolean => {
    if (value && value.length === 14) {
        const [dot1, dot2, hyphen] = [value.substring(3).at(0), value.substring(7).at(0), value.substring(11).at(0)]
        return (dot1 && dot2) === "." && hyphen === "-";
    }
    
    return false;
}

const isCpf = (value: unknown) => typeof value === 'string' && validateCpf(value);

export function IsCpf(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy({
        name: "IsCpf",
        validator: {
            validate: (value): boolean => isCpf(value),
            defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be a valid CPF', validationOptions),
        },
    },
        validationOptions
    );
}