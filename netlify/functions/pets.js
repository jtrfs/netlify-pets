const {MongoClient} = require('mongodb');

const handler = async () => {
  const client = new MongoClient(process.env.CONNECTIONSTRING);

  await client.connect();
  console.log('MongoDB connected');
  const pets = await client.db().collection('pets').find().toArray();
  await client.close();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(pets),
  };
};

module.exports = {handler};
