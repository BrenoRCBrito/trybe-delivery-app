const joi = require('joi');

const formatError = (error) => {
  const status = {
    'string.min': 422,
    'string.base': 422,
    'string.email': 422,
    'any.required': 400,
    'any.only': 422,
  };
  if (joi.isError(error)) {
    return {
      error: error.message,
      status: status[error.details[0].type],
    };
  }
  return error;
};

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const registerSchema = loginSchema.keys({
  name: joi.string().min(12).required(),
});

const registerAdminSchema = registerSchema.keys({
  role: joi.string().valid('customer', 'administrator', 'seller').required(),
});

const updateSaleSchema = joi.object({
  status: joi
    .string()
    .valid('Preparando', 'Em Trânsito', 'Pendente', 'Entregue')
    .required(),
});

const checkLogin = async (body) =>
  loginSchema.validateAsync(body, { convert: true });

const checkRegister = async (body) =>
  registerSchema.validateAsync(body, { convert: true });

const checkRegisterAdmin = async (body) =>
  registerAdminSchema.validateAsync(body, { convert: true });

const checkUpdateSale = async (body) =>
  updateSaleSchema.validateAsync(body, { convert: true });

module.exports = {
  checkLogin,
  formatError,
  checkRegister,
  checkRegisterAdmin,
  checkUpdateSale,
};
