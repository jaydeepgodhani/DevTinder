const validator = require('validator');

const validateSignupData = (req) => {
  const {firstName, lastName, emailId, password} = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid !");
  }
  if(!validator.isEmail(emailId)) {
    throw new Error('Email Id not valid');
  }
  if(!validator.isStrongPassword(password)) {
    throw new Error('password is not strong !');
  }
}

const validateEditProfileDate = (req) => {
  const allowedFields = ['firstName', 'lastName', 'emailId', 'photoUrl', 'gender', 'age', 'about', 'skills'];
  const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));
  return isEditAllowed;
}

module.exports = {validateSignupData, validateEditProfileDate};