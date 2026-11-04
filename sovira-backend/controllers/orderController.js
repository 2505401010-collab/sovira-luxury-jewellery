const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// @desc    Create a new sovereign acquisition order
// @route   POST /api/v1/orders
// @access  Private (Patron)
exports.createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      deliveryProtocol = 'armored',
      paymentMethod = 'card'
    } = req.body;

    let orderItems = [];
    let subtotalINR = 0;

    // If explicit items provided, verify prices from Product DB directly (Never trust client prices)
    if (items && items.length > 0) {
      for (const item of items) {
        const product = await Product.findById(item.productId || item.product);
        if (!product || !product.isActive) {
          return res.status(404).json({
            success: false,
            message: `Piece not available for sovereign allocation: ${item.productId}`
          });
        }

        const qty = item.quantity || 1;
        subtotalINR += product.valuationINR * qty;

        orderItems.push({
          product: product._id,
          title: product.title,
          sku: product.sku,
          priceSnapshotINR: product.valuationINR,
          quantity: qty,
          imageSnapshot: product.images?.[0]?.url || '',
          metalPurity: product.bullionSpecs?.metal || '22K Royal Gold'
        });
      }
    } else {
      // Or pull items from patron's active cart
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Acquisition bag is empty. Please select masterpieces first.'
        });
      }

      for (const cartItem of cart.items) {
        subtotalINR += cartItem.product.valuationINR * cartItem.quantity;
        orderItems.push({
          product: cartItem.product._id,
          title: cartItem.product.title,
          sku: cartItem.product.sku,
          priceSnapshotINR: cartItem.product.valuationINR,
          quantity: cartItem.quantity,
          imageSnapshot: cartItem.product.images?.[0]?.url || '',
          metalPurity: cartItem.product.bullionSpecs?.metal || '22K Royal Gold'
        });
      }

      // Empty user's cart upon order placement
      cart.items = [];
      cart.recalculateTotals();
      await cart.save();
    }

    // Tax rate is configurable via environment variable (default 3% jewellery GST)
    const taxRate = process.env.TAX_RATE_PERCENT ? Number(process.env.TAX_RATE_PERCENT) : 3;
    const gstINR = Math.round(subtotalINR * (taxRate / 100));
    const totalValuationINR = subtotalINR + gstINR;

    const orderRef = `SVR-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await Order.create({
      orderReference: orderRef,
      user: req.user.id,
      items: orderItems,
      patronDetails: {
        fullName: req.user.fullName,
        email: req.user.email,
        phone: req.user.phone || req.body.phone || '+91 98200 48291'
      },
      shippingAddress: shippingAddress || req.user.deliveryAddress || {
        addressLine: 'Sovereign Estate, Malabar Hill',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400006',
        country: 'India'
      },
      deliveryProtocol,
      transitMethodLabel:
        deliveryProtocol === 'armored'
          ? 'Armored Diplomatic Courier to Private Residence'
          : 'Direct Private Salon Presentation',
      financialSummary: {
        subtotalINR,
        insuredWhiteGloveShippingINR: 0, // Complimentary
        taxRatePercent: taxRate,
        taxGSTINR: gstINR,
        totalValuationINR
      },
      paymentDetails: {
        method: paymentMethod,
        methodLabel:
          paymentMethod === 'card'
            ? 'Sovereign Amex Centurion'
            : paymentMethod === 'upi'
            ? 'UPI Sovereign Ultra'
            : paymentMethod === 'wire'
            ? 'Private Wire Escrow'
            : 'Private Banking Consortia',
        status: paymentMethod === 'wire' ? 'AWAITING_ESCROW' : 'PENDING'
      },
      fulfillmentStatus: paymentMethod === 'wire' ? 'Awaiting Escrow' : 'Pending Payment'
    });

    res.status(201).json({
      success: true,
      message:
        paymentMethod === 'wire'
          ? 'Sovereign order initiated. Awaiting wire escrow deposit.'
          : 'Sovereign order initiated. Awaiting Razorpay payment authorization.',
      order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get authenticated patron's order history
// @route   GET /api/v1/orders/my-orders
// @access  Private (Patron)
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get order details by ID or Reference
// @route   GET /api/v1/orders/:id
// @access  Private (Patron / Admin)
exports.getOrderById = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    let order = null;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(identifier);
    }

    if (!order) {
      order = await Order.findOne({ orderReference: identifier.toUpperCase() });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order reference not found in royal dispatch ledger'
      });
    }

    // Authorization: User can only see their own order unless admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not hold custody credentials for this order.'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Initiate Razorpay test-mode payment order
// @route   POST /api/v1/orders/razorpay/create-order
// @access  Private (Patron)
exports.createRazorpayPaymentOrder = async (req, res, next) => {
  try {
    const { orderId, amountINR } = req.body;
    const razorpayService = require('../services/razorpayService');

    // Check if Razorpay test mode credentials are validly configured
    if (!razorpayService.isLiveConfigured()) {
      return res.status(400).json({
        success: false,
        configError: true,
        message:
          'Razorpay TEST MODE credentials are not configured. Please set valid RAZORPAY_KEY_ID (starting with rzp_test_) and RAZORPAY_KEY_SECRET in sovira-backend/.env.'
      });
    }

    let totalAmount = amountINR;
    let orderDoc = null;

    if (orderId) {
      if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
        orderDoc = await Order.findById(orderId);
      }
      if (!orderDoc) {
        orderDoc = await Order.findOne({ orderReference: orderId.toUpperCase() });
      }
      if (orderDoc) {
        totalAmount = orderDoc.financialSummary?.totalValuationINR || totalAmount;
      }
    }

    const receipt = orderDoc?.orderReference || `rcpt_${Date.now()}`;
    const rzpOrder = await razorpayService.createRazorpayOrder({
      amountINR: totalAmount,
      receipt,
      notes: { orderRef: receipt }
    });

    res.status(200).json({
      success: true,
      razorpayOrder: rzpOrder,
      keyId: razorpayService.getKeyId()
    });
  } catch (err) {
    if (err.isConfigurationError) {
      return res.status(400).json({
        success: false,
        configError: true,
        message: err.message
      });
    }
    next(err);
  }
};

// @desc    Verify Razorpay payment signature & update order status
// @route   POST /api/v1/orders/razorpay/verify-payment
// @access  Private (Patron)
exports.verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const razorpayService = require('../services/razorpayService');

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required Razorpay payment verification parameters.'
      });
    }

    if (!razorpayService.isLiveConfigured()) {
      return res.status(400).json({
        success: false,
        configError: true,
        message:
          'Razorpay TEST MODE credentials are not configured on the server. Unable to verify payment signature.'
      });
    }

    const isValid = razorpayService.verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Cryptographic signature mismatch. Payment verification failed on server.'
      });
    }

    let order = null;
    if (orderId) {
      if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
        order = await Order.findById(orderId);
      }
      if (!order) {
        order = await Order.findOne({ orderReference: orderId.toUpperCase() });
      }
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order reference not found in royal dispatch ledger.'
      });
    }

    order.paymentDetails.status = 'PAID';
    order.paymentDetails.razorpayPaymentId = razorpay_payment_id;
    order.paymentDetails.razorpayOrderId = razorpay_order_id;
    order.paymentDetails.razorpaySignature = razorpay_signature;
    order.fulfillmentStatus = 'Confirmed';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment cryptographically authenticated. Sovereign order confirmed.',
      order
    });
  } catch (err) {
    if (err.isConfigurationError) {
      return res.status(400).json({
        success: false,
        configError: true,
        message: err.message
      });
    }
    next(err);
  }
};

// @desc    Public / Patron Order Tracking by Reference
// @route   GET /api/v1/orders/track/:reference
// @access  Public
exports.trackOrderByReference = async (req, res, next) => {
  try {
    const { reference } = req.params;
    const order = await Order.findOne({ orderReference: reference.toUpperCase() })
      .select('orderReference fulfillmentStatus transitMethodLabel diplomaticCourierTracking createdAt items financialSummary');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order reference ${reference.toUpperCase()} not found in royal dispatch archives.`
      });
    }

    // Curate chronological tracking milestones
    const milestones = [
      {
        step: 1,
        title: 'Vault Allocation & Verification',
        description: 'Pieces secured in Jaipur High Vault, hallmark and gems certified.',
        status: 'completed',
        timestamp: order.createdAt
      },
      {
        step: 2,
        title: 'Diplomatic Seal & Packaging',
        description: 'Velvet bullion encasement with tamper-proof sovereign royal seal.',
        status: ['In Transit', 'Out for Delivery', 'Delivered'].includes(order.fulfillmentStatus)
          ? 'completed'
          : 'in_progress',
        timestamp: null
      },
      {
        step: 3,
        title: 'Armored Courier Transit',
        description: 'Armed diplomatic security transport deployed to destination coordinates.',
        status: ['Out for Delivery', 'Delivered'].includes(order.fulfillmentStatus)
          ? 'completed'
          : order.fulfillmentStatus === 'In Transit'
          ? 'in_progress'
          : 'pending',
        courier: order.diplomaticCourierTracking
      },
      {
        step: 4,
        title: 'Private Handover / Salon Presentation',
        description: 'Personal handover by senior curator with white-glove inspection.',
        status: order.fulfillmentStatus === 'Delivered' ? 'completed' : 'pending',
        timestamp: null
      }
    ];

    res.status(200).json({
      success: true,
      orderReference: order.orderReference,
      fulfillmentStatus: order.fulfillmentStatus,
      transitMethod: order.transitMethodLabel,
      courierDetails: order.diplomaticCourierTracking,
      itemCount: order.items?.length || 1,
      totalValuationINR: order.financialSummary?.totalValuationINR,
      milestones
    });
  } catch (err) {
    next(err);
  }
};
