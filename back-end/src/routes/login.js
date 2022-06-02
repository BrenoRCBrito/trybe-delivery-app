const { Router } = require('express');
const login = require('../controllers/login');
const validateLogin = require('../middlewares/validations/validateLogin');

const router = Router();

router.post('', validateLogin, login);

module.exports = router;
