const registerService = require('../services/register');
const { create } = require('../utils/jwt');

const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await registerService(name, email, password);
  const {
    dataValues: { ...newUserWithoutPassword },
  } = newUser;
  delete newUserWithoutPassword.password;
  const token = await create(newUserWithoutPassword);
  return res.status(201).json({ token, ...newUserWithoutPassword });
};

const registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { role: requestedRole } = req.user;
  if (requestedRole !== 'administrator') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const newUser = await registerService(name, email, password, role);
  const {
    dataValues: { ...newUserWithoutPassword },
  } = newUser;
  delete newUserWithoutPassword.password;
  return res.status(201).json({ user: newUserWithoutPassword });
};

module.exports = { registerCustomer, registerAdmin };
