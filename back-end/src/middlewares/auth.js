const { decode } = require('../utils/jwt');

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      message: 'Token not found',
    });
  }
  try {
    const decoded = decode(token);
    req.user = decoded;    

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

module.exports = auth;
