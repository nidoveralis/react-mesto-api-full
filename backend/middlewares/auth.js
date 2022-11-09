const jwt = require('jsonwebtoken');
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
  }
  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new IncorrectImailOrPassword('Необходима авторизация.'));
  }
  req.user = payload;
  next();
};
