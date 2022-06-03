const { Router } = require('express');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = Router();

router.get('', auth, userController.getAll);

router.delete('/delete/:id', auth, userController.destroy);

module.exports = router;
