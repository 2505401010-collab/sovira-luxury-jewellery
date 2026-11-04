const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All cart actions require patron session

router.get('/', getCart);
router.post('/items', addToCart);
router.put('/items/:productId', updateQuantity);
router.delete('/items/:productId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
