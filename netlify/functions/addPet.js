const getDbClient = require('../../our-library/getDbClient');
const sanitizeHtml = require('sanitize-html');
const isAdmin = require('../../our-library/isAdmin');

function cleanUp(x) {
  return sanitizeHtml(x, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

const handler = async event => {
  const body = JSON.parse(event.body);

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
    // saving into the db
    const client = await getDbClient();
    await client.db().collection('pets').insertOne(pet);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({success: true}),
    };
  }
  // no permission
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({success: false}),
  };
};

module.exports = {handler};
