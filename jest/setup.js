const fs = require('fs');
const path = require('path');

const loadEnvConfig = require('@next/env').loadEnvConfig;
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoMemoryServerStates } = require('mongodb-memory-server-core/lib/MongoMemoryServer');

const globalConfigPath = path.join(__dirname, 'globalConfig.json');

module.exports = async () => {
  const mongoServer = await MongoMemoryServer.create();

  if (mongoServer.state !== MongoMemoryServerStates.running) {
    await mongoServer.start();
  }

  const mongoConfig = {
    mongoDBName: 'test',
    mongoUri: mongoServer.getUri(),
  };

  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  global.__MONGOD__ = mongoServer;

  // Test Environment
  loadEnvConfig(process.cwd());
  process.env.HASHIDS_KEY = 'foo';
};
