const {MongoClient} = require('mongodb');

async function getDb() {
  const client = new MongoClient(process.env.CONNECTIONSTRING);
  await client.connect();
  console.log('MongoDB connected');
  return client;
}

module.exports = getDb;
