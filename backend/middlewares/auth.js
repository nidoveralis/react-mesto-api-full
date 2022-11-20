const jwt = require('jsonwebtoken');
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
    return;
  }
  req.user = payload;
  next();
};
//    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
