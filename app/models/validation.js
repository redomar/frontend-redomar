const joi = require('@hapi/joi')

// Registration Validation
const registerValidation = body => {
  const schema = joi.object({
    name: joi
      .string()
      .min(3)
      .max(30)
      .required(),
    email: joi
      .string()
      .min(6)
      .max(30)
      .required()
      .email(),
    password: joi
      .string()
      .min(6)
      .max(1024)
      .required()
  })
  return schema.validate(body)
}

// Login Validation
const loginValidation = body => {
  const schema = joi.object({
    email: joi
      .string()
      .min(6)
      .max(30)
      .required()
      .email(),
    password: joi
      .string()
      .min(6)
      .max(1024)
      .required()
  })
  return schema.validate(body)
}

// Posts Validation
const newPostValidation = body => {
  const schema = joi.object({
    title: joi
      .string()
      .min(5)
      .max(128)
      .required(),
    username: joi
      .string()
      .min(3)
      .max(30)
      .required(),
    content: joi
      .string()
      .min(20)
      .max(4096)
      .required()
  })
  return schema.validate(body)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.newPostValidation = newPostValidation
