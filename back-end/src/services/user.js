const { User } = require('../database/models');

const getAll = async (role) => {
  let users;
  switch (role) {
    case 'administrator':
      users = await User.findAll({ attributes: { exclude: ['password'] } });
      break;
    case 'customer':
      users = await User.findAll({
        where: { role: 'seller' },
        attributes: { exclude: ['password', 'email', 'role'] },
      });
      break;
    default:
      users = [];
      break;
  }
  return users;
};

const destroy = async (id, role) => {
  if (role !== 'administrator') {
    const unauthorizedError = { status: 401, error: 'Unauthorized' };
    throw unauthorizedError;
  }
  const response = await User.findOne({ where: { id } });
  if (!response) {
    const noUserError = { status: 404, error: 'User not found' };
    throw noUserError;
  }
  response.destroy();
};

const renew = async (id, role, email) => {
  const foundUser = await User.findOne({ where: { id, role, email } });
  if (!foundUser) {
    const noUserError = { status: 404, error: 'User not found' };
    throw noUserError;
  }
  return foundUser;
};

module.exports = { getAll, destroy, renew };
