const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = process.env;
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
    return;
  }
  req.user = payload;
  next();
};
