const { checkLogin, formatError } = require('../../utils/joiSchema');

module.exports = async (req, _res, next) => {
  const { email, password } = req.body;
  try {
    await checkLogin({ email, password });
    return next();
  } catch (error) {
    console.log(error);
    return next(formatError(error));
  }
};
