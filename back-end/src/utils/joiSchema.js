const joi = require('joi');

const formatError = (error) => {
  const status = {
    'string.min': 422,
    'string.base': 422,
    'string.email': 422,
    'any.required': 400,
  };
  if (joi.isJoiError(error)) {
    return {
      error: error.message,
      status: status[error.details[0].type],
    };
  }
  return error;
};

const loginSchema = joi.object({
  email: joi.string().email().required().message({
    'any.required': 'Email is required',
    'string.email': 'Email is invalid',
    'string.base': 'Email must be a string',
  }),
  password: joi.string().min(6).required().message({
    'string.base': 'Password must be a string',
    'string.min': 'Password length must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
});

const registerSchema = loginSchema.keys({
  name: joi.string().min(12).required().message({
    'string.base': 'Name must be a string',
    'string.min': 'Name length must be at least 12 characters long',
    'any.required': 'Name is required',
  }),
});

const registerAdminSchema = registerSchema.keys({
  role: joi.string().valid('customer', 'administrator', 'seller').required(),
});

const checkLogin = async (body) =>
  loginSchema.validateAsync(body, { convert: true });

const checkRegister = async (body) =>
  registerSchema.validateAsync(body, { convert: true });

const checkRegisterAdmin = async (body) =>
  registerAdminSchema.validateAsync(body, { convert: true });

module.exports = { checkLogin, formatError, checkRegister, checkRegisterAdmin };
