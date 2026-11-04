const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  requestPasswordReset,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
  validate,
  registerValidation,
  loginValidation
} = require('../middleware/validatorMiddleware');

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
