const Validator = require('validator');
const isEmpty   = require('./isEmpty');

module.exports = function(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.surname = !isEmpty(data.surname) ? data.surname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.conf_password = !isEmpty(data.conf_password) ? data.conf_password : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isLength(data.surname, { min: 2, max: 30 })) {
    errors.surname = 'Surname must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = 'Surname field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email format is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.conf_password)) {
    errors.conf_password = 'Confirm password is required';
  }

  if (!Validator.equals(data.password, data.conf_password)) {
    errors.conf_password = 'Password must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};