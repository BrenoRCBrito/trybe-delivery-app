require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');

const notFound = require('../middlewares/notFound');
const error = require('../middlewares/error');
const useMorgan = require('../middlewares/useMorgan');

const {
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
} = require('./skeleton');

config();

const app = express();

const { Router, json } = express;

const port = process.env.PORT || 3301;

const salesRouter = Router();
const productsRouter = Router();
const usersRouter = Router();
const loginRouter = Router();
const registerRouter = Router();

loginRouter
  .post('/', login);
  
registerRouter
  .post('/', register)
  .post('/admin', isAuth, registerAdmin);

usersRouter
  .use(isAuth)
  .get('/', getUsers)
  .delete('/delete/:id', deleteUser);

productsRouter  
  .get('/', isAuth, getProducts);

salesRouter
  .use(isAuth)
  .get('/', getSales)
  .post('/', createSale)
  .patch('/:id', updateSale);
  
app.use(json(), cors());

app.use(useMorgan);

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/user', usersRouter);

app.use('/product', productsRouter);

app.use('/sale', salesRouter);

app.use('/images', express.static('./public/images'));

app.use('*', notFound);

app.use(error);

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.listen(port, async () => {
  console.log('listening on port ', port);
});
