const handler = async () => {
  return {
    statusCode: 200,
    headers: {'Content-Type': 'text/plain'},
    body: 'johnny'.toUpperCase(),
  };
};

module.exports = {handler};
