const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  createRazorpayPaymentOrder,
  verifyRazorpayPayment,
  trackOrderByReference
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Public tracking by Sovereign Order Reference (e.g. SVR-890211)
router.get('/track/:reference', trackOrderByReference);

router.use(protect); // Orders require patron authentication

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.post('/razorpay/create-order', createRazorpayPaymentOrder);
router.post('/razorpay/verify-payment', verifyRazorpayPayment);
router.get('/:id', getOrderById);

module.exports = router;
