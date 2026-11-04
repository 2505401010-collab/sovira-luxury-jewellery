const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes for authenticated patrons
const protect = async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please authenticate with a valid sovereign patron passkey.'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'sovira_secret_key_jaipur'
    );
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Patron session invalid or patron record no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Patron authorization token has expired or is invalid.'
    });
  }
};

// Restrict routes to administrative curators only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Restricted. This royal archival action requires Master Curator authorization.'
  });
};

module.exports = { protect, adminOnly };
