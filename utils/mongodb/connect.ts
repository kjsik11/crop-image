import clientPromise from '.';

export const connectMongo = async (dbName: string) => {
  if (!dbName) {
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
  }

  return { db: (await clientPromise).db(dbName) };
};
