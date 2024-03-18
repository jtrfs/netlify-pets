const cookie = require('cookie');

function isAdmin(event) {
  const incomingCookie = cookie.parse(event.headers.cookie || '');

  if (incomingCookie?.petadoption === 'klaseikaklaienaienclaija847591973892589156llslshgfsls') {
    return true;
  }
  return false;
}

module.exports = isAdmin;
