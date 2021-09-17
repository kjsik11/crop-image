import Joi, { number } from 'joi';
import { ExitStatus } from 'typescript';

const ERROR_VARIANTS = ['CE'] as const;
type ErrorCode = `${typeof ERROR_VARIANTS[number]}${number}`;

// FIXME: convert to class declaration 🤔

// export interface g {
//   code: ErrorCode;
//   name: string;
//   message: string;
// }

//export function isg(error: any): error is CustomError {
//  try {
//    Joi.assert(
//      error,
//      Joi.object({
//        code: Joi.string().required().length(5),
//        name: Joi.string().required(),
//        message: Joi.string().required(),
//      }),
//    );
//  } catch {
//    return false;
//  }
//
//  return true;
//}

// export function createError2(
//   err: CustomError,
//   overrides?: Partial<Omit<CustomError, 'code'>>,
// ): {
//   return {
//     code: err.code,
//     name: overrides?.name || err.name,
//     message: overrides?.message || err.message,
//   };
// }

// export function createError(
//   errName: keyof typeof ERRORS,
//   overrides?: Partial<Omit<g, 'code'>>,
// ): g {
//   const err = ERRORS[errName];
//   return {
//     code: err.code,
//     name: overrides?.name || err.name,
//     message: overrides?.message || err.message,
//   };
// }

export class CustomError extends Error {
  code: string;
  status: number;
  name: string;
  message: string;

  constructor(code: string, status: number, name: string, message: string) {
    super();
    this.code = code;
    this.status = status;
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
