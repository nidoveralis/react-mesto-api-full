// const cryptoKey = fe3c25b362fd7207369c980e8a8ffc3f500cbde993eee96d06f74dce53c25a63

const ERROR_CODE_INCORRECT_DATA = 400;
const ERROR_CODE_INCORRECT_MAIL_PASSWORD = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_EMAIL_USED = 409;
const ERROR_CODE_DEFAYLT = 500;

const linkValid = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

module.exports = {
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAYLT,
  ERROR_CODE_EMAIL_USED,
  ERROR_CODE_INCORRECT_MAIL_PASSWORD,
  ERROR_CODE_FORBIDDEN,
  linkValid,
};
