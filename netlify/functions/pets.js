const getDbClient = require('../../our-library/getDbClient');

const handler = async () => {
  const client = await getDbClient();
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
