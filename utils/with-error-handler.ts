import Joi from 'joi';
import { isResSent } from 'next/dist/shared/lib/utils';

import ERRORS, { CustomError } from '@defines/errors';

import { isProd } from './env';

import type { NextApiHandler } from 'next';

export function withErrorHandler(handler: NextApiHandler) {
  const wrappedHandler: NextApiHandler = async (req, res) => {
    try {
      await handler(req, res);

      if (!isResSent(res)) {
        res.status(400).json(ERRORS.METHOD_NOT_EXISTS());
      }
    } catch (err) {
      if (isResSent(res)) {
        return;
      }

      if (Joi.isError(err)) {
        return res.status(400).json(ERRORS.VALIDATION_FAILED(err.message));
      }

      if (err instanceof CustomError) {
        return res.status(err.status).json(err);
      }

      return res
        .status(res.statusCode >= 400 ? res.statusCode : 500)
        .json(ERRORS.INTERNAL_SERVER_ERROR(!isProd() ? (err as Error).message : undefined));
    }
  };

  return wrappedHandler;
}
