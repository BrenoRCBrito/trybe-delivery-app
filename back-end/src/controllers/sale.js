const saleServices = require('../services/sale');

const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { role } = req.user;
  await saleServices.update(id, role, status);
  return res.status(204).end();
};

module.exports = { update };
