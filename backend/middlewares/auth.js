const jwt = require('jsonwebtoken');
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
  }
  req.user = payload;
  next();
};
