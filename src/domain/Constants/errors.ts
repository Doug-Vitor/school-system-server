const getRequiredPropertyErrorString = (propertyName: string = "$property") => `O campo ${propertyName} é obrigatório.`;
const getInvalidPropertyErrorString = (propertyName: string = "$property") => `Por favor, forneça um(a) ${propertyName} válido(a).`;
const getLengthErrorString = (propertyName: string = "$property") => `O ${propertyName} deve conter entre $constraint1 e $constraint2 caracteres.`

const getIdNotProvidedErrorString = () => "Forneça um identificador (ID) válido";
const getNotFoundErrorString = () => "Não foi possível encontrar resultados correspondentes aos parâmetros fornecidos.";

export { 
    getRequiredPropertyErrorString, getInvalidPropertyErrorString, getLengthErrorString,
    getIdNotProvidedErrorString, getNotFoundErrorString
 }