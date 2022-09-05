const getRequiredPropertyErrorString = (propertyName: string = "$property") => `O campo ${propertyName} é obrigatório.`;
const getInvalidPropertyErrorString = (propertyName: string = "$property") => `${propertyName} inválido.`;
const getLengthErrorString = (propertyName: string = "$property") => `O ${propertyName} deve conter entre $constraint1 e $constraint2 caracteres.`

export { getRequiredPropertyErrorString, getInvalidPropertyErrorString, getLengthErrorString }