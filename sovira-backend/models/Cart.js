const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Quantity cannot be less than 1']
  },
  priceSnapshotINR: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [cartItemSchema],
    subtotalINR: {
      type: Number,
      default: 0
    },
    taxRatePercent: {
      type: Number,
      default: () => (process.env.TAX_RATE_PERCENT ? Number(process.env.TAX_RATE_PERCENT) : 3)
    },
    taxGSTINR: {
      type: Number,
      default: 0
    },
    totalValuationINR: {
      type: Number,
      default: 0
    },
    reservationExpiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 15 * 60 * 1000) // 15-minute Vault Reservation
    }
  },
  { timestamps: true }
);

// Method to recalculate financial totals
cartSchema.methods.recalculateTotals = function () {
  this.subtotalINR = this.items.reduce((acc, item) => {
    return acc + item.priceSnapshotINR * item.quantity;
  }, 0);

  const envTax = process.env.TAX_RATE_PERCENT ? Number(process.env.TAX_RATE_PERCENT) : 3;
  const effectiveTaxRate = (this.taxRatePercent !== undefined && this.taxRatePercent !== null) ? this.taxRatePercent : envTax;
  this.taxRatePercent = effectiveTaxRate;
  const taxRate = effectiveTaxRate / 100;
  this.taxGSTINR = Math.round(this.subtotalINR * taxRate);
  this.totalValuationINR = this.subtotalINR + this.taxGSTINR;
  // Renew 15-minute reservation timer upon cart change
  this.reservationExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
};

module.exports = mongoose.model('Cart', cartSchema);
