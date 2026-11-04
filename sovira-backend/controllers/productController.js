const Product = require('../models/Product');

// @desc    Get all masterpieces with search, category, metal & price filtering
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      collection,
      metal,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 20
    } = req.query;

    const query = { isActive: true };

    // Text / keyword search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { collectionName: { $regex: search, $options: 'i' } },
        { 'bullionSpecs.metal': { $regex: search, $options: 'i' } },
        { 'gemstoneSpecs.stoneType': { $regex: search, $options: 'i' } },
        { editorialStory: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      query.$or = [
        { categorySlug: category.toLowerCase() },
        { category: { $regex: new RegExp(`^${category}$`, 'i') } }
      ];
    }

    // Collection filter
    if (collection && collection !== 'all') {
      query.collectionSlug = collection.toLowerCase();
    }

    // Metal filter
    if (metal && metal !== 'all') {
      query['bullionSpecs.metal'] = { $regex: metal, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.valuationINR = {};
      if (minPrice) query.valuationINR.$gte = Number(minPrice);
      if (maxPrice) query.valuationINR.$lte = Number(maxPrice);
    }

    // Sort order
    let sortQuery = { isFeatured: -1, createdAt: -1 };
    if (sort === 'price-asc') sortQuery = { valuationINR: 1 };
    if (sort === 'price-desc') sortQuery = { valuationINR: -1 };
    if (sort === 'newest') sortQuery = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortQuery).skip(skip).limit(Number(limit)),
      Product.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single masterpiece by ID or SKU
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    let product = null;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier);
    }

    if (!product) {
      // Lookup by SKU or lot
      product = await Product.findOne({
        $or: [
          { sku: identifier.toUpperCase() },
          { _id: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null }
        ]
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Masterpiece not found in royal vault archives'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add new masterpiece to royal collection (Admin only)
// @route   POST /api/v1/products
// @access  Private (Master Curator / Admin)
exports.createProduct = async (req, res, next) => {
  try {
    const existingSku = await Product.findOne({ sku: req.body.sku.toUpperCase() });
    if (existingSku) {
      return res.status(400).json({
        success: false,
        message: `An archival piece with SKU ${req.body.sku} already exists`
      });
    }

    const product = await Product.create({
      ...req.body,
      sku: req.body.sku.toUpperCase(),
      categorySlug: req.body.categorySlug || req.body.category.toLowerCase().replace(/\s+/g, '-')
    });

    res.status(201).json({
      success: true,
      message: 'Masterpiece inscribed into royal collection',
      product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update masterpiece attributes (Admin only)
// @route   PUT /api/v1/products/:id
// @access  Private (Master Curator / Admin)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Masterpiece not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Masterpiece dossier updated',
      product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete or decommission masterpiece (Admin only)
// @route   DELETE /api/v1/products/:id
// @access  Private (Master Curator / Admin)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Masterpiece not found'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Masterpiece decommissioned from vault archive'
    });
  } catch (err) {
    next(err);
  }
};
