const productServices = require('../services/product');

const getProducts = async (req, res) => {
  const { role } = req.user;
  const products = await productServices.getProducts(role);
  return res.status(200).json({ products });
};

module.exports = { getProducts };
