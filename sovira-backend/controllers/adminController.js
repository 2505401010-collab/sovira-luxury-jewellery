const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get master admin dashboard statistics
// @route   GET /api/v1/admin/stats
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalOrders,
      totalPatrons,
      totalProducts,
      orders,
      recentOrders,
      lowStockProducts
    ] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Product.countDocuments({ isActive: true }),
      Order.find({ 'paymentDetails.status': { $in: ['AUTHORIZED', 'ESCROW_SEALED'] } }),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'fullName email'),
      Product.find({ inventoryCount: { $lte: 2 } }).select('title sku inventoryCount valuationINR')
    ]);

    const totalRevenueINR = orders.reduce(
      (acc, ord) => acc + (ord.financialSummary?.totalValuationINR || 0),
      0
    );

    res.status(200).json({
      success: true,
      stats: {
        totalRevenueINR,
        totalOrders,
        totalPatrons,
        totalProducts,
        activeVaultEscrows: orders.length,
        lowStockAlerts: lowStockProducts.length
      },
      recentOrders,
      lowStockProducts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders across the maison
// @route   GET /api/v1/admin/orders
// @access  Private (Admin only)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'fullName email phone memberId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order fulfillment status or diplomatic escort
// @route   PUT /api/v1/admin/orders/:id/status
// @access  Private (Admin only)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { fulfillmentStatus, paymentStatus, courierTrackingNumber } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (fulfillmentStatus) order.fulfillmentStatus = fulfillmentStatus;
    if (paymentStatus) order.paymentDetails.status = paymentStatus;
    if (courierTrackingNumber) {
      order.diplomaticCourierTracking.trackingNumber = courierTrackingNumber;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Diplomatic order dispatch status updated',
      order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all registered patrons
// @route   GET /api/v1/admin/customers
// @access  Private (Admin only)
exports.getAllCustomers = async (req, res, next) => {
  try {
    const patrons = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: patrons.length,
      patrons
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product inventory count
// @route   PUT /api/v1/admin/products/:id/inventory
// @access  Private (Admin only)
exports.updateInventory = async (req, res, next) => {
  try {
    const { count } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { inventoryCount: Number(count) },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Piece not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vault inventory adjusted',
      product
    });
  } catch (err) {
    next(err);
  }
};
