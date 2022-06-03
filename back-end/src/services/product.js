const { Product } = require('../database/models');

const getProducts = async (role) => {
  if (role !== 'customer') {
    const unauthorizedError = { status: 401, error: 'Unauthorized' };
    throw unauthorizedError;
  }
  const products = await Product.findAll();
  return products;
};

module.exports = { getProducts };