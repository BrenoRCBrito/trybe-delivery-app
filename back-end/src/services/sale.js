const { Sale, SaleProduct } = require('../database/models');

const create = async (userId, products, cart) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber } = cart;
  const newSale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });
  const { id: saleId } = newSale;
  await products.map(async ({ id: productId, quantity }) => {
    const newSaleProduct = await SaleProduct.create({ saleId, productId, quantity });
    return newSaleProduct;
  });
  return newSale;
};

const update = async (id, role, status) => {
  if (role !== 'customer' && role !== 'seller') {
    const unauthorizedError = { status: 401, error: 'Unauthorized' };
    throw unauthorizedError;
  }
  const sale = await Sale.findOne({ where: { id } });
  if (!sale) {
    const noSaleError = { status: 401, error: 'Sale not found' };
    throw noSaleError;
  }
  await sale.update({ ...sale, status }, { where: { id } });
};

module.exports = { create, update };
