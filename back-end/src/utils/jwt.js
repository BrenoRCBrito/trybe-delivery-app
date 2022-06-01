const fs = require('fs');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const getSecretPhrase = () => {
  try {
    return fs.readFileSync('jwt.evaluation.key', 'utf8');
  } catch (err) {
    console.error(err);
  }
};

const create = (payload) => {
  const secretPhrase = getSecretPhrase();
  return jwt.sign(payload, secretPhrase, jwtConfig);
};

const decode = (token) => {
  const secretPhrase = getSecretPhrase();
  return jwt.decode(token, secretPhrase);
};

module.exports = { decode, create };
