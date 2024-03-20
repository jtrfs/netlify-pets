const escape = require('escape-html');
const getDbClient = require('../../our-library/getDbClient');
const ObjectId = require('mongodb').ObjectId;
const isAdmin = require('../../our-library/isAdmin');

const handler = async event => {
  if (isAdmin(event)) {
    const body = JSON.parse(event.body);

    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({}),
      };
    }

    const client = await getDbClient();

    const pet = await client
      .db()
      .collection('pets')
      .findOne({_id: ObjectId.createFromHexString(body.id)});
    await client.close();

    pet.name = escape(pet.name);
    pet.species = escape(pet.species);
    pet.description = escape(pet.description);
    pet.birthYear = escape(pet.birthYear);

    return {
      statusCode: 200,
      headers: {'Content-Type': 'text/json'},
      body: JSON.stringify(pet),
    };
  }

  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({success: false}),
  };
};
module.exports = {handler};
