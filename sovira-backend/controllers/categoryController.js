const Category = require('../models/Category');

// @desc    Get all active jewellery & material categories
// @route   GET /api/v1/categories
// @access  Public
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new category (Admin only)
// @route   POST /api/v1/categories
// @access  Private (Admin)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, type, description } = req.body;
    const slug = req.body.slug || name.toLowerCase().replace(/\s+/g, '-');

    const category = await Category.create({
      name,
      slug,
      type: type || 'Jewellery Typology',
      description: description || ''
    });

    res.status(201).json({
      success: true,
      message: 'Category inscribed into maison classification',
      category
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update category (Admin only)
// @route   PUT /api/v1/categories/:id
// @access  Private (Admin)
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category classification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete category (Admin only)
// @route   DELETE /api/v1/categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category classification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category removed from maison classification'
    });
  } catch (err) {
    next(err);
  }
};
