// import Joi, { number } from 'joi';

// const ERROR_VARIANTS = ['CE'] as const;
// type ErrorCode = `${typeof ERROR_VARIANTS[number]}${number}`;

export class CustomError extends Error {
  code: string;
  statusCode: number;
  name: string;
  message: string;

  constructor(code: string, statusCode: number, name: string, message: string) {
    super();
    this.code = code;
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
  }
}

const ERRORS = {
  // Common Error
  INTERNAL_SERVER_ERROR: (message?: string) =>
    new CustomError('CE000', 500, 'Internal server error', message ?? 'Unhandled error occured.'),
  METHOD_NOT_EXISTS: (message?: string) =>
    new CustomError(
      'CE001',
      400,
      'Bad request method',
      message ?? 'Check request host and/or method.',
    ),
  VALIDATION_FAILED: (message?: string) =>
    new CustomError('CE002', 400, 'Validation failed', message ?? "Check your request's validity."),
  INVALID_TOKEN: (message?: string) =>
    new CustomError('CE003', 401, 'Invalid token', message ?? 'Invalid Token'),
  TOKEN_EXPIRED: (message?: string) =>
    new CustomError('CE004', 401, 'Token expired', message ?? 'Token expired'),
} as const;

export default ERRORS;
