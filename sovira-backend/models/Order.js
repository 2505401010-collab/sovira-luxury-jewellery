const mongoose = require('mongoose');

const orderItemSnapshotSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: { type: String, required: true },
  sku: { type: String, required: true },
  priceSnapshotINR: { type: Number, required: true },
  quantity: { type: Number, default: 1, min: 1 },
  imageSnapshot: { type: String, default: '' },
  metalPurity: { type: String, default: '22K Royal Gold' }
});

const orderSchema = new mongoose.Schema(
  {
    orderReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [orderItemSnapshotSchema],
    patronDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    shippingAddress: {
      estate: { type: String, default: '' },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: 'India' }
    },
    deliveryProtocol: {
      type: String,
      enum: ['armored', 'salon'],
      default: 'armored'
    },
    transitMethodLabel: {
      type: String,
      default: 'Armored Diplomatic Courier to Private Residence'
    },
    financialSummary: {
      subtotalINR: { type: Number, required: true },
      insuredWhiteGloveShippingINR: { type: Number, default: 0 },
      taxRatePercent: { type: Number, default: 3 },
      taxGSTINR: { type: Number, required: true },
      totalValuationINR: { type: Number, required: true }
    },
    paymentDetails: {
      method: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wire'],
        default: 'card'
      },
      methodLabel: {
        type: String,
        default: 'Sovereign Amex Centurion'
      },
      provider: {
        type: String,
        default: 'Razorpay Sovereign Escrow'
      },
      transactionId: {
        type: String,
        default: () => `TXN-SVR-${Date.now()}`
      },
      status: {
        type: String,
        enum: ['PENDING', 'AUTHORIZED', 'ESCROW_SEALED', 'FAILED', 'REFUNDED'],
        default: 'AUTHORIZED'
      }
    },
    fulfillmentStatus: {
      type: String,
      enum: ['Placed', 'Confirmed', 'Processing', 'In Armored Transit', 'Delivered'],
      default: 'Placed'
    },
    diplomaticCourierTracking: {
      carrier: { type: String, default: 'SOVIRA Diplomatic Security Services' },
      trackingNumber: {
        type: String,
        default: () => `SOV-DIP-${Math.floor(100000 + Math.random() * 900000)}`
      },
      escortDetail: { type: String, default: 'Biometric twin-custody vehicle convoy' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
