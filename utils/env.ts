export const getEnv: (name: string) => string = (name: string) => {
  const val = process.env[name];
  if (val !== undefined) {
    return val;
  }

  throw new Error(`NotFound: missing environment variable ${name}`);
};

export const isTest: () => boolean = () => {
  return process.env.NODE_ENV === 'test';
};

export const isDev: () => boolean = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProd: () => boolean = () => {
  return process.env.NODE_ENV === 'production';
};
