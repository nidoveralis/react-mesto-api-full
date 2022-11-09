const { ERROR_CODE_INCORRECT_DATA } = require('../constants');

module.exports = class IncorrectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_INCORRECT_DATA;
    this.errorMessage = message;
  }
};
