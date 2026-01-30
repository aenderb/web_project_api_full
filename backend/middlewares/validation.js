const { Joi } = require("celebrate");
const validator = require("validator");
const mongoose = require("mongoose");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateObjectId = (value, helpers) => {
  if (mongoose.Types.ObjectId.isValid(value)) {
    return value;
  }
  return helpers.error("string.pattern.base");
};

const validateLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const validateCreateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const validateUpdateProfile = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const validateUpdateAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
};

const validateUserId = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
};

const validateCreateCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
};

const validateCardId = {
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateObjectId),
  }),
};

module.exports = {
  validateLogin,
  validateCreateUser,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
  validateCreateCard,
  validateCardId,
};
