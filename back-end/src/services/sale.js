const { Sale } = require('../database/models');

const getSales = async (id, role) => {
  let sales;
  switch (role) {
    case 'customer':
      sales = await Sale.findAll({ where: { userId: id } });      
      break;
    case 'seller':
      sales = await Sale.findAll({ where: { sellerId: id } });
      break;  
    case 'administrator':
      sales = await Sale.findAll();
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

module.exports = { update, getSales };
