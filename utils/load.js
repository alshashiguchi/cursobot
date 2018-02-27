const dotenv = require('dotenv');

dotenv.load({ silent: true });

function getTelegram () {
  return {
    token: process.env.token,
    id_user: process.env.id_user
  };
}

module.exports = { getTelegram };
