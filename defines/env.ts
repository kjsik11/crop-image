import { getEnv } from '@utils/env';

// Auth
export const JWT_SECRET = getEnv('JWT_SECRET');
export const HASHIDS_KEY = getEnv('HASHIDS_KEY');

// AWS
export const AWS_KEY_ID = getEnv('AWS_KEY_ID');
export const AWS_SECRET = getEnv('AWS_SECRET');

// Mongo
export const MONGODB_URI = getEnv('MONGODB_URI');
export const MONGODB_NAME = getEnv('MONGODB_NAME');
