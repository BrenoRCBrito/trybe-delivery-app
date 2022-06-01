const { Router } = require('express');
const { registerAdmin, registerCustomer } = require('../controllers/register');
const auth = require('../middlewares/auth');

const router = Router();

router.post('', registerCustomer);

router.post('/admin', auth, registerAdmin);

module.exports = router;
