const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');
const IncorrectImailOrPassword = require('../errors/IncorrectImailOrPassword');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: false,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: false,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => isURL(v, { required_protocol: true }),
        message: 'Некорректная ссылка',
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Некорректный email',
      },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
  },
  { versionKey: false },
);
userSchema.statics.findUserByCredentials = function userFind({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new IncorrectImailOrPassword('Неправильные почта или пароль.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new IncorrectImailOrPassword('Неправильные пароль.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
