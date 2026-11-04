const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper to get or create cart for user
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

// @desc    Get current patron's acquisition bag / cart
// @route   GET /api/v1/cart
// @access  Private (Patron)
exports.getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    res.status(200).json({
      success: true,
      cart
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add masterpiece to patron's acquisition bag
// @route   POST /api/v1/cart/items
// @access  Private (Patron)
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Masterpiece unavailable or no longer in active treasury'
      });
    }

    const cart = await getOrCreateCart(req.user.id);

    const existingIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId || item.product.toString() === productId
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
      cart.items[existingIndex].priceSnapshotINR = product.valuationINR;
    } else {
      cart.items.push({
        product: product._id,
        quantity: Number(quantity),
        priceSnapshotINR: product.valuationINR
      });
    }

    cart.recalculateTotals();
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Masterpiece reserved into Sovereign Acquisition Bag',
      cart
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/v1/cart/items/:productId
// @access  Private (Patron)
exports.updateQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await getOrCreateCart(req.user.id);

    const item = cart.items.find(
      (i) => i.product._id.toString() === productId || i.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Piece not found in acquisition bag'
      });
    }

    item.quantity = Number(quantity);
    cart.recalculateTotals();
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Acquisition quantity updated',
      cart
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove piece from cart
// @route   DELETE /api/v1/cart/items/:productId
// @access  Private (Patron)
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await getOrCreateCart(req.user.id);

    cart.items = cart.items.filter(
      (i) => i.product._id.toString() !== productId && i.product.toString() !== productId
    );

    cart.recalculateTotals();
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Lot released from vault reservation',
      cart
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Clear all pieces in cart
// @route   DELETE /api/v1/cart
// @access  Private (Patron)
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    cart.items = [];
    cart.recalculateTotals();
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Acquisition bag cleared',
      cart
    });
  } catch (err) {
    next(err);
  }
};
