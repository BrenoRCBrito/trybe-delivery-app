const userServices = require('../services/user');

const getAll = async (req, res) => {
  const { role } = req.user;
  const users = await userServices.getAll(role);
  return res.status(200).json({ users });
};

module.exports = { getAll };
