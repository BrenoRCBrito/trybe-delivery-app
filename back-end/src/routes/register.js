const { Router } = require('express');
const { registerAdmin, registerCustomer } = require('../controllers/register');
const auth = require('../middlewares/auth');
const validateRegister = require('../middlewares/validations/validateRegister');
const validateRegisterAdmin = require('../middlewares/validations/validateRegisterAdmin');

const router = Router();

router.post('', validateRegister, registerCustomer);

router.post('/admin', auth, validateRegisterAdmin, registerAdmin);

module.exports = router;
