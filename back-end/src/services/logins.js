const md5 = require('md5');
const { User } = require('../database/models');

const login = async (email, password) => {
  const response = await User.findOne({ where: { email } });
  if (!response) {
    const noResponseError = { status: 404, error: 'User not found' };
    throw noResponseError;
  }
  if (response.password !== md5(password)) {
    const invalidPasswordError = { status: 400, error: 'Invalid password' };
    throw invalidPasswordError;
  }
  return response;
};

module.exports = login;
