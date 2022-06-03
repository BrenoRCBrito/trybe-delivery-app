const saleServices = require('../services/sale');

const getSales = async (req, res) => {
  const { id, role } = req.user;
  const sales = await saleServices.getSales(id, role);
  return res.status(200).json({ sales });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { role } = req.user;
  await saleServices.update(id, role, status);
  return res.status(204).end();
};

module.exports = { update, getSales };
