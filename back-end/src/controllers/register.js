const registerService = require('../services/register');
const { create } = require('../utils/jwt');

const registerCustomer = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = registerService(name, email, password);
  const {
    dataValues: { ...newUserWithoutPassword },
  } = newUser;
  delete newUserWithoutPassword.password;
  const token = create(newUserWithoutPassword);
  return res.status(201).json({ token });
};

const registerAdmin = (req, res) => {
  const { name, email, password, role } = req.body;
  const { role: requestedRole } = req.user;
  if (requestedRole !== 'administrator') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const newUser = registerService(name, email, password, role);
  const {
    dataValues: { ...newUserWithoutPassword },
  } = newUser;
  delete newUserWithoutPassword.password;
  return res.status(201).json({ user: newUserWithoutPassword });
};

module.exports = { registerCustomer, registerAdmin };
