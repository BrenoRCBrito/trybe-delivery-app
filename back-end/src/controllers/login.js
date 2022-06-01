const loginService = require('../services/logins');
const { create } = require('../utils/jwt');

async function login(req, res) {
  const { email, password } = req.body;
  const response = await loginService(email, password);
  const {
    dataValues: { ...userWithoutPassword },
  } = response;
  delete userWithoutPassword.password;
  const token = create(userWithoutPassword);
  return res.status(200).json({ token });
}

module.exports = login;
