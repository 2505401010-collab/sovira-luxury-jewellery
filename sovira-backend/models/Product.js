const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Masterpiece title is required'],
      trim: true
    },
    sku: {
      type: String,
      required: [true, 'Vault SKU is required'],
      unique: true,
      uppercase: true,
      trim: true
    },
    lotNumber: {
      type: String,
      default: 'Folio Lot • 0819'
    },
    tagline: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Jewellery category is required'],
      trim: true
    },
    categorySlug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    collectionName: {
      type: String,
      default: 'High Jewellery',
      trim: true
    },
    collectionSlug: {
      type: String,
      default: 'high-jewellery',
      lowercase: true,
      trim: true
    },
    subCollection: {
      type: String,
      default: 'The Jharokha Collection'
    },
    valuationINR: {
      type: Number,
      required: [true, 'Declared acquisition valuation in INR is required'],
      min: [0, 'Valuation cannot be negative']
    },
    isPriceOnEnquiry: {
      type: Boolean,
      default: false
    },
    inVaultLocation: {
      type: String,
      default: 'Vault — Mumbai'
    },
    isPieceUnique: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    inventoryCount: {
      type: Number,
      default: 1,
      min: 0
    },
    bullionSpecs: {
      metal: { type: String, default: '22K Royal Hallmarked Gold' },
      purityAssay: { type: String, default: 'BIS 916 Sovereign Hallmark' },
      netWeightGrams: { type: Number, default: 0 },
      craftsmanshipTechnique: { type: String, default: 'Chased Nakashi & Hand-pressed Gold Foil' }
    },
    gemstoneSpecs: {
      stoneType: { type: String, default: 'Natural Untreated Gemstone' },
      caratWeight: { type: Number, default: 0 },
      cut: { type: String, default: 'Antique Heritage Cut' },
      originProvenance: { type: String, default: 'Historic Royal Mine Lot' },
      certificationLab: { type: String, default: 'Gübelin / GIA Accredited' }
    },
    diamondSpecs: {
      stoneType: { type: String, default: 'Golconda Rose-Cuts' },
      caratWeight: { type: Number, default: 0 },
      clarity: { type: String, default: 'VVS1' },
      color: { type: String, default: 'D-F Exceptional White' }
    },
    editorialStory: {
      type: String,
      default: ''
    },
    images: [
      {
        url: { type: String, required: true },
        label: { type: String, default: 'Vitrine View' },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Indexes for high-speed curatorial search & filtering
productSchema.index({ title: 'text', editorialStory: 'text', 'bullionSpecs.metal': 'text', 'gemstoneSpecs.stoneType': 'text' });
productSchema.index({ categorySlug: 1, collectionSlug: 1, valuationINR: 1 });

module.exports = mongoose.model('Product', productSchema);
