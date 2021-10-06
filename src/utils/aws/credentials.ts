import { getEnv } from '@src/utils/env';

const accessKeyId = getEnv('AWS_KEY_ID');
const secretAccessKey = getEnv('AWS_SECRET');

const awsCredentials = {
  accessKeyId,
  secretAccessKey,
};

export default awsCredentials;
