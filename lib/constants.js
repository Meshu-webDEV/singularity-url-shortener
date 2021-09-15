const { META } = require('./configs');

const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
  INTERNAL: 500,
  UNAUTHORIZED: 401,
  MALFORMED_INFO: 400,
  NOT_FOUND: 404,
};

const errorMessages = {
  ValidationError: `Validating the request info has failed. Please check your request and try again - or contact us at 📨${META.CONTACT_EMAIL}.`,
  UniqueViolationError: `Apologies, resource already exists. Please check your request and try again - or contact us at 📨${META.CONTACT_EMAIL}.`,
  INTERNAL: `Apologies, an internal error occurred, Please try again later or contact us at 📨${META.CONTACT_EMAIL}.`,
  MALFORMED_INFO: `Apologies, cannot process your request. The provided info is either partially missing or malformed. Please check your request and try again - or contact us at 📨${META.CONTACT_EMAIL}.`,
  UNAUTHORIZED: `Apologies, cannot process your request. Unauthorized. Please check your request and try again - or contact us at 📨${META.CONTACT_EMAIL}.`,
  NOT_FOUND: `Apologies, the resource was not found. Please check your request and try again - or contact us at 📨${META.CONTACT_EMAIL}.`,
};

module.exports = {
  errorMessages,
  errorTypes,
};
