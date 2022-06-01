const md5 = require('md5');
const { User } = require('../database/models');

module.exports = async (name, email, password, role = 'customer') => {
  const response = await User.findOne({ where: { email } });
  if (response) {
    const existingUserError = { status: 409, error: 'User already exists' };
    throw existingUserError;
    // return res.status(409).send({ error: 'User already exists' });
  }
  const newUser = await User.create({
    name,
    email,
    password: md5(password),
    role,
  });
  return newUser;
};
