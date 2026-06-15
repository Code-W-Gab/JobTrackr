import { body } from "express-validator";

export const registerRules = [
  body('fullName')
    .notEmpty().withMessage('Name must not empty')
    .isString().withMessage('Name must be string'),

  body('email')
    .isEmail().withMessage('Please enter a valid email address'),

  body('password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    }).withMessage('Password must be at least 6 characters and include letters and numbers.'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm password must match password');
      }
      return true;
    })
]

export const loginRules = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address'),

  body('password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    }).withMessage('Password must be at least 6 characters and include letters and numbers.')
]