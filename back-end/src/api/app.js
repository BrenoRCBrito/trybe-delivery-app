require('express-async-errors');
const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/login');
const registerRouter = require('../routes/register');
const productRouter = require('../routes/product');
const userRouter = require('../routes/user');
<<<<<<< HEAD
const saleRouter = require('../routes/sale');
=======
// *new route*
const saleRouter = require('../routes/sale');
//
>>>>>>> eb2af964a3061cebd15c9bab731e15b542b59fa0
const notFound = require('../middlewares/notFound');
const error = require('../middlewares/error');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/user', userRouter);

app.use('/product', productRouter);

app.use('/sale', saleRouter);

app.use('/images', express.static('./public/images'));

// *new route*
app.use('/orders', saleRouter);
//

app.use('*', notFound);

app.use(error);

module.exports = app;
