const router = require('express').Router();
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');
const users = require('./users');
const cards = require('./cards');
const { validationSignup, validationSignin } = require('../validation/validation');
const { createUser, login } = require('../controllers/users');
const NotFound = require('../errors/NotFound');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validationSignin, login);
router.post('/signup', validationSignup, createUser);

router.use(cookieParser());
router.use('/users', auth, users);
router.use('/cards', auth, cards);

router.use('*', auth, (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
