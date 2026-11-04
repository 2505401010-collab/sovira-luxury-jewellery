const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { connectDB } = require('../config/db');

const FALLBACK_JEWELRY_IMAGE =
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80';

const SEED_CATEGORIES = [
  { name: 'Rings', slug: 'rings', type: 'Jewellery Typology', description: 'Sovereign Solitaires & Archival Gemstone Bands' },
  { name: 'Necklaces', slug: 'necklaces', type: 'Jewellery Typology', description: 'Imperial Collars, Chokers & Hanslis' },
  { name: 'Earrings', slug: 'earrings', type: 'Jewellery Typology', description: 'Jharokha Chandelier & Pavé Drops' },
  { name: 'Bracelets', slug: 'bracelets', type: 'Jewellery Typology', description: 'Articulated Sovereign Cuffs & Hathphools' },
  { name: 'Bangles', slug: 'bangles', type: 'Jewellery Typology', description: 'Nakashi Chased & Enamelled Kadas' },
  { name: 'Pendants', slug: 'pendants', type: 'Jewellery Typology', description: 'Archival Talismans & Solitaire Brooches' },
  { name: 'Maang Tikka', slug: 'maang-tikka', type: 'Jewellery Typology', description: 'Royal Forehead Ornaments & Sarpech Crests' },
  { name: 'Mangalsutra', slug: 'mangalsutra', type: 'Jewellery Typology', description: 'Sovereign Sacred Heirlooms in 22K Gold & Diamond' },
  { name: 'Gold', slug: 'gold', type: 'Precious Metal', description: '24K & 22K Royal Hallmarked Goldsmithing' },
  { name: 'Silver', slug: 'silver', type: 'Precious Metal', description: '925 Moonlight Sterling & Gilt Vermeil' },
  { name: 'Diamond', slug: 'diamond', type: 'Gemstone', description: 'Type IIa Golconda Rose-Cuts & Solitaires' },
  { name: 'Gemstones', slug: 'gemstones', type: 'Gemstone', description: 'Unheated Kashmir Sapphires, Muzo Emeralds & Burmese Rubies' },
  { name: 'Bridal Jewellery', slug: 'bridal-jewellery', type: 'Occasion / Collection', description: 'Imperial Parures & Royal Wedding Trousseau Suites' }
];

const SEED_PRODUCTS = [
  // 1. HIGH JEWELLERY / NECKLACE
  {
    sku: 'SVR-8902-DX',
    lotNumber: 'Folio Lot • 0819',
    title: 'The Padmavati Jharokha Collar',
    tagline: 'Piece Unique No. 01/01 • Rajput Court Masterpiece [DEMO]',
    category: 'Necklaces',
    categorySlug: 'necklaces',
    collectionName: 'High Jewellery',
    collectionSlug: 'high-jewellery',
    subCollection: 'The Jharokha Collection',
    valuationINR: 18500000,
    inVaultLocation: 'Vault — Mumbai',
    isPieceUnique: true,
    isFeatured: true,
    inventoryCount: 1,
    bullionSpecs: {
      metal: '22K Royal Hallmarked Gold',
      purityAssay: 'BIS 916 Sovereign Hallmark [Demo Assay]',
      netWeightGrams: 142.0,
      craftsmanshipTechnique: 'Ancestral Chased Nakashi & Hand-pressed 24K Kundan Gold Foil'
    },
    gemstoneSpecs: {
      stoneType: 'Natural Fluted Emerald [Demo Spec]',
      caratWeight: 42.8,
      cut: 'Botanical Mughal Fluted Sugarloaf',
      originProvenance: 'Historic Treasury Reserve [Demo Provenance]',
      certificationLab: 'Master Archival Gemological Dossier [Demo]'
    },
    diamondSpecs: {
      stoneType: 'Antique Golconda Rose-Cut Diamonds [Demo]',
      caratWeight: 18.6,
      clarity: 'VVS1 Heritage Antique',
      color: 'D-F Exceptional White'
    },
    editorialStory: '[DEMO SHOWCASE] Suspended in silent grandeur, The Padmavati Jharokha Collar marries structural sandstone geometry with imperial lapidary majesty. Carved from a singular 42.8-carat untreated emerald exhibiting vivid forest-green saturation.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4dCcKySnUKxXdhbUaNBSlUCPHqoe_2dbmDsmEWQiaf_HcqkVwIsPL5m8nKPugqF5dK73LVIMsVU7FzbNZvFtelmtf2eLSMIIcXLfE_IcNQkF5MzRlxDx58I6_q1NLtcTgjC-tzL8P5rsEY6sbnDbiQOl5F3moN5lVWztvEQsv9qjGKrZCN0hu4-1YJcLgic8kTRhRqigWd5Lk-mIhKkB3pq8WCi-GsPQFlB0fC5s',
        label: 'Front Vitrine View',
        isPrimary: true
      }
    ]
  },

  // 2. EARRINGS / SIGNATURE
  {
    sku: 'SVR-8924-ER',
    lotNumber: 'Folio Lot • 0824',
    title: 'Mehraab Pavé Drop Earrings',
    tagline: 'Edition 01/03 • Sovereign Architectural Symmetry [DEMO]',
    category: 'Earrings',
    categorySlug: 'earrings',
    collectionName: 'Signature Collections',
    collectionSlug: 'signature',
    subCollection: 'The Jharokha Collection',
    valuationINR: 2850000,
    inVaultLocation: 'Vault — London',
    isPieceUnique: false,
    isFeatured: true,
    inventoryCount: 3,
    bullionSpecs: {
      metal: '18K Sovereign White Gold',
      purityAssay: '750 Fineness Assay Stamp [Demo Assay]',
      netWeightGrams: 28.4,
      craftsmanshipTechnique: 'Micro-pavé setting with knife-edge gallery bridges'
    },
    gemstoneSpecs: {
      stoneType: 'Faceted White Brilliant Diamonds [Demo Spec]',
      caratWeight: 8.4,
      cut: 'Modified Brilliant & Antique Pear Cascades',
      originProvenance: 'Curated Heritage Alluvial Lot [Demo]',
      certificationLab: 'Gemological Dossier Accredited [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] Drawing inspiration from the arched mehraab colonnades of royal darbar halls, these chandelier earrings feature cascading articulated pear diamonds that sway with sovereign grace.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYVes8g6Q6CIGMpKHiBbBEUFLz4ga5Q1LfbftzEVAXT9qrjdbweVjNbivImLfCR4IOttvRwub1nsHBss6nHS0eLHyYg_v5UUlgL1zD5B4IUcmsWE6hIBRQxxPveZTfRdKtY-qYqNq2d20Qs-1LmFWxt3Rz-2rvEZu-Gl0Sy4JgyMThT_7mO1b4sDOIqFonVFiAvTaUqQRPyoNUgEnRfsrl2y0NVVBXuj51hYvunok',
        label: 'Front Pair',
        isPrimary: true
      }
    ]
  },

  // 3. RINGS / GEMSTONES
  {
    sku: 'SVR-8911-RG',
    lotNumber: 'Folio Lot • 0831',
    title: 'The Nizam Royal Sapphire Ring',
    tagline: 'Piece Unique • 14.2 Carat Untreated Velvet Blue [DEMO]',
    category: 'Rings',
    categorySlug: 'rings',
    collectionName: 'Precious Gemstones',
    collectionSlug: 'gemstones',
    subCollection: 'The Nizam Treasury',
    valuationINR: 6400000,
    inVaultLocation: 'Vault — Mumbai',
    isPieceUnique: true,
    isFeatured: true,
    inventoryCount: 1,
    bullionSpecs: {
      metal: '950 Platinum & 18K Yellow Gold',
      purityAssay: 'PT 950 Imperial Hallmark [Demo Assay]',
      netWeightGrams: 16.8,
      craftsmanshipTechnique: 'Hand-fabricated dual-tone sovereign gallery'
    },
    gemstoneSpecs: {
      stoneType: 'Unheated Cornflower Blue Sapphire [Demo Spec]',
      caratWeight: 14.2,
      cut: 'Cushion Antique Brilliant',
      originProvenance: 'Himalayan Historical Valley Lot [Demo Provenance]',
      certificationLab: 'International Laboratory Pedigree [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] Displaying the characteristic velvety cornflower blue hue, this 14.2-carat sapphire is nestled between tapered diamond baguettes in a sovereign platinum mount.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaorUkh1-kkyErZ4l_RtD3xUdUrMSsvrZjRqTZrvLE1i1uHTyJFgwgdF9TFu0YGmheC8EMo8aKeccJmVELRI7kv7kO3JXxVmsKAKYmBYRdTpQmGQv23b-P2-EHFZVZbn90pkhh_aPs2RXErj7lVXlWctrve2-4OD0j6s46BXH1NcF7dCAy0DiysX8tGIyR9aCILo3GohPELfm3yVpFfmjiI7Gwm25vlNe5mFDocFw',
        label: 'Ring Display',
        isPrimary: true
      }
    ]
  },

  // 4. SILVER / NECKLACES
  {
    sku: 'SVR-7741-SL',
    lotNumber: 'Folio Lot • 0741',
    title: 'Shikargah Silver Torc',
    tagline: 'Hallmarked 925 • Hand-Engraved Imperial Foliage [DEMO]',
    category: 'Necklaces',
    categorySlug: 'necklaces',
    collectionName: 'Silver Jewellery',
    collectionSlug: 'silver',
    subCollection: 'Sterling & Moonlight',
    valuationINR: 340000,
    inVaultLocation: 'Vault — Jaipur',
    isPieceUnique: false,
    isFeatured: true,
    inventoryCount: 5,
    bullionSpecs: {
      metal: '925 Sterling Silver & 22K Gold Foil Inlay',
      purityAssay: 'Hallmarked 925 Sovereign Mark [Demo Assay]',
      netWeightGrams: 215.0,
      craftsmanshipTechnique: 'Traditional Deep Repoussé & Champlevé Oxidization'
    },
    gemstoneSpecs: {
      stoneType: 'Natural Cabochon Moonstones [Demo Spec]',
      caratWeight: 6.5,
      cut: 'Smooth Domed Ovals',
      originProvenance: 'Archival Mine Reserve [Demo]',
      certificationLab: 'In-House Master Hallmark [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] A monumental neckpiece forged in solid sterling silver, depicting scenes from classical court scrolls with 22K gold foil accents.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu3-WgukP7hAPOgoCMbQr0_KqJdLAj3BSDoZPmzT1Bck1BBIEob_aIURFBtN53BSqJVMmQ2Jt9E-oWPvYY9jMHOTs86p5zGdsA9Gm8tGyseE0x2MceSU23YVo9u_20GouActtb9b09AnJmSf3JWEyXeHfGxewu_wBV6UwofUskJpTEVFc9MGLK4fYrvuQZf0yWAlI-PIv7eQpSDYbP6uYRFGsluiiGUKpIGBdkjow',
        label: 'Torc Profile',
        isPrimary: true
      }
    ]
  },

  // 5. BANGLES / ROYAL GOLD
  {
    sku: 'SVR-8812-BG',
    lotNumber: 'Folio Lot • 0812',
    title: 'Mayura Nizam Heirloom Bangle',
    tagline: '22K Pure Bullion • Enamelled Chasing with Basra Pearls [DEMO]',
    category: 'Bangles',
    categorySlug: 'bangles',
    collectionName: 'Royal Gold',
    collectionSlug: 'royal-gold',
    subCollection: 'The Golden Lineage',
    valuationINR: 5800000,
    inVaultLocation: 'Vault — Mumbai',
    isPieceUnique: true,
    isFeatured: true,
    inventoryCount: 1,
    bullionSpecs: {
      metal: '22K Royal Hallmarked Gold',
      purityAssay: 'BIS 916 Royal Assay [Demo Assay]',
      netWeightGrams: 88.5,
      craftsmanshipTechnique: 'Mughal Meenakari Enamelling & Chased Gold Terminals'
    },
    gemstoneSpecs: {
      stoneType: 'Cultured Seed Pearls & Polki Cut Gems [Demo Spec]',
      caratWeight: 7.2,
      cut: 'Natural Uncut Polki Diamonds',
      originProvenance: 'Heritage Gem Reserve [Demo]',
      certificationLab: 'Gemological Certificate [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] Twin peacock finials meet at the hinged closure of this substantial 22-karat gold kada, each feather intricately enamelled with midnight blue champlevé.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk',
        label: 'Bangle Vitrine',
        isPrimary: true
      }
    ]
  },

  // 6. BRACELETS / CUFFS
  {
    sku: 'SVR-7788-CF',
    lotNumber: 'Folio Lot • 0788',
    title: 'Sultana Layered Sovereign Cuff',
    tagline: 'Articulated Sovereign Links • 18K Yellow Gold & Baguette Diamonds [DEMO]',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    collectionName: 'Signature Collections',
    collectionSlug: 'signature',
    subCollection: 'The Sovereign Lineage',
    valuationINR: 3950000,
    inVaultLocation: 'Vault — Mumbai',
    isPieceUnique: false,
    isFeatured: true,
    inventoryCount: 2,
    bullionSpecs: {
      metal: '18K Yellow Sovereign Gold',
      purityAssay: '750 Royal Assay [Demo Assay]',
      netWeightGrams: 64.0,
      craftsmanshipTechnique: 'Flexible hidden spring links with hand-bezel setting'
    },
    diamondSpecs: {
      stoneType: 'Baguette & Round Brilliant Diamonds [Demo Spec]',
      caratWeight: 9.8,
      clarity: 'VVS2 High Brilliance',
      color: 'F-G Near Colorless'
    },
    editorialStory: '[DEMO SHOWCASE] Designed for timeless grandeur, the Sultana cuff flexes effortlessly on the wrist through concealed sovereign hinges, capturing light from every angle.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611591475819-79b8b73c2e39?auto=format&fit=crop&w=1200&q=80',
        label: 'Cuff Angle',
        isPrimary: true
      }
    ]
  },

  // 7. PENDANTS
  {
    sku: 'SVR-7762-PD',
    lotNumber: 'Folio Lot • 0762',
    title: 'Surya Jharokha Talisman Pendant',
    tagline: 'Celestial Radial Lattice • 22K Gold & Pigeon Blood Ruby [DEMO]',
    category: 'Pendants',
    categorySlug: 'pendants',
    collectionName: 'Precious Gemstones',
    collectionSlug: 'gemstones',
    subCollection: 'The Celestial Pantheon',
    valuationINR: 1950000,
    inVaultLocation: 'Vault — Jaipur',
    isPieceUnique: true,
    isFeatured: true,
    inventoryCount: 1,
    bullionSpecs: {
      metal: '22K Hallmarked Gold',
      purityAssay: 'BIS 916 Royal Hallmark [Demo Assay]',
      netWeightGrams: 26.5,
      craftsmanshipTechnique: 'Hand-pierced jali filigree with micro-prongs'
    },
    gemstoneSpecs: {
      stoneType: 'Natural Unheated Ruby [Demo Spec]',
      caratWeight: 4.6,
      cut: 'Oval Mixed Brilliant',
      originProvenance: 'Historic Archival Lot [Demo]',
      certificationLab: 'Gem Testing Dossier [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] Embodying the radiance of the morning sun over Rajasthan palaces, this pendant frames an incandescent 4.6-carat ruby within hand-pierced gold arches.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
        label: 'Pendant Vitrine',
        isPrimary: true
      }
    ]
  },

  // 8. BRIDAL JEWELLERY
  {
    sku: 'SVR-9100-BD',
    lotNumber: 'Folio Lot • 0900',
    title: 'Maharani Imperial Royal Bridal Parure Suite',
    tagline: 'Complete 7-Piece Imperial Trousseau • Polki, Basra Pearls & 22K Gold [DEMO]',
    category: 'Bridal Jewellery',
    categorySlug: 'bridal-jewellery',
    collectionName: 'High Jewellery',
    collectionSlug: 'high-jewellery',
    subCollection: 'The Royal Wedding Trousseau',
    valuationINR: 32000000,
    inVaultLocation: 'Vault — Jaipur',
    isPieceUnique: true,
    isFeatured: true,
    inventoryCount: 1,
    bullionSpecs: {
      metal: '22K & 24K Kundan Gold',
      purityAssay: 'BIS 916 Sovereign Imperial Hallmark [Demo Assay]',
      netWeightGrams: 480.0,
      craftsmanshipTechnique: 'Jaipur Jadau, Meenakari Enamelling & Chased Repoussé'
    },
    gemstoneSpecs: {
      stoneType: 'Syndicate Polki Diamonds & Natural Emerald Beads [Demo Spec]',
      caratWeight: 112.0,
      cut: 'Natural Uncut Rose-Faceted Polki',
      originProvenance: 'Imperial Treasury Reserve [Demo]',
      certificationLab: 'Royal Gemological Federation Record [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] The crowning glory of the SOVIRA atelier: a grand bridal suite comprising an imperial choker, matching jhumkhas, maang tikka, hathphool cuffs, and royal nath.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
        label: 'Bridal Suite Overview',
        isPrimary: true
      }
    ]
  },

  // 9. MAANG TIKKA
  {
    sku: 'SVR-8845-MT',
    lotNumber: 'Folio Lot • 0845',
    title: 'Roopmati Polki Maang Tikka',
    tagline: 'Imperial Forehead Crest • Uncut Polki Diamonds & Colombian Emeralds [DEMO]',
    category: 'Maang Tikka',
    categorySlug: 'maang-tikka',
    collectionName: 'High Jewellery',
    collectionSlug: 'high-jewellery',
    subCollection: 'The Jharokha Collection',
    valuationINR: 3200000,
    inVaultLocation: 'Vault — Mumbai',
    isPieceUnique: true,
    isFeatured: true,
    inventoryCount: 1,
    bullionSpecs: {
      metal: '22K Yellow Hallmarked Gold',
      purityAssay: 'BIS 916 Royal Hallmark [Demo Assay]',
      netWeightGrams: 46.2,
      craftsmanshipTechnique: 'Jadau Open-Back Polki Setting with Reverse Floral Enamel'
    },
    gemstoneSpecs: {
      stoneType: 'Syndicate Polki Diamonds & Emerald Beads [Demo Spec]',
      caratWeight: 14.5,
      cut: 'Natural Uncut Rose-Faceted Polki',
      originProvenance: 'Curated Mine Lot [Demo]',
      certificationLab: 'Gemological Identification Dossier [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] Crafted for imperial brides of sovereign royal houses, the Roopmati Maang Tikka features tiered crescent arcs of uncut polki diamonds suspended above an emerald drop.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYLVUzoTiVYwpQJMUFYO4wcdH7CBYas-pxTCNLgiHSp6c8Yz_0rp8odnh_6xb_WLM6acxBiU8FTaSOPCelE0OY8Lxjx6REmLjB5RDNCxdC_b18MgKMKnYHdJyqqXBJKzs_psE8DAc9h2fzMW2Gnd4KNpo1-VzGrmf-J8p0L3d7lJiBowrxXYyJovODQ_dw9Or7cmYj0GhUTMKfQ20rOtNuEEwIPLJzEkYDbDS-csk',
        label: 'Front Crest',
        isPrimary: true
      }
    ]
  },

  // 10. MANGALSUTRA
  {
    sku: 'SVR-8890-MS',
    lotNumber: 'Folio Lot • 0890',
    title: 'Rajputana Royal Mangalsutra',
    tagline: 'Sacred Heirlooms • 22K Gold, Black Spinel & Marquise Diamond [DEMO]',
    category: 'Mangalsutra',
    categorySlug: 'mangalsutra',
    collectionName: 'Royal Gold',
    collectionSlug: 'royal-gold',
    subCollection: 'The Golden Lineage',
    valuationINR: 1850000,
    inVaultLocation: 'Vault — Mumbai',
    isPieceUnique: false,
    isFeatured: true,
    inventoryCount: 4,
    bullionSpecs: {
      metal: '22K Antique Hallmarked Gold',
      purityAssay: 'BIS 916 Certified [Demo Assay]',
      netWeightGrams: 38.5,
      craftsmanshipTechnique: 'Hand-strung micro-bead wire with chased nakashi pendant'
    },
    gemstoneSpecs: {
      stoneType: 'Faceted Black Spinel & Solitaire Marquise Diamond [Demo Spec]',
      caratWeight: 2.15,
      cut: 'Marquise Brilliant & Micro-Faceted Spinel',
      originProvenance: 'Ethical Origin Certified [Demo]',
      certificationLab: 'Diamond Guarantee Record [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] Elevating the sacred nuptial cord into haute joaillerie, this creation features double strands of hand-selected black spinel beads supporting an openwork gold lotus pendant.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk',
        label: 'Mangalsutra Center',
        isPrimary: true
      }
    ]
  },

  // 11. DIAMOND JEWELLERY / CHOKER
  {
    sku: 'SVR-9040-DM',
    lotNumber: 'Folio Lot • 0940',
    title: 'Noor-e-Darya Diamond Solitaire Choker',
    tagline: 'Type IIa Heritage Rose-Cuts • 18K White Gold [DEMO]',
    category: 'Diamond',
    categorySlug: 'diamond',
    collectionName: 'High Jewellery',
    collectionSlug: 'high-jewellery',
    subCollection: 'The Diamond Constellation',
    valuationINR: 14200000,
    inVaultLocation: 'Vault — London',
    isPieceUnique: true,
    isFeatured: true,
    inventoryCount: 1,
    bullionSpecs: {
      metal: '18K White Gold & 950 Platinum',
      purityAssay: 'PT 950 & 750 Fineness [Demo Assay]',
      netWeightGrams: 92.0,
      craftsmanshipTechnique: 'Invisible articulating setting with bezel-set rose cuts'
    },
    diamondSpecs: {
      stoneType: 'Antique Rose-Cut & Round Brilliant Diamonds [Demo Spec]',
      caratWeight: 34.5,
      clarity: 'FL - VVS1 Exceptional Purity',
      color: 'D Color Flawless'
    },
    editorialStory: '[DEMO SHOWCASE] Inspired by the historic diamonds of ancient India, each hand-cut stone in this collar exhibits the gentle, candlelit glow characteristic of antique rose-cutting.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
        label: 'Diamond Vitrine',
        isPrimary: true
      }
    ]
  },

  // 12. GOLD JEWELLERY / HANSLI
  {
    sku: 'SVR-8833-HN',
    lotNumber: 'Folio Lot • 0833',
    title: 'Mewari Pearl & Gold Hansli',
    tagline: 'Solid Torc • 22K Sovereign Gold & Basra Seed Pearls [DEMO]',
    category: 'Gold',
    categorySlug: 'gold',
    collectionName: 'Royal Gold',
    collectionSlug: 'royal-gold',
    subCollection: 'The Golden Lineage',
    valuationINR: 4200000,
    inVaultLocation: 'Vault — Jaipur',
    isPieceUnique: false,
    isFeatured: true,
    inventoryCount: 3,
    bullionSpecs: {
      metal: '22K Royal Hallmarked Gold',
      purityAssay: 'BIS 916 Sovereign Assay [Demo Assay]',
      netWeightGrams: 110.0,
      craftsmanshipTechnique: 'Hand-hammered solid torc with wire-strung pearl tassels'
    },
    gemstoneSpecs: {
      stoneType: 'Natural Saltwater Seed Pearls [Demo Spec]',
      caratWeight: 18.0,
      cut: 'Spherical Natural Pearls',
      originProvenance: 'Heritage Merchant Lot [Demo]',
      certificationLab: 'Pearl Authenticity Dossier [Demo]'
    },
    editorialStory: '[DEMO SHOWCASE] A majestic rigid collar in solid 22-karat gold, resting against the collarbone with substantial weight and lined with rows of delicate natural seed pearls.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
        label: 'Hansli Angle',
        isPrimary: true
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('[SOVIRA Seed] Synchronizing Master Categories (Idempotent upsert)...');
    for (const cat of SEED_CATEGORIES) {
      await Category.findOneAndUpdate(
        { slug: cat.slug },
        { ...cat, isActive: true },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✓ Synchronized ${SEED_CATEGORIES.length} jewellery & material categories.`);

    console.log('[SOVIRA Seed] Synchronizing Masterpieces Catalog (Idempotent upsert)...');
    for (const prod of SEED_PRODUCTS) {
      await Product.findOneAndUpdate(
        { sku: prod.sku },
        { ...prod, isActive: true },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✓ Synchronized ${SEED_PRODUCTS.length} demo masterpieces without duplicates.`);

    console.log('[SOVIRA Seed] Verifying Master Curator & Patron Accounts...');
    const adminExists = await User.findOne({ email: 'admin@sovira.vault' });
    if (!adminExists) {
      await User.create({
        fullName: 'Chief Curator Vikramaditya',
        title: 'Grand Archivist',
        email: 'admin@sovira.vault',
        password: 'nidhi0708',
        phone: '+91 7015303927',
        role: 'admin',
        tier: 'Sovereign Patron'
      });
      console.log('✓ Inscribed Master Curator (Admin) account.');
    } else {
      console.log('✓ Master Curator account already in royal register.');
    }

    const patronExists = await User.findOne({ email: 'v.singha@royal-council.in' });
    if (!patronExists) {
      await User.create({
        fullName: 'Maharaj Vikramaditya Singhania',
        title: 'Sovereign Council',
        email: 'rishabhjain0828@gmail.com',
        password: 'nidhi0708',
        phone: '+91 98200 48291',
        role: 'customer',
        tier: 'Sovereign Patron',
        deliveryAddress: {
          addressLine: 'Singhania Palace Grounds, 42 Sovereign Crescent',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400006',
          country: 'India'
        }
      });
      console.log('✓ Inscribed Sovereign Patron demo account.');
    } else {
      console.log('✓ Sovereign Patron demo account verified.');
    }

    console.log('[SOVIRA Seed] Master database seeding verified successfully! 👑');
  } catch (err) {
    console.error('❌ Database seeding error:', err.message);
  }
};

if (require.main === module) {
  seedDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = seedDatabase;
