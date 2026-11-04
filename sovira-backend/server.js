const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in development
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 1. Health-Check Endpoint (Requirement 11)
app.get('/api/v1/health', (req, res) => {
  const { isDatabaseConnected } = require('./config/db');
  res.status(200).json({
    status: 'online',
    database: isDatabaseConnected() ? 'connected' : 'disconnected_or_pending_atlas_uri',
    timestamp: new Date().toISOString(),
    service: 'SOVIRA Royal Haute Joaillerie Sanctuary API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root Welcome Banner
app.get('/', (req, res) => {
  res.status(200).json({
    motto: 'The Hidden Royalty of India, Reimagined for the World',
    maison: 'SOVIRA Haute Joaillerie & Royal Atelier',
    documentation: '/api/v1/health',
    activeEndpoints: [
      '/api/v1/auth',
      '/api/v1/products',
      '/api/v1/categories',
      '/api/v1/cart',
      '/api/v1/wishlist',
      '/api/v1/orders',
      '/api/v1/admin'
    ]
  });
});

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/admin', adminRoutes);

// Catch-all 404 for unrecognized API endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Archival API conduit not found: ${req.originalUrl}`
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;

// Start server function
const startServer = async () => {
  await connectDB();
  server = app.listen(PORT, () => {
    console.log(`[SOVIRA Sanctuary Server] Active on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`[SOVIRA Health Check] Accessible at http://localhost:${PORT}/api/v1/health`);
  });
  return server;
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
