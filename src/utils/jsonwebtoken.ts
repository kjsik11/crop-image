import jwt from 'jsonwebtoken';

import ERRORS from '@src/defines/errors';

import { getEnv } from './env';

const JWT_ALGORITHM = 'HS512';
const JWT_SECRET = getEnv('JWT_SECRET');

interface SignTokenOption {
  expiresIn?: string | number;
}
export const signToken = (payload: object, options?: SignTokenOption) => {
  return jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM, ...options });
};

interface VerifyTokenOption {
  ignoreExpired?: boolean;
}
export const verifyToken = <T extends object = any>(
  token: string,
  options?: VerifyTokenOption,
): T => {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload as T;
  } catch (err) {
    if ((err as Error).name === 'TokenExpiredError') {
      if (options?.ignoreExpired) {
        return jwt.decode(token) as jwt.JwtPayload as T;
      }

      throw ERRORS.TOKEN_EXPIRED('TOKEN EXPIRED');
    }

    throw ERRORS.INVALID_TOKEN('INVALID TOKEN');
  }
};

export const renewToken = (token: string): string => {
  const payload = verifyToken(token, { ignoreExpired: true });
  return signToken(payload);
};
