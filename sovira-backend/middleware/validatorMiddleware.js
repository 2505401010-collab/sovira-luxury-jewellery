const { validationResult, body } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      success: false,
      message: 'Validation failed for submitted sovereign dossier',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg
      }))
    });
  };
};

const registerValidation = [
  body('fullName').trim().notEmpty().withMessage('Patron full name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid curatorial email address is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Confidential passkey must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email address is required'),
  body('password').notEmpty().withMessage('Passkey is required')
];

const productValidation = [
  body('title').trim().notEmpty().withMessage('Product title is required'),
  body('sku').trim().notEmpty().withMessage('SKU code is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('valuationINR')
    .isFloat({ min: 1 })
    .withMessage('Valuation in INR must be a positive number')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  productValidation
};
