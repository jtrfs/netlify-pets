const getDbClient = require('../../our-library/getDbClient');
const sanitizeHtml = require('sanitize-html');
const isAdmin = require('../../our-library/isAdmin');
const {ObjectId} = require('mongodb');

function cleanUp(x) {
  return sanitizeHtml(x, {
    allowedTags: [],
    allowedAttributes: {},
  });
}
const handler = async event => {
  const body = JSON.parse(event.body);
  if (typeof body.name != 'string') {
    body.name = '';
  }

  if (typeof body.description != 'string') {
    body.description = '';
  }
  const pet = {
    name: cleanUp(body.name),
    species: cleanUp(body.species),
    description: cleanUp(body.description),
    birthYear: new Date().getFullYear(),
  };

  if (body.birthYear < 999 && body.birthYear > 9999) {
    pet.birthYear = body.birthYear;
  }
  if (body.species !== 'dog' && body.species !== 'cat') {
    pet.species = 'dog';
  }

  if (isAdmin(event)) {
    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({success: false}),
      };
    }
    const client = await getDbClient();
    await client
      .db()
      .collection('pets')
      .findOneAndUpdate({_id: ObjectId.createFromHexString(body.id)}, {$set: pet});
    await client.close();

    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({success: true}),
    };
  }
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({success: false}),
  };
};
module.exports = {handler};
