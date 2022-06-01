const express = require('express');
const cors = require('cors');
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

const { Router, json } = express;

const port = process.env.PORT || 3301;
const app = require('./app');

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

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.listen(port, async () => {
  console.log('listening on port ', port);
});
