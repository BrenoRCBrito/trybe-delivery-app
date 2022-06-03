const saleServices = require('../services/sale');

const create = async (req, res) => {
  const { id: userId, role } = req.user;
  if (role !== 'customer') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const { products, cart } = req.body;
  const newSale = saleServices.create(userId, products, cart);
  res.status(201).json({ sale: newSale });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { role } = req.user;
  await saleServices.update(id, role, status);
  return res.status(204).end();
};

module.exports = { create, update };
