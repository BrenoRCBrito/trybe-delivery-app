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

module.exports = { getAll };
