const jwt = require('jsonwebtoken');
const { JWT_SECRET  = 'dev-key', NODE_ENV = 'production' } = process.env;
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(NODE_ENV)
  console.log(NODE_ENV === 'production')
  console.log(JWT_SECRET)
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
