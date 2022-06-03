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
    const noUserError = { status: 401, error: 'User not found' };
    throw noUserError;
  }
  response.destroy();
};

module.exports = { getAll, destroy };
