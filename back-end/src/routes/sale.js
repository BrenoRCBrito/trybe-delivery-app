const { Router } = require('express');
const saleController = require('../controllers/sale');
const auth = require('../middlewares/auth');
const validateSaleStatus = require('../middlewares/validations/validateSaleStatus');

const router = Router();

router.get('', auth, saleController.getSales);

router.get('/:id', auth, saleController.getSalesByid);

router.post('', auth, saleController.create);

router.patch('/:id', auth, validateSaleStatus, saleController.update);

module.exports = router;
