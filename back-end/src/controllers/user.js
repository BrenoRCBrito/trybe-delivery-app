const userServices = require('../services/user');
const { create } = require('../utils/jwt');

const getAll = async (req, res) => {
  const { role } = req.user;
  const users = await userServices.getAll(role);
  return res.status(200).json({ users });
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await userServices.destroy(id, role);
  return res.status(204).end();
};

const renew = async (req, res) => {
  const { id, role, email } = req.user;
  const response = await userServices.renew(id, role, email);
  const {
    dataValues: { ...userWithoutPassword },
  } = response;
  delete userWithoutPassword.password;
  const token = create(userWithoutPassword);
  return res.status(200).json({ token, ...userWithoutPassword });
};

module.exports = { getAll, destroy, renew };
