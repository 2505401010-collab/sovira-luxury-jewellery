const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Helper to get or create wishlist
const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }
  return wishlist;
};

// @desc    Get current patron's saved folio / wishlist
// @route   GET /api/v1/wishlist
// @access  Private (Patron)
exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await getOrCreateWishlist(req.user.id);
    res.status(200).json({
      success: true,
      count: wishlist.products.length,
      wishlist
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add masterpiece to saved folio
// @route   POST /api/v1/wishlist/:productId
// @access  Private (Patron)
exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Masterpiece not found'
      });
    }

    const wishlist = await getOrCreateWishlist(req.user.id);

    const isAlreadySaved = wishlist.products.some(
      (p) => p._id.toString() === productId || p.toString() === productId
    );

    if (!isAlreadySaved) {
      wishlist.products.push(product._id);
      await wishlist.save();
    }

    await wishlist.populate('products');

    res.status(200).json({
      success: true,
      message: 'Masterpiece added to your Private Wishlist Folio',
      wishlist
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove masterpiece from saved folio
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private (Patron)
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const wishlist = await getOrCreateWishlist(req.user.id);

    wishlist.products = wishlist.products.filter(
      (p) => p._id.toString() !== productId && p.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate('products');

    res.status(200).json({
      success: true,
      message: 'Piece removed from private folio',
      wishlist
    });
  } catch (err) {
    next(err);
  }
};
