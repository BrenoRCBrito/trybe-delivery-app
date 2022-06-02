const { checkRegisterAdmin, formatError } = require('../../utils/joiSchema');

module.exports = async (req, _res, next) => {
  const { name, email, password, role } = req.body;
  try {
    await checkRegisterAdmin({ name, email, password, role });
    return next();
  } catch (error) {
    console.log(error);
    return next(formatError(error));
  }
};
