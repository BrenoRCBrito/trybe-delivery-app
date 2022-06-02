const { checkRegister, formatError } = require('../../utils/joiSchema');

module.exports = async (req, _res, next) => {
  const { name, email, password } = req.body;
  try {
    await checkRegister({ name, email, password });
    return next();
  } catch (error) {
    console.log(error);
    return next(formatError(error));
  }
};
