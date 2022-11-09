const { ERROR_CODE_FORBIDDEN } = require('../constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_FORBIDDEN;
    this.errorMessage = message;
  }
};
