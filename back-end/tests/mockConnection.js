const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock,
    { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = getConnection;
