const { ERROR_CODE_DEFAYLT } = require('../constants');

module.exports = class ErrorDefault extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DEFAYLT;
    this.errorMessage = message;
  }
};
