const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const IncorrectData = require('../errors/IncorrectData');
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');
const UsedEmail = require('../errors/UsedEmail');
const NotFound = require('../errors/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.send({
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new UsedEmail('Пользователь с таким email уже зарегистрирован.'));
        }
        if (err.name === 'ValidationError') {
          next(new IncorrectData('Переданы некорректные данные.'));
        } else {
          next(err);
        }
      }));
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFound('Пользователь не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        next(new NotFound('Пользователь не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.editUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

module.exports.editAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true });
      res.status(200).send({ token });
    })
    .catch(() => {
      next(new IncorrectImailOrPassword('Неправильный логин или пароль'));
    });
};
