import { MongoClient, MongoClientOptions } from 'mongodb';

import { MONGODB_URI } from '@src/defines/env';
import { isDev, isTest } from '@src/utils/env';

const options: MongoClientOptions = {
  ignoreUndefined: true,
};

interface GlobalWithMongoClient extends NodeJS.Global {
  _mongoClientPromise?: Promise<MongoClient>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (isTest()) {
  // use in-memory-mongo-server
  client = new MongoClient((global as any).__MONGO_URI__, options);
  clientPromise = client.connect();
} else if (isDev()) {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!(global as GlobalWithMongoClient)._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    (global as GlobalWithMongoClient)._mongoClientPromise = client.connect();
    console.log('created a new connection');
  }
  clientPromise = (global as GlobalWithMongoClient)._mongoClientPromise!;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
