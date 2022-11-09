const { celebrate, Joi } = require('celebrate');
const { linkValid } = require('../constants');

const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkValid),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validationEditAvatar = celebrate({
  body: Joi.object().keys({ avatar: Joi.string().pattern(linkValid) }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkValid),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().length(24).hex() }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({ userId: Joi.string().required().length(24).hex() }),
});

module.exports = {
  validationSignup,
  validationSignin,
  validationEditUser,
  validationEditAvatar,
  validationCreateCard,
  validationCardId,
  validationUserId,
};
