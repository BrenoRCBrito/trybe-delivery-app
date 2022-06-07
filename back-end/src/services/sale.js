const { Sale, SaleProduct } = require('../database/models');

const include = [
  { all: true, attributes: { exclude: ['password'] } },
];

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
  await Promise.all(products.map(async ({ id: productId, quantity }) => {
    const newSaleProduct = await SaleProduct.create({ saleId, productId, quantity });
    return { ...newSaleProduct.dataValues };
  }));
  const sale = await Sale.findOne({ where: { id: saleId }, include });
  return sale;
};

const getSales = async (id, role) => {
  let sales;
  switch (role) {
    case 'customer':
      sales = await Sale.findAll({ where: { userId: id }, include });
      break;
    case 'seller':
      sales = await Sale.findAll({ where: { sellerId: id }, include });
      break;
    case 'administrator':
      sales = await Sale.findAll({ include });
      break;
    default:
      sales = [];
      break;
  }
  return sales;
};

const getSalesById = async (id, role, saleId) => {
  let sales;
  switch (role) {
    case 'customer':
      sales = await Sale.findAll({ where: { userId: id, id: saleId }, include });
      break;
    case 'seller':
      sales = await Sale.findAll({ where: { sellerId: id, id: saleId }, include });
      break;
    case 'administrator':
      sales = await Sale.findAll({ include });
      break;
    default:
      sales = [];
      break;
  }
  return sales;
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

module.exports = { getSales, getSalesById, create, update };
