const User = require('../models/User');
const crypto = require('crypto');

// @desc    Register a new sovereign patron
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, deliveryAddress, title } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A sovereign patron account already exists with this email address'
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      title: title || 'Sovereign Patron',
      deliveryAddress: deliveryAddress || {}
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: 'Patron sanctuary created and inscribed in royal registers',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        memberId: user.memberId,
        tier: user.tier,
        role: user.role,
        dedicatedCurator: user.dedicatedCurator,
        deliveryAddress: user.deliveryAddress
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Authenticate patron & return token
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Patron record not found.'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid passkey. Discretionary access denied.'
      });
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: 'Patron authenticated into sovereign vault session',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        memberId: user.memberId,
        tier: user.tier,
        role: user.role,
        dedicatedCurator: user.dedicatedCurator,
        deliveryAddress: user.deliveryAddress
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current authenticated patron profile
// @route   GET /api/v1/auth/me
// @access  Private (Patron only)
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update patron profile details
// @route   PUT /api/v1/auth/profile
// @access  Private (Patron only)
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      deliveryAddress: req.body.deliveryAddress
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Patron portfolio updated',
      user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Request confidential passkey reset token
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Do not disclose if user exists for privacy
      return res.status(200).json({
        success: true,
        message: 'If the patron email is enrolled, an encrypted reset passkey has been generated.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'Encrypted passkey reset token generated',
      // In development, return the token for testing convenience
      ...(process.env.NODE_ENV === 'development' && { devResetToken: resetToken })
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Reset passkey using token
// @route   POST /api/v1/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Passkey reset token is invalid or has expired.'
      });
    }

    user.password = req.body.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: 'Confidential passkey has been renewed successfully',
      token
    });
  } catch (err) {
    next(err);
  }
};
