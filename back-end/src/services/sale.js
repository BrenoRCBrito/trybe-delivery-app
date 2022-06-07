const { Sale, SaleProduct, User, Product } = require('../database/models');

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

const INCLUDE = [
  {
    model: User,
    as: 'user',
    attributes: ['id', 'name', 'email', 'role'],
  },
  {
    model: User,
    as: 'seller',
    attributes: ['id', 'name', 'email', 'role'],
  },
  {
    model: Product,
    as: 'products',
    through: { model: SaleProduct, as: 'qtd', attributes: ['quantity'] },
    attributes: ['id', 'name', 'price'],
  },
];

const getSales = async (id, role) => {
  let sales;
  switch (role) {
    case 'customer':
      sales = await Sale.findAll({ where: { userId: id }, include: INCLUDE });
      break;
    case 'seller':
      sales = await Sale.findAll({ where: { sellerId: id }, include: INCLUDE });
      break;
    case 'administrator':
      sales = await Sale.findAll({ include: { all: true } });
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

module.exports = { getSales, create, update };
