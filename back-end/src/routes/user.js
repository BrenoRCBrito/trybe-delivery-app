const { Router } = require('express');
const userController = require('../controllers/user');

const router = Router();

router.post('', userController.getAll);

module.exports = router;
