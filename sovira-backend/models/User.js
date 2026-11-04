const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide patron name'],
      trim: true
    },
    title: {
      type: String,
      default: 'Sovereign Patron'
    },
    email: {
      type: String,
      required: [true, 'Please provide a valid email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid curatorial email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password / passkey'],
      minlength: [6, 'Passkey must be at least 6 characters'],
      select: false // Do not return by default in queries
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    memberId: {
      type: String,
      unique: true,
      uppercase: true,
      default: () => `SVR-${Math.floor(1000 + Math.random() * 9000)}`
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'curator'],
      default: 'customer'
    },
    tier: {
      type: String,
      enum: ['Sovereign Patron', 'Imperial Patron', 'Heritage Member'],
      default: 'Sovereign Patron'
    },
    dedicatedCurator: {
      name: { type: String, default: 'Aditi Somani' },
      division: { type: String, default: 'Haute Joaillerie & High Vault Commissions' }
    },
    assignedSalon: {
      type: String,
      default: 'The Oberoi Salon Suite, Mumbai'
    },
    deliveryAddress: {
      estate: { type: String, default: '' },
      line1: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      pincode: { type: String, default: '' },
      country: { type: String, default: 'India' }
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate Signed JWT Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
      memberId: this.memberId
    },
    process.env.JWT_SECRET || 'sovira_secret_key_jaipur',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

module.exports = mongoose.model('User', userSchema);
