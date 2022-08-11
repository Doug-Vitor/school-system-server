export type Description = {
  StatusCode: number,
  Message: string,
};

export default class Responses {
  public static SUCCESS: Description = {
    StatusCode: 200,
    Message: 'Success.'
  };

  public static CREATED: Description = {
    StatusCode: 201,
    Message: 'Success.'
  }

  public static BAD_REQUEST_ERROR: Description = {
    StatusCode: 400,
    Message: 'Bad request.'
  };

  public static UNAUTHORIZED_ERROR: Description = {
    StatusCode: 401,
    Message: 'Unauthorized error.'
  };

  public static WRONG_CREDENTIALS_ERROR: Description = {
    StatusCode: 402,
    Message: 'Wrong credentials.'
  };

  public static ACCESS_DENIED_ERROR: Description = {
    StatusCode: 403,
    Message: 'Access denied.'
  };

  public static INTERNAL_ERROR: Description = {
    StatusCode: 500,
    Message: 'Internal server.'
  };

  public static NOT_FOUND_ERROR: Description = {
    StatusCode: 404,
    Message: 'Could not find matches to your search.'
  };
}