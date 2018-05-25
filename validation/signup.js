const Validator = require('validator');

module.exports = function(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Nmae must be between 2 and 30 characters';
  }

  return {
    errors,
    isValid: errors
  };
};
