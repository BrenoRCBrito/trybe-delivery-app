const { Router } = require('express');
const saleController = require('../controllers/sale');
const auth = require('../middlewares/auth');

const router = Router();

router.patch('/:id', auth, saleController.update);

module.exports = router;
