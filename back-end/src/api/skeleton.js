const md5 = require('md5');

const fs = require('fs');

const jwt = require('jsonwebtoken');

const { User, Product, Sale, SaleProduct } = require('../database/models');

let secretPhrase = 'secret';
try {
  secretPhrase = fs.readFileSync('jwt.evaluation.key', 'utf8');
} catch (err) {
  console.error(err);
}

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

console.log(secretPhrase);

// middleware to check if the user is authenticated
async function isAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      message: 'Token not found',
    });
  }
  try {
    const decoded = jwt.verify(token, secretPhrase);
    req.user = decoded.payload;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
}

// POST /login
// rota para fazer login
// requisitos 4 / 5
async function login(req, res) {
  const { email, password } = req.body;
  const response = await User.findOne({ where: { email } });
  if (!response) {
    return res.status(404).send({ error: 'User not found' });
  }
  if (response.password !== md5(password)) {
    return res.status(400).send({ error: 'Invalid password' });
  }
  const { dataValues: { password: pass, ...userWithoutPassword } } = response;
  const token = jwt.sign(
    { payload: userWithoutPassword },
    secretPhrase,
    jwtConfig,
  );
  return res.status(200).json({ token });
}

// POST /register/
// rota para fazer cadastro por pessoa comum
// requisitos 9 / 10
async function register(req, res) {
  const { name, email, password } = req.body;
  const response = await User.findOne({ where: { email } });
  if (response) {
    return res.status(409).send({ error: 'User already exists' });
  }
  const newUser = await User.create({
    name,
    email,
    password: md5(password),
    role: 'customer',
  });
  const { dataValues: { password: pass, ...newUserWithoutPassword } } = newUser;
  const token = jwt.sign(
    { payload: newUserWithoutPassword },
    secretPhrase,
    jwtConfig,
  );
  return res.status(201).json({ token });
}

// POST /register/admin
// rota para fazer cadastro de um novo usuário via administrador
// requisitos 38 / 39
async function registerAdmin(req, res) {
  const { name, email, password, role } = req.body;
  const { role: requestedRole } = req.user;
  console.log(requestedRole);
  if (requestedRole !== 'administrator') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const response = await User.findOne({ where: { email } });
  if (response) {
    return res.status(409).send({ error: 'User already exists' });
  }
  const newUser = await User.create({
    name,
    email,
    password: md5(password),
    role,
  });
  const { dataValues: { password: pass, ...newUserWithoutPassword } } = newUser;
  return res.status(201).json({ user: newUserWithoutPassword });
}

// GET /users
// rota para buscar todos os usuários conforme o role
// requisitos 17 a 21 / 36 a 41
async function getUsers(req, res) {
  const { role } = req.user;
  let users;

  switch (role) {
    case 'administrator':
      users = await User.findAll({ attributes: { exclude: ['password'] } });
      break;
    case 'customer':
      users = await User.findAll({
        where: { role: 'seller' },
        attributes: { exclude: ['password', 'email', 'role'] },
      });
      break;
    default:
      users = [];
      break;
  }
  return res.status(200).json({ users });
}

// DELETE /users/delete/:id
// rota para deletar um usuário pelo id via administrador
// requisitos 41(bonus)
async function deleteUser(req, res) {
  const { id } = req.params;
  const { role } = req.user;
  if (role !== 'administrator') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const response = await User.findOne({ where: { id } });
  if (!response) {
    return res.status(404).send({ error: 'User not found' });
  }
  response.destroy();
  return res.status(204).send();
}

// GET /products
// rota para listar todos os produtos
// requisitos 11 a 16
async function getProducts(req, res) {
  const { role } = req.user;
  if (role !== 'customer') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const products = await Product.findAll();
  return res.status(200).json({ products });
}

// GET /sales
// rota para listar todas as vendas por um 'customer' ou 'seller'
// requisitos 22 a 24 / 27 a 29
async function getSales(req, res) {
  const { id, role } = req.user;
 
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
  return res.status(200).json({ sales });
}

// POST /sales
// rota para criar uma nova venda
// requisitos 21
async function createSale(req, res) {
  const { id: userId, role } = req.user;
  if (role !== 'customer') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const { products, cart } = req.body;
  console.log('====>', products, cart, role, userId);
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber } = cart;
  const newSale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente', 
  });
  const { id: saleId } = newSale;
  console.log('SALE_ID ===>>', saleId);
  await products.map(async ({ id: productId, quantity }) => {
    const newSaleProduct = await SaleProduct.create({ saleId, productId, quantity });
    return newSaleProduct;
  });
  return res.status(201).json({ sale: newSale });
}

// PATCH /sales/:id
// rota para atualizar o status de uma venda identificada pelo id
// requisitos 32 a 35
async function updateSale(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const { role } = req.user;
  if (role !== 'customer' && role !== 'seller') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const sale = await Sale.findOne({ where: { id } });
  if (!sale) {
    return res.status(404).send({ error: 'Sale not found' });
  }
  await sale.update({ ...sale, status }, { where: { id } });
  return res.status(204).end();
}

module.exports = {
  isAuth,
  login,
  register,
  registerAdmin,
  getUsers,
  deleteUser,
  getProducts,
  getSales,
  createSale,
  updateSale,
};
