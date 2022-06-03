const { Router } = require('express');
const productController = require('../controllers/product');
const auth = require('../middlewares/auth');

const router = Router();

router.get('', auth, productController.getProducts);

module.exports = router;