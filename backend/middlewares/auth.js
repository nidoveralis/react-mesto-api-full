//require('dotenv').config();
const jwt = require('jsonwebtoken');
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // const authorization = req.cookies.jwt;
  console.log('jhhjjn');
  const token = req.cookies.jwt;
  console.log(req);
  if (!token) {
    //next(new IncorrectImailOrPassword('Необходима авторизация.'));
    next(new IncorrectImailOrPassword('Нет токена'));
  }
  // const token = authorization;
  let payload;

  try {
    // payload = jwt.verify(token,  'some-secret-key');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    //next(new IncorrectImailOrPassword('Необходима авторизация.'));
    next(new IncorrectImailOrPassword('2 ауф'));
  }
  req.user = payload;
  next();
};
