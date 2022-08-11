export type Description = {
  StatusCode: number,
  Message: string,
};

export default class Responses {
  public static SUCCESS: Description = {
    StatusCode: 200,
    Message: 'Operação sucedida.'
  };

  public static CREATED: Description = {
    StatusCode: 201,
    Message: 'Operação sucedida.'
  }

  public static BAD_REQUEST_ERROR: Description = {
    StatusCode: 400,
    Message: 'Requisição inválida.'
  };

  public static UNAUTHORIZED_ERROR: Description = {
    StatusCode: 401,
    Message: 'Acesso negado.'
  };

  public static WRONG_CREDENTIALS_ERROR: Description = {
    StatusCode: 402,
    Message: 'Credenciais inválidas.'
  };

  public static ACCESS_DENIED_ERROR: Description = {
    StatusCode: 403,
    Message: 'Acesso negado.'
  };

  public static INTERNAL_ERROR: Description = {
    StatusCode: 500,
    Message: 'Erro do servidor.'
  };

  public static NOT_FOUND_ERROR: Description = {
    StatusCode: 404,
    Message: 'Não foi possível encontrar correspondências à sua pesquisa.'
  };
}