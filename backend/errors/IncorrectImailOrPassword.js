const { ERROR_CODE_INCORRECT_MAIL_PASSWORD } = require('../constants');

module.exports = class IncorrectImailOrPassword extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_INCORRECT_MAIL_PASSWORD;
    this.errorMessage = message;
  }
};
