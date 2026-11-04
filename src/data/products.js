// Master SOVIRA Haute Joaillerie Catalog
// Preserving all pieces from the Stitch screens and expanding into requested categories:
// Rings, Necklaces, Earrings, Bracelets, Bangles, Pendants, Maang Tikka, Mangalsutra

export const FALLBACK_JEWELRY_IMAGE = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80";

export const CATEGORIES = [
  { id: "all", name: "All Masterworks", slug: "all" },
  { id: "rings", name: "Rings", slug: "rings", description: "Sovereign Solitaires & Archival Gemstone Bands" },
  { id: "necklaces", name: "Necklaces", slug: "necklaces", description: "Imperial Collars, Chokers & Hanslis" },
  { id: "earrings", name: "Earrings", slug: "earrings", description: "Jharokha Chandelier & Pavé Drops" },
  { id: "bracelets", name: "Bracelets", slug: "bracelets", description: "Articulated Sovereign Cuffs & Hathphools" },
  { id: "bangles", name: "Bangles", slug: "bangles", description: "Nakashi Chased & Enamelled Kadas" },
  { id: "pendants", name: "Pendants", slug: "pendants", description: "Archival Talismans & Solitaire Brooches" },
  { id: "maang-tikka", name: "Maang Tikka", slug: "maang-tikka", description: "Royal Forehead Ornaments & Sarpech Crests" },
  { id: "mangalsutra", name: "Mangalsutra", slug: "mangalsutra", description: "Sovereign Sacred Heirlooms in 22K Gold & Diamond" },
  { id: "bridal-jewellery", name: "Bridal Jewellery", slug: "bridal-jewellery", description: "Imperial Parures & Royal Wedding Trousseau Suites" },
  { id: "gold", name: "Royal Gold", slug: "gold", description: "24K & 22K Royal Hallmarked Goldsmithing" },
  { id: "silver", name: "Silver Objects", slug: "silver", description: "925 Moonlight Sterling & Gilt Vermeil" },
  { id: "diamond", name: "Diamond Solitaires", slug: "diamond", description: "Type IIa Golconda Rose-Cuts & Solitaires" },
  { id: "gemstones", name: "Rare Gemstones", slug: "gemstones", description: "Unheated Kashmir Sapphires, Muzo Emeralds & Burmese Rubies" }
];

export const COLLECTIONS = [
  { id: "high-jewellery", name: "High Jewellery", slug: "high-jewellery", badge: "Piece Unique 01/01" },
  { id: "signature", name: "Signature Collections", slug: "signature", badge: "The Four Houses" },
  { id: "royal-gold", name: "Royal Gold", slug: "royal-gold", badge: "22K/916 Royal BIS" },
  { id: "silver", name: "Silver Jewellery", slug: "silver", badge: "925 Moonlight Sterling" },
  { id: "gemstones", name: "Precious Gemstones", slug: "gemstones", badge: "100% Unheated Certified" },
];

export const PRODUCTS = [
  {
    id: "padmavati-jharokha-collar",
    sku: "SVR-8902-DX",
    lotNumber: "Folio Lot • 0819",
    title: "The Padmavati Jharokha Collar",
    tagline: "Piece Unique No. 01/01 • Rajput Court Masterpiece",
    category: "Necklaces",
    categorySlug: "necklaces",
    collection: "High Jewellery",
    collectionSlug: "high-jewellery",
    subCollection: "The Jharokha Collection",
    priceINR: 18500000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Mumbai",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "22K Royal Hallmarked Gold",
      purityAssay: "BIS 916 Sovereign Hallmark",
      netWeightGrams: 142.0,
      craftsmanshipTechnique: "Ancestral Chased Nakashi & Hand-pressed 24K Kundan Gold Foil"
    },
    gemstoneSpecs: {
      stoneType: "Untreated Muzo Colombian Emerald",
      caratWeight: 42.8,
      cut: "Botanical Mughal Fluted Sugarloaf",
      originProvenance: "Muzo Mine, Colombia / Historical Mewar Treasury",
      certificationLab: "Gübelin No. 2408-771 & SSEF Archival Record"
    },
    diamondSpecs: {
      stoneType: "Antique Golconda Rose-Cut Diamonds",
      caratWeight: 18.6,
      clarity: "VVS1 Heritage Antique",
      color: "D-F Exceptional White"
    },
    editorialStory: "Suspended in silent grandeur, The Padmavati Jharokha Collar marries structural sandstone geometry with imperial lapidary majesty. Carved from a singular 42.8-carat untreated Muzo emerald exhibiting vivid forest-green saturation, the central tableau is encased within hand-pierced 22-karat jharokha lattice arches reminiscent of the private sunset courtyards of Udaipur.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4dCcKySnUKxXdhbUaNBSlUCPHqoe_2dbmDsmEWQiaf_HcqkVwIsPL5m8nKPugqF5dK73LVIMsVU7FzbNZvFtelmtf2eLSMIIcXLfE_IcNQkF5MzRlxDx58I6_q1NLtcTgjC-tzL8P5rsEY6sbnDbiQOl5F3moN5lVWztvEQsv9qjGKrZCN0hu4-1YJcLgic8kTRhRqigWd5Lk-mIhKkB3pq8WCi-GsPQFlB0fC5s",
        label: "Front Vitrine View",
        alt: "The Padmavati Jharokha Collar suspended against dark obsidian velvet."
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGYJAgh_V_gTVEW-UIzXl8rpp-M3_stYry155KNGQTnR5cm5Legtf9vkzBKDGM4me0uMfs672CP9nTmAnAO-snkC3pcHyB92CqJO4XU7TaKFWsCCQ3e2KiMQgMBj_MqlZMthihX5sLDPm0NUM5esV0y5omd8PllbKvJviCyG49yBQ2D7UIod_0i9mBqAVcVM5Ar4dehSlSnq-65WpHT6IBVQeKawnBHPAbmudeIbU",
        label: "Architectural Perspective",
        alt: "Padmavati Collar laid flat on textured raw granite plinth."
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1E4DjAQYhikvtsBX07r32cqYPyIj-W1ot98DbTYWz69xtK6J_AkFYoQXtAHeOCU38XhD3HmzUVzeojpb4kIYcsYPJvg7Pe8GVEUIWdmM9DJoM9ZzrFxSSi9JQuvmyNgarg5Gsj7-NKsSel_zjJYsgU4W6k3UO5eenwoBD2e0iGPr7McK8MF4s1ZNDxrIGNTVXCGYBGYdpc2uvmvvrC6VejICqZLrf-7U0uZqarD8",
        label: "42.8ct Emerald Macro",
        alt: "Microscopic macro of the 42.8 carat carved emerald pendant."
      }
    ]
  },
  {
    id: "mehraab-pave-drop-earrings",
    sku: "SVR-8924-ER",
    lotNumber: "Folio Lot • 0824",
    title: "Mehraab Pavé Drop Earrings",
    tagline: "Edition 01/03 • Sovereign Architectural Symmetry",
    category: "Earrings",
    categorySlug: "earrings",
    collection: "Signature Collections",
    collectionSlug: "signature",
    subCollection: "The Jharokha Collection",
    priceINR: 2850000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — London",
    isPieceUnique: false,
    isFeatured: true,
    bullionSpecs: {
      metal: "18K Sovereign White Gold",
      purityAssay: "750 Fineness Assay Stamp",
      netWeightGrams: 28.4,
      craftsmanshipTechnique: "Micro-pavé setting with knife-edge gallery bridges"
    },
    gemstoneSpecs: {
      stoneType: "Type IIa Pear & Brilliant Cut Diamonds",
      caratWeight: 8.4,
      cut: "Modified Brilliant & Antique Pear Cascades",
      originProvenance: "Golconda Heritage Archival Alluvial Lot",
      certificationLab: "GIA Dossier Accredited"
    },
    diamondSpecs: {
      stoneType: "Certified Natural Diamonds",
      caratWeight: 8.4,
      clarity: "VVS1",
      color: "D Flawless"
    },
    editorialStory: "Drawing inspiration from the arched mehraab colonnades of royal darbar halls, these chandelier earrings feature cascading articulated pear diamonds suspended beneath sharp geometric platinum arches. Designed to catch chiaroscuro candlelight with zero static rigidity.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYVes8g6Q6CIGMpKHiBbBEUFLz4ga5Q1LfbftzEVAXT9qrjdbweVjNbivImLfCR4IOttvRwub1nsHBss6nHS0eLHyYg_v5UUlgL1zD5B4IUcmsWE6hIBRQxxPveZTfRdKtY-qYqNq2d20Qs-1LmFWxt3Rz-2rvEZu-Gl0Sy4JgyMThT_7mO1b4sDOIqFonVFiAvTaUqQRPyoNUgEnRfsrl2y0NVVBXuj51hYvunok",
        label: "Front Pair",
        alt: "Mehraab Pavé Drop Earrings resting on dark espresso velvet."
      }
    ]
  },
  {
    id: "nizam-royal-sapphire-ring",
    sku: "SVR-8911-RG",
    lotNumber: "Folio Lot • 0831",
    title: "The Nizam Royal Sapphire Ring",
    tagline: "Piece Unique • 14.2 Carat Untreated Velvet Blue",
    category: "Rings",
    categorySlug: "rings",
    collection: "Precious Gemstones",
    collectionSlug: "gemstones",
    subCollection: "The Nizam Treasury",
    priceINR: 6400000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Mumbai",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "950 Platinum & 18K Yellow Gold",
      purityAssay: "PT 950 Imperial Hallmark",
      netWeightGrams: 16.8,
      craftsmanshipTechnique: "Hand-fabricated dual-tone sovereign gallery"
    },
    gemstoneSpecs: {
      stoneType: "Unheated Kashmiri Cornflower Sapphire",
      caratWeight: 14.2,
      cut: "Cushion Antique Brilliant",
      originProvenance: "Old-Mine Kashmir (Paddar Valley Archival Provenance)",
      certificationLab: "SSEF Royal Pedigree & Gübelin Special Letter"
    },
    diamondSpecs: {
      stoneType: "Trapeze Step-Cut Diamonds",
      caratWeight: 2.8,
      clarity: "IF (Internally Flawless)",
      color: "D"
    },
    editorialStory: "Sourced from the legendary 19th-century veins of the Paddar Valley, this 14.2-carat sapphire possesses the characteristic velvety cornflower blue hue found exclusively in the finest Kashmir stones. Flanked by calibrated trapeze diamonds upon a bespoke hand-chiseled platinum cradle.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaorUkh1-kkyErZ4l_RtD3xUdUrMSsvrZjRqTZrvLE1i1uHTyJFgwgdF9TFu0YGmheC8EMo8aKeccJmVELRI7kv7kO3JXxVmsKAKYmBYRdTpQmGQv23b-P2-EHFZVZbn90pkhh_aPs2RXErj7lVXlWctrve2-4OD0j6s46BXH1NcF7dCAy0DiysX8tGIyR9aCILo3GohPELfm3yVpFfmjiI7Gwm25vlNe5mFDocFw",
        label: "Ring Display",
        alt: "The Nizam Royal Sapphire Ring illuminated on stone plinth."
      }
    ]
  },
  {
    id: "shikargah-silver-torc",
    sku: "SVR-7741-SL",
    lotNumber: "Folio Lot • 0741",
    title: "Shikargah Silver Torc",
    tagline: "Hallmarked 925 • Hand-Engraved Imperial Foliage",
    category: "Necklaces",
    categorySlug: "necklaces",
    collection: "Silver Jewellery",
    collectionSlug: "silver",
    subCollection: "Sterling & Moonlight",
    priceINR: 340000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Jaipur",
    isPieceUnique: false,
    isFeatured: true,
    bullionSpecs: {
      metal: "925 Sterling Silver & 22K Gold Foil Inlay",
      purityAssay: "Hallmarked 925 Sovereign Mark",
      netWeightGrams: 215.0,
      craftsmanshipTechnique: "Traditional Deep Repoussé & Champlevé Oxidization"
    },
    gemstoneSpecs: {
      stoneType: "Natural Cabochon Moonstones",
      caratWeight: 6.5,
      cut: "Smooth Domed Ovals",
      originProvenance: "Sri Lankan Archival Lot",
      certificationLab: "In-House Master Hallmark"
    },
    editorialStory: "A monumental neckpiece forged in solid sterling silver, depicting scenes from classical Mewari shikargah court scrolls. Flanked with deep relief carvings of running antelopes and stylized lotus leaves, treated with authentic herbal oxidization to produce nocturnal chiaroscuro contrast.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu3-WgukP7hAPOgoCMbQr0_KqJdLAj3BSDoZPmzT1Bck1BBIEob_aIURFBtN53BSqJVMmQ2Jt9E-oWPvYY9jMHOTs86p5zGdsA9Gm8tGyseE0x2MceSU23YVo9u_20GouActtb9b09AnJmSf3JWEyXeHfGxewu_wBV6UwofUskJpTEVFc9MGLK4fYrvuQZf0yWAlI-PIv7eQpSDYbP6uYRFGsluiiGUKpIGBdkjow",
        label: "Torc Profile",
        alt: "Shikargah Silver Torc resting upon raw obsidian stone."
      }
    ]
  },
  {
    id: "mayura-nizam-heirloom-bangle",
    sku: "SVR-8812-BG",
    lotNumber: "Folio Lot • 0812",
    title: "Mayura Nizam Heirloom Bangle",
    tagline: "22K Pure Bullion • Enamelled Chasing with Basra Pearls",
    category: "Bangles",
    categorySlug: "bangles",
    collection: "Royal Gold",
    collectionSlug: "royal-gold",
    subCollection: "The Golden Lineage",
    priceINR: 5800000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Mumbai",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "22K Royal Hallmarked Gold",
      purityAssay: "BIS 916 Royal Assay",
      netWeightGrams: 88.5,
      craftsmanshipTechnique: "Mughal Meenakari Enamelling & Chased Gold Terminals"
    },
    gemstoneSpecs: {
      stoneType: "Basra Seed Pearls & Syndicate Polki",
      caratWeight: 7.2,
      cut: "Natural Uncut Polki Diamonds",
      originProvenance: "Persian Gulf & Golconda Mines",
      certificationLab: "BIS & GIA Gemological Certificate"
    },
    editorialStory: "Twin peacock finials meet at the hinged closure of this substantial 22-karat gold kada. The inner circumference is decorated with royal cobalt blue and emerald-green champlevé enamel that remains cool and smooth against the patron's wrist.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk",
        label: "Bangle Vitrine",
        alt: "Mayura Nizam Heirloom Bangle on museum sandstone plinth."
      }
    ]
  },
  {
    id: "sultana-layered-cuff",
    sku: "SVR-7788-CF",
    lotNumber: "Folio Lot • 0788",
    title: "Sultana Layered Cuff",
    tagline: "925 Sterling • Architectural Hand-Hinged Structure",
    category: "Bracelets",
    categorySlug: "bracelets",
    collection: "Silver Jewellery",
    collectionSlug: "silver",
    subCollection: "Sterling & Moonlight",
    priceINR: 420000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — London",
    isPieceUnique: false,
    isFeatured: false,
    bullionSpecs: {
      metal: "925 Sovereign Sterling Silver",
      purityAssay: "Imperial Hallmark 925",
      netWeightGrams: 165.0,
      craftsmanshipTechnique: "Triple-hinged structural articulated band"
    },
    gemstoneSpecs: {
      stoneType: "Raw Spinel Crystals",
      caratWeight: 4.8,
      cut: "Natural Octahedral Crystal Faces",
      originProvenance: "Badakhshan Archival Sources",
      certificationLab: "Atelier Verified"
    },
    editorialStory: "Engineered with triple concealed hinges, the Sultana Cuff wraps the forearm like medieval sovereign armor. The brushed satin exterior is punctuated with natural octahedral spinel terminals set in raw blackened silver prongs.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu3-WgukP7hAPOgoCMbQr0_KqJdLAj3BSDoZPmzT1Bck1BBIEob_aIURFBtN53BSqJVMmQ2Jt9E-oWPvYY9jMHOTs86p5zGdsA9Gm8tGyseE0x2MceSU23YVo9u_20GouActtb9b09AnJmSf3JWEyXeHfGxewu_wBV6UwofUskJpTEVFc9MGLK4fYrvuQZf0yWAlI-PIv7eQpSDYbP6uYRFGsluiiGUKpIGBdkjow",
        label: "Cuff Angle",
        alt: "Sultana Layered Cuff in brushed sterling silver."
      }
    ]
  },
  {
    id: "kavach-talisman-pendant",
    sku: "SVR-7762-PD",
    lotNumber: "Folio Lot • 0762",
    title: "Kavach Talisman Pendant",
    tagline: "Blackened Sterling Silver & 22K Inset Solar Emblem",
    category: "Pendants",
    categorySlug: "pendants",
    collection: "Silver Jewellery",
    collectionSlug: "silver",
    subCollection: "Sterling & Moonlight",
    priceINR: 180000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Jaipur",
    isPieceUnique: false,
    isFeatured: false,
    bullionSpecs: {
      metal: "925 Sterling Silver & 22K Yellow Gold Plating",
      purityAssay: "925 Hallmarked",
      netWeightGrams: 52.0,
      craftsmanshipTechnique: "Hand-engraved Sanskrit solar mantras"
    },
    gemstoneSpecs: {
      stoneType: "Natural Star Ruby",
      caratWeight: 3.2,
      cut: "Asteriated Cabochon",
      originProvenance: "Southern Indian Shield",
      certificationLab: "Atelier Certified"
    },
    editorialStory: "Modeled after ancient royal protective amulets, the Kavach Talisman opens to reveal an inner silver compartment historically used for handwritten dynastic decrees. Anchored by a natural 6-ray star ruby.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk",
        label: "Pendant Detail",
        alt: "Kavach Talisman Pendant on dark velvet plinth."
      }
    ]
  },
  {
    id: "roopmati-polki-maang-tikka",
    sku: "SVR-8845-MT",
    lotNumber: "Folio Lot • 0845",
    title: "Roopmati Polki Maang Tikka",
    tagline: "Imperial Forehead Crest • Uncut Polki Diamonds & Colombian Emeralds",
    category: "Maang Tikka",
    categorySlug: "maang-tikka",
    collection: "High Jewellery",
    collectionSlug: "high-jewellery",
    subCollection: "The Jharokha Collection",
    priceINR: 3200000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Mumbai",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "22K Yellow Hallmarked Gold",
      purityAssay: "BIS 916 Royal Hallmark",
      netWeightGrams: 46.2,
      craftsmanshipTechnique: "Jadau Open-Back Polki Setting with Reverse Floral Enamel"
    },
    gemstoneSpecs: {
      stoneType: "Syndicate Polki Diamonds & Zambian Emerald Beads",
      caratWeight: 14.5,
      cut: "Natural Uncut Rose-Faceted Polki",
      originProvenance: "Golconda Mine Reserve Lot",
      certificationLab: "GIA Polki Identification Dossier"
    },
    editorialStory: "Crafted for imperial brides of sovereign royal houses, the Roopmati Maang Tikka features tiered crescent arcs of uncut Golconda polki diamonds crowned by a central teardrop emerald drop. The reverse side bears delicate lotus meenakari enamelling.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYLVUzoTiVYwpQJMUFYO4wcdH7CBYas-pxTCNLgiHSp6c8Yz_0rp8odnh_6xb_WLM6acxBiU8FTaSOPCelE0OY8Lxjx6REmLjB5RDNCxdC_b18MgKMKnYHdJyqqXBJKzs_psE8DAc9h2fzMW2Gnd4KNpo1-VzGrmf-J8p0L3d7lJiBowrxXYyJovODQ_dw9Or7cmYj0GhUTMKfQ20rOtNuEEwIPLJzEkYDbDS-csk",
        label: "Front Crest",
        alt: "Roopmati Polki Maang Tikka in 22K gold."
      }
    ]
  },
  {
    id: "rajputana-royal-mangalsutra",
    sku: "SVR-8890-MS",
    lotNumber: "Folio Lot • 0890",
    title: "Rajputana Royal Mangalsutra",
    tagline: "Sacred Heirlooms • 22K Gold, Black Spinel & Marquise Diamond",
    category: "Mangalsutra",
    categorySlug: "mangalsutra",
    collection: "Royal Gold",
    collectionSlug: "royal-gold",
    subCollection: "The Golden Lineage",
    priceINR: 1850000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Mumbai",
    isPieceUnique: false,
    isFeatured: true,
    bullionSpecs: {
      metal: "22K Antique Hallmarked Gold",
      purityAssay: "BIS 916 Certified",
      netWeightGrams: 38.5,
      craftsmanshipTechnique: "Hand-strung micro-bead wire with chased nakashi pendant"
    },
    gemstoneSpecs: {
      stoneType: "Faceted Black Spinel & Solitaire Marquise Diamond",
      caratWeight: 2.15,
      cut: "Marquise Brilliant & Micro-Faceted Spinel",
      originProvenance: "De Beers Code of Origin Certified",
      certificationLab: "IGI Diamond Guarantee"
    },
    editorialStory: "Elevating the sacred nuptial cord into haute joaillerie, this creation features double strands of hand-selected black spinel beads interspersed with 22-karat fluted gold globes, meeting at a central jharokha pendant with a floating marquise diamond.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk",
        label: "Mangalsutra Center",
        alt: "Rajputana Royal Mangalsutra in 22K gold."
      }
    ]
  },
  {
    id: "padmapriya-nizam-choker",
    sku: "SVR-8902-DX-2",
    lotNumber: "Folio Lot • 0820",
    title: "Padmapriya Nizam Choker",
    tagline: "22K Kundan Polki • Royal Court Bridal Collar",
    category: "Necklaces",
    categorySlug: "necklaces",
    collection: "High Jewellery",
    collectionSlug: "high-jewellery",
    subCollection: "The Nizam Treasury",
    priceINR: 21990500,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Hyderabad",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "22K Yellow Hallmarked Gold",
      purityAssay: "BIS 916 Royal Hallmark",
      netWeightGrams: 158.0,
      craftsmanshipTechnique: "Ancestral Jadau Setting with Natural Basra Pearls"
    },
    gemstoneSpecs: {
      stoneType: "Uncut Syndicate Polki & Zambian Emeralds",
      caratWeight: 38.5,
      cut: "Table-cut & Rose-Faceted Heritage Polki",
      originProvenance: "Nizam Hyderabad Palace Archive",
      certificationLab: "SSEF Royal Provenance Inscription"
    },
    editorialStory: "Commissioned to reflect the ceremonial magnificence of the Asaf Jahi dynasty, this choker presents seven graduated panels of flat-cut Golconda diamonds edged by natural Basra seed pearl tassels and vivid untreated emerald drops.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYLVUzoTiVYwpQJMUFYO4wcdH7CBYas-pxTCNLgiHSp6c8Yz_0rp8odnh_6xb_WLM6acxBiU8FTaSOPCelE0OY8Lxjx6REmLjB5RDNCxdC_b18MgKMKnYHdJyqqXBJKzs_psE8DAc9h2fzMW2Gnd4KNpo1-VzGrmf-J8p0L3d7lJiBowrxXYyJovODQ_dw9Or7cmYj0GhUTMKfQ20rOtNuEEwIPLJzEkYDbDS-csk",
        label: "Choker Display",
        alt: "Padmapriya Nizam Choker laid flat."
      }
    ]
  },
  {
    id: "noor-e-nazar-solitaire-ring",
    sku: "SVR-9004-RG",
    lotNumber: "Folio Lot • 0904",
    title: "Noor-e-Nazar Solitaire Ring",
    tagline: "Sovereign Solitaires • 5.10 ct Type IIa Cushion Diamond",
    category: "Rings",
    categorySlug: "rings",
    collection: "Signature Collections",
    collectionSlug: "signature",
    subCollection: "Sovereign Solitaires",
    priceINR: 11200000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — London",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "Platinum PT950 with 18K Yellow Prongs",
      purityAssay: "PT950 & 750 Stamped",
      netWeightGrams: 11.2,
      craftsmanshipTechnique: "Micro-sculpted architectural crown setting"
    },
    gemstoneSpecs: {
      stoneType: "Type IIa Golconda Characteristic Diamond",
      caratWeight: 5.10,
      cut: "Old Mine Cushion Brilliant",
      originProvenance: "Golconda Heritage Provenance",
      certificationLab: "GIA Certified D Flawless Type IIa"
    },
    editorialStory: "Possessing chemical purity that allows light to travel completely uninhibited, this 5.10-carat Type IIa diamond represents the pinnacle of sovereign solitaire rings. Set within a low-profile architectural bezel that honors the original stone's natural geometry.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnsmVxxHxfRVgYLX2MhTHQJ08Ti2XEU-d4ipuGcbiiu7tkFffDBAJvIvW8suTqwXZpJCKdcoxGTBcJemDq1FdMn14pmDUzKP9luU0Un2ZSYHLZCqwbkX6XT1MNeABdsdd-a7MqsJtitlVr3pq7iDtkXcVPtS_9PNnkUeaA_w2uhJJAeH9QLUJz3bL0LrJdVVv1xWa_f_5jXSLXPH2YLfnnqVabyiPTy0hhY8-vOgs",
        label: "Solitaire Macro",
        alt: "Noor-e-Nazar Solitaire Ring resting on weathered stone plinth."
      }
    ]
  },
  {
    id: "chausath-yogini-archival-cuff",
    sku: "SVR-8877-CF",
    lotNumber: "Folio Lot • 0877",
    title: "Chausath Yogini Archival Cuff",
    tagline: "House IV • 24K Minted Gold with Constellation Diamonds",
    category: "Bracelets",
    categorySlug: "bracelets",
    collection: "Signature Collections",
    collectionSlug: "signature",
    subCollection: "The Chausath Parure",
    priceINR: 7600000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — New Delhi",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "24K Fine Gold Surface upon 22K Structural Core",
      purityAssay: "999 Fine Gold Assay Overlay",
      netWeightGrams: 118.0,
      craftsmanshipTechnique: "Hand-hammered repoussé reflecting circular temple geometries"
    },
    gemstoneSpecs: {
      stoneType: "Starlight Rose-Cut Diamonds",
      caratWeight: 9.8,
      cut: "Circular Geometric Rose-Cuts",
      originProvenance: "Historical Panna & Golconda Basin",
      certificationLab: "Atelier Heritage Dossier"
    },
    editorialStory: "Inspired by the open-sky circular architecture of the 9th-century Chausath Yogini temple in Mitawali. Sixty-four flush-mounted rose-cut diamonds track celestial positions across a textured, hand-hammered 24-karat gold ground.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk",
        label: "Cuff Perspective",
        alt: "Chausath Yogini Archival Cuff in 24K pure gold."
      }
    ]
  },
  {
    id: "mewari-pearl-hansli",
    sku: "SVR-8833-HN",
    lotNumber: "Folio Lot • 0833",
    title: "Mewari Pearl Hansli",
    tagline: "Royal Gold • Solid 22K Torque with Basra Pearls",
    category: "Necklaces",
    categorySlug: "necklaces",
    collection: "Royal Gold",
    collectionSlug: "royal-gold",
    subCollection: "The Golden Lineage",
    priceINR: 8800000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Udaipur",
    isPieceUnique: true,
    isFeatured: false,
    bullionSpecs: {
      metal: "22K Solid Yellow Gold",
      purityAssay: "BIS 916 Hallmarked",
      netWeightGrams: 172.0,
      craftsmanshipTechnique: "Seamless forged torque with hand-chased terminal caps"
    },
    gemstoneSpecs: {
      stoneType: "Graduated Basra Natural Pearls",
      caratWeight: 44.0,
      cut: "Spherical & Drop Natural Pearls",
      originProvenance: "Historical Royal Mewar Depository",
      certificationLab: "SSEF Pearl Report"
    },
    editorialStory: "The hansli represents the most sovereign torque collar form of Rajasthan. Forged from solid 22-karat gold with graduated terminal caps encasing rare Basra natural pearls collected over three generations.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnnd3GW01c5g5RCGEKX_FJRUt1YDUAwX__3N_sWDM6-IQnjngcDdr8CMrCroaH4eyWUoFIebFJaO-mmHmco4L9gAUVU4g47TMXoFJZpb910O7RyDkn5UljR-aba2AgKtntKGjrVr3haBN8u1x9ZCTM4BoYBjT3GnQaQReZR0EAjtahMufKo41VScaBOuwK1c8vOTD5YyslI0O_apvnYwdC5QVoDGssWnWGwZraaXw",
        label: "Hansli Vitrine",
        alt: "Mewari Pearl Hansli in 22K gold."
      }
    ]
  },
  {
    id: "chandra-rekha-diamond-bangle",
    sku: "SVR-8822-BG",
    lotNumber: "Folio Lot • 0822",
    title: "Chandra Rekha Diamond Bangle",
    tagline: "High Jewellery • Channel-Set Golconda Rose Cuts in 18K Gold",
    category: "Bangles",
    categorySlug: "bangles",
    collection: "High Jewellery",
    collectionSlug: "high-jewellery",
    subCollection: "Sovereign Solitaires",
    priceINR: 4800000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — London",
    isPieceUnique: false,
    isFeatured: false,
    bullionSpecs: {
      metal: "18K Champagne Gold",
      purityAssay: "750 Fineness Assayed",
      netWeightGrams: 54.0,
      craftsmanshipTechnique: "Seamless channel setting with concealed pressure latch"
    },
    gemstoneSpecs: {
      stoneType: "Rose-Cut Golconda Diamonds",
      caratWeight: 12.4,
      cut: "Calibrated Circular Rose-Cuts",
      originProvenance: "Old-Mine Heritage Diamond Lot",
      certificationLab: "GIA Certified"
    },
    editorialStory: "A slender arc of lunar light. Calibrated rose-cut diamonds are set continuously without visible prongs along a knife-edge ribbon of antique champagne gold.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk",
        label: "Bangle Angle",
        alt: "Chandra Rekha Diamond Bangle."
      }
    ]
  },
  {
    id: "zamorin-emerald-drop-brooch",
    sku: "SVR-9012-PD",
    lotNumber: "Folio Lot • 0912",
    title: "Zamorin Emerald Drop Brooch",
    tagline: "Piece Unique • 26.5 ct Old-Mine Muzo Emerald & Rose Diamonds",
    category: "Pendants",
    categorySlug: "pendants",
    collection: "Precious Gemstones",
    collectionSlug: "gemstones",
    subCollection: "The Nizam Treasury",
    priceINR: 9200000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Mumbai",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "18K Yellow Gold & Platinum",
      purityAssay: "Dual Sovereign Hallmark",
      netWeightGrams: 42.0,
      craftsmanshipTechnique: "Articulated pendant conversion mechanism (wearable as Brooch or Pendant)"
    },
    gemstoneSpecs: {
      stoneType: "Untreated Muzo Colombian Emerald",
      caratWeight: 26.5,
      cut: "Pear-Shaped Step Cut",
      originProvenance: "Historic Calicut Zamorin Treasury Provenance",
      certificationLab: "Gübelin Gem Lab Lucerne"
    },
    editorialStory: "Acquired from an ancestral private collection traced to the Zamorin rulers of Calicut, this deep forest emerald brooch features a detachable suspension loop enabling conversion into a regal pendant.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaorUkh1-kkyErZ4l_RtD3xUdUrMSsvrZjRqTZrvLE1i1uHTyJFgwgdF9TFu0YGmheC8EMo8aKeccJmVELRI7kv7kO3JXxVmsKAKYmBYRdTpQmGQv23b-P2-EHFZVZbn90pkhh_aPs2RXErj7lVXlWctrve2-4OD0j6s46BXH1NcF7dCAy0DiysX8tGIyR9aCILo3GohPELfm3yVpFfmjiI7Gwm25vlNe5mFDocFw",
        label: "Brooch Display",
        alt: "Zamorin Emerald Drop Brooch on dark plinth."
      }
    ]
  },
  {
    id: "hawa-mahal-filigree-earrings",
    sku: "SVR-7734-ER",
    lotNumber: "Folio Lot • 0734",
    title: "Hawa Mahal Filigree Earrings",
    tagline: "925 Sterling & Gold Vermeil • Pierced Wind Screen Motifs",
    category: "Earrings",
    categorySlug: "earrings",
    collection: "Silver Jewellery",
    collectionSlug: "silver",
    subCollection: "Sterling & Moonlight",
    priceINR: 260000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Jaipur",
    isPieceUnique: false,
    isFeatured: false,
    bullionSpecs: {
      metal: "925 Sterling Silver with 24K Micro-Gilt Vermeil",
      purityAssay: "925 Sovereign Stamp",
      netWeightGrams: 22.4,
      craftsmanshipTechnique: "Micron-fine filigree wirework"
    },
    gemstoneSpecs: {
      stoneType: "Natural Seed Pearls",
      caratWeight: 3.8,
      cut: "Natural Baroque Pearls",
      originProvenance: "Basra Archival Strain",
      certificationLab: "Atelier Authenticated"
    },
    editorialStory: "Echoing the 953 jharokhas of Jaipur's Palace of Winds, these lightweight filigree earrings permit breezes to flow through hand-twisted gold-gilt silver wires, tipped with natural seed pearls.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYVes8g6Q6CIGMpKHiBbBEUFLz4ga5Q1LfbftzEVAXT9qrjdbweVjNbivImLfCR4IOttvRwub1nsHBss6nHS0eLHyYg_v5UUlgL1zD5B4IUcmsWE6hIBRQxxPveZTfRdKtY-qYqNq2d20Qs-1LmFWxt3Rz-2rvEZu-Gl0Sy4JgyMThT_7mO1b4sDOIqFonVFiAvTaUqQRPyoNUgEnRfsrl2y0NVVBXuj51hYvunok",
        label: "Filigree Pair",
        alt: "Hawa Mahal Filigree Earrings."
      }
    ]
  },
  {
    id: "maharani-imperial-bridal-suite",
    sku: "SVR-9100-BD",
    lotNumber: "Folio Lot • 0900",
    title: "Maharani Imperial Royal Bridal Parure Suite",
    tagline: "Complete 7-Piece Imperial Trousseau • Polki, Basra Pearls & 22K Gold [DEMO]",
    category: "Bridal Jewellery",
    categorySlug: "bridal-jewellery",
    collection: "High Jewellery",
    collectionSlug: "high-jewellery",
    subCollection: "The Royal Wedding Trousseau",
    priceINR: 32000000,
    isPriceOnEnquiry: false,
    inVaultLocation: "Vault — Jaipur",
    isPieceUnique: true,
    isFeatured: true,
    bullionSpecs: {
      metal: "22K & 24K Kundan Gold",
      purityAssay: "BIS 916 Sovereign Imperial Hallmark [Demo Assay]",
      netWeightGrams: 480.0,
      craftsmanshipTechnique: "Jaipur Jadau, Meenakari Enamelling & Chased Repoussé"
    },
    gemstoneSpecs: {
      stoneType: "Syndicate Polki Diamonds & Natural Emerald Beads [Demo Spec]",
      caratWeight: 112.0,
      cut: "Natural Uncut Rose-Faceted Polki",
      originProvenance: "Imperial Treasury Reserve [Demo]",
      certificationLab: "Royal Gemological Federation Record [Demo]"
    },
    editorialStory: "[DEMO SHOWCASE] The crowning glory of the SOVIRA atelier: a grand bridal suite comprising an imperial choker, matching jhumkhas, maang tikka, hathphool cuffs, and royal nath.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
        label: "Bridal Suite Overview",
        alt: "Maharani Imperial Royal Bridal Parure Suite."
      }
    ]
  }
];

// Helper to format Indian Rupees cleanly (e.g. ₹ 1,85,00,000)
export function formatINR(val) {
  if (typeof val !== "number") return val;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val).replace("INR", "₹").trim();
}
