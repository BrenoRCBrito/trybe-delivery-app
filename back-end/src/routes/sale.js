const { Router } = require('express');
const saleController = require('../controllers/sale');
const auth = require('../middlewares/auth');

const router = Router();

router.patch('/:id', auth, saleController.update);

router.get('', auth, saleController.getSales);

module.exports = router;
