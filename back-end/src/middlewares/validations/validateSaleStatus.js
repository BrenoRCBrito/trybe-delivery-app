const { checkUpdateSale, formatError } = require('../../utils/joiSchema');

module.exports = async (req, _res, next) => {
  const { status } = req.body;
  try {
    await checkUpdateSale({ status });
    return next();
  } catch (error) {
    console.log(error);
    return next(formatError(error));
  }
};
