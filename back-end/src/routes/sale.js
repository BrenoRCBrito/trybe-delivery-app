const { Router } = require('express');
const saleController = require('../controllers/sale');
const auth = require('../middlewares/auth');

const router = Router();

router.post('', saleController.create);

router.patch('/:id', auth, saleController.update);

module.exports = router;
