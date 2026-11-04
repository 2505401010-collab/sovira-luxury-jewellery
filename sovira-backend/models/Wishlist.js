const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    assignedPrivateLiaison: {
      name: { type: String, default: 'Devika Rathore' },
      salon: { type: String, default: 'Mumbai Salon Suite — The Oberoi' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);
