import { body } from "express-validator";

// Auth
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

export const updateMeRules = [
  body('currentPassword')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    }).withMessage('Current password must be at least 6 characters and include letters and numbers.'),
  body('newPassword')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    }).withMessage('New password must be at least 6 characters and include letters and numbers.'),
  body('confirmNewPassword')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    }).withMessage('Confirm new password must be at least 6 characters and include letters and numbers.'),

]

export const updatePassRules = [
  body('fullName')
    .notEmpty().withMessage('Name must not empty')
    .isString().withMessage('Name must be string'),
]

// Application
export const createApplicationRules = [
  body('companyName')
    .notEmpty().withMessage('Company name must not empty')
    .isString().withMessage('Company name must be string'),
  body('jobTitle')
    .notEmpty().withMessage('Job title must not empty')
    .isString().withMessage('Job title must be string'),
  body('jobURL')
    .notEmpty().withMessage('Job URL must not empty')
    .isURL().withMessage('Job URL must be a valid URL'),
  body('location')
    .notEmpty().withMessage('Location must not empty')
    .isString().withMessage('Location must be string'),
  body('dateApplied')
    .notEmpty().withMessage('Date applied must not empty')
    .isISO8601().withMessage('Date applied must be a valid date'),
  body('salary')
    .notEmpty().withMessage('Salary must not empty')
    .isString().withMessage('Salary must be string'),
  body('platform')
    .notEmpty().withMessage('Platform must not empty')
    .isIn(["LinkedIn", "Indeed", "JobStreet", "Glassdoor", "Company Website", "Referral", "Other"]).withMessage('Platform must be one of the following: LinkedIn, Indeed, JobStreet, Glassdoor, Company Website, Referral, Other'),
  body('jobType')
    .notEmpty().withMessage('Job type must not empty')
    .isIn(["Full-Time", "Part-Time", "Contract", "Internship"]).withMessage('Job type must be one of the following: Full-Time, Part-Time, Contract, Internship'),
  body('locationType')
    .notEmpty().withMessage('Location type must not empty')
    .isIn(["Remote", "Hybrid", "On-Site"]).withMessage('Location type must be one of the following: Remote, Hybrid, On-Site'),
  body('status')
    .notEmpty().withMessage('Status must not empty')
    .isIn(["Wishlist", "Applied", "Assessment", "Interview", "Final Interview", "Offer", "Rejected", "Accepted"]).withMessage('Status must be one of the following: Wishlist, Applied, Assessment, Interview, Final Interview, Offer, Rejected, Accepted'),
  body('notes')
    .notEmpty().withMessage('Notes must not empty')
    .isString().withMessage('Notes must be string'),
]

export const updateApplicationRules = [
  body('companyName')
    .notEmpty().withMessage('Company name must not empty')
    .isString().withMessage('Company name must be string'),
  body('jobTitle')
    .notEmpty().withMessage('Job title must not empty')
    .isString().withMessage('Job title must be string'),
  body('jobURL')
    .notEmpty().withMessage('Job URL must not empty')
    .isURL().withMessage('Job URL must be a valid URL'),
  body('location')
    .notEmpty().withMessage('Location must not empty')
    .isString().withMessage('Location must be string'),
  body('dateApplied')
    .notEmpty().withMessage('Date applied must not empty')
    .isISO8601().withMessage('Date applied must be a valid date'),
  body('salary')
    .notEmpty().withMessage('Salary must not empty')
    .isString().withMessage('Salary must be string'),
  body('platform')
    .notEmpty().withMessage('Platform must not empty')
    .isIn(["LinkedIn", "Indeed", "JobStreet", "Glassdoor", "Company Website", "Referral", "Other"]).withMessage('Platform must be one of the following: LinkedIn, Indeed, JobStreet, Glassdoor, Company Website, Referral, Other'),
  body('jobType')
    .notEmpty().withMessage('Job type must not empty')
    .isIn(["Full-Time", "Part-Time", "Contract", "Internship"]).withMessage('Job type must be one of the following: Full-Time, Part-Time, Contract, Internship'),
  body('locationType')
    .notEmpty().withMessage('Location type must not empty')
    .isIn(["Remote", "Hybrid", "On-Site"]).withMessage('Location type must be one of the following: Remote, Hybrid, On-Site'),
  body('status')
    .notEmpty().withMessage('Status must not empty')
    .isIn(["Wishlist", "Applied", "Assessment", "Interview", "Final Interview", "Offer", "Rejected", "Accepted"]).withMessage('Status must be one of the following: Wishlist, Applied, Assessment, Interview, Final Interview, Offer, Rejected, Accepted'),
  body('notes')
    .notEmpty().withMessage('Notes must not empty')
    .isString().withMessage('Notes must be string'),
]