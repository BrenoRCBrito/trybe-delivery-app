const userServices = require('../services/user');

const getAll = async (req, res) => {
  const { role } = req.user;
  const users = await userServices.getAll(role);
  return res.status(200).json({ users });
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await userServices.destroy(id, role);
  return res.status(204).send();
};

module.exports = { getAll, destroy };
