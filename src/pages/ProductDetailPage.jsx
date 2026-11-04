import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PRODUCTS, formatINR, FALLBACK_JEWELRY_IMAGE } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetailPage({ onOpenSalon, onOpenConcierge }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [acquiredSuccess, setAcquiredSuccess] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: FALLBACK_JEWELRY_IMAGE, label: "Vitrine View", alt: product.title }];

  const currentImage = images[activeImageIndex]?.url || FALLBACK_JEWELRY_IMAGE;
  const isFavorited = isInWishlist(product.id);

  const handleAcquire = () => {
    addToCart(product, 1);
    setAcquiredSuccess(true);
    setTimeout(() => {
      navigate("/bag");
    }, 700);
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 1. Archival Breadcrumb & Vault Registry Notice (Screen 7) */}
      <div className="px-6 md:px-16 py-3.5 flex items-center justify-between bg-surface-container-lowest text-on-surface-variant border-b border-primary/10">
        <div className="flex items-center gap-2 font-label-sm text-xs uppercase tracking-widest text-secondary">
          <Link to="/collections" className="hover:text-primary transition-colors">Treasury</Link>
          <span className="text-outline-variant">/</span>
          <Link to={`/category/${product.categorySlug}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary truncate max-w-[200px]">{product.title}</span>
        </div>
        <div className="flex items-center gap-2 font-label-sm text-xs tracking-wider text-outline">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="uppercase">{product.isPieceUnique ? "Piece Unique No. 01/01" : product.lotNumber}</span>
        </div>
      </div>

      {/* Main Dossier Grid (Desktop 2-column layout, responsive mobile stack) */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col: Imagery Showcase & Macro Carousel (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Viewport */}
          <div className="relative w-full aspect-[4/5] bg-surface-container-lowest border border-primary/20 overflow-hidden flex items-center justify-center shadow-2xl">
            <img
              src={currentImage}
              alt={product.title}
              className={`w-full h-full object-cover transition-all duration-700 ease-out cursor-pointer ${
                isZoomed ? "scale-125" : "scale-100"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Provenance Hallmark Badge Overlay */}
            <div className="absolute top-4 left-4 bg-surface-container-lowest/85 backdrop-blur-md px-3.5 py-1.5 border border-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
              <span className="font-label-sm text-xs text-secondary tracking-widest uppercase">
                {product.gemstoneSpecs?.certificationLab || "Gübelin Certified"}
              </span>
            </div>

            {/* Macro Zoom Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-center text-primary shadow-md hover:text-primary-fixed border border-primary/20 transition-colors"
              title="Toggle Macro Zoom"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isZoomed ? "zoom_out" : "zoom_in"}
              </span>
            </button>

            {/* Pagination Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-surface-container-lowest/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeImageIndex === i ? "bg-primary w-4" : "bg-outline-variant"
                    }`}
                  ></button>
                ))}
              </div>
            )}
          </div>

          {/* Craftsmanship Angle Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`group relative aspect-square bg-surface-container overflow-hidden p-1 transition-all duration-300 border ${
                    activeImageIndex === i
                      ? "border-primary bg-surface-container-high"
                      : "border-primary/15 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-1 text-center font-label-sm text-[10px] uppercase tracking-wider text-secondary bg-surface-container-lowest/85 py-0.5">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Curatorial Story narrative */}
          <div className="mt-6 p-6 bg-surface-container-low border border-primary/10 flex flex-col gap-3">
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
              The Art of Sovereign Metal
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Craftsmanship & Lapidary Lineage
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
              {product.editorialStory}
            </p>
          </div>
        </div>

        {/* Right Col: Valuation, Actions & Bento Specs (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Header & Titles */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-label-sm uppercase tracking-widest text-secondary">
              <span>{product.collection}</span>
              <span className="text-primary">{product.lotNumber}</span>
            </div>

            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight font-normal">
              {product.title}
            </h1>

            <p className="font-body-sm text-secondary font-light">
              {product.tagline}
            </p>
            <p className="font-mono text-xs text-outline tracking-wider uppercase mt-1">
              Vault Ref: {product.sku}
            </p>
          </div>

          {/* Valuation Plinth */}
          <div className="bg-surface-container-low p-6 border-y border-primary/20 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-secondary uppercase tracking-widest">
              Declared Acquisition Valuation
            </span>
            <div className="font-display-lg-mobile text-display-lg-mobile text-primary font-medium tracking-normal">
              {formatINR(product.priceINR)}
            </div>
            <p className="font-body-sm text-xs text-outline-variant font-light">
              Inclusive of 3% bullion duties, royal hallmarking & insured white-glove transit to private residence or salon.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAcquire}
              className={`w-full h-14 uppercase font-label-md text-label-md tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
                acquiredSuccess
                  ? "bg-green-800 text-white"
                  : "bg-primary hover:bg-primary-fixed text-on-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>{acquiredSuccess ? "Acquired — Opening Folio..." : "Acquire Object into Bag"}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onOpenSalon(product.title)}
                className="h-12 bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm tracking-[0.16em] uppercase flex items-center justify-center gap-1.5 transition-colors border border-primary/20"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
                <span>Salon Viewing</span>
              </button>

              <button
                onClick={() => setShowDossierModal(true)}
                className="h-12 bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm tracking-[0.16em] uppercase flex items-center justify-center gap-1.5 transition-colors border border-primary/20"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">description</span>
                <span>Gem Dossier (PDF)</span>
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="py-2.5 text-xs text-center uppercase tracking-widest text-secondary hover:text-primary flex items-center justify-center gap-1.5 transition-colors mt-1"
            >
              <span className={`material-symbols-outlined text-[16px] ${isFavorited ? "text-primary" : ""}`}>
                favorite
              </span>
              <span>{isFavorited ? "In Your Saved Folio" : "Save to Private Wishlist Folio"}</span>
            </button>
          </div>

          {/* Bento-Style Gemological Specifications Panel */}
          <div className="bg-surface-container-low p-6 border border-primary/15 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-primary/10">
              <div className="flex flex-col">
                <span className="font-label-sm text-xs uppercase tracking-[0.22em] text-primary font-medium">
                  Curatorial Assay
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Gemological Specifications
                </h2>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[24px]">balance</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Spec 1: Metal */}
              <div className="p-3.5 bg-surface-container flex flex-col gap-1 border border-primary/10">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[17px]">architecture</span>
                  <span className="font-label-sm text-[10px] tracking-widest uppercase text-secondary">
                    Precious Metal
                  </span>
                </div>
                <span className="font-headline-sm text-[15px] text-on-surface leading-tight">
                  {product.bullionSpecs?.metal || "22K Royal Gold"}
                </span>
                <span className="font-body-sm text-[11px] text-outline leading-snug">
                  {product.bullionSpecs?.netWeightGrams ? `${product.bullionSpecs.netWeightGrams}g Net Weight • ` : ""}
                  {product.bullionSpecs?.purityAssay || "BIS 916 Stamped"}
                </span>
              </div>

              {/* Spec 2: Center Stone */}
              <div className="p-3.5 bg-surface-container flex flex-col gap-1 border border-primary/10">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[17px]">diamond</span>
                  <span className="font-label-sm text-[10px] tracking-widest uppercase text-secondary">
                    Focal Gemstone
                  </span>
                </div>
                <span className="font-headline-sm text-[15px] text-on-surface leading-tight">
                  {product.gemstoneSpecs?.stoneType || "Rare Certified Gemstone"}
                </span>
                <span className="font-body-sm text-[11px] text-outline leading-snug">
                  {product.gemstoneSpecs?.caratWeight ? `${product.gemstoneSpecs.caratWeight} ct • ` : ""}
                  {product.gemstoneSpecs?.originProvenance || "Archival Source"}
                </span>
              </div>

              {/* Spec 3: Diamonds */}
              <div className="p-3.5 bg-surface-container flex flex-col gap-1 border border-primary/10">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[17px]">flare</span>
                  <span className="font-label-sm text-[10px] tracking-widest uppercase text-secondary">
                    Diamond Pavé
                  </span>
                </div>
                <span className="font-headline-sm text-[15px] text-on-surface leading-tight">
                  {product.diamondSpecs?.stoneType || "Golconda Rose-Cuts"}
                </span>
                <span className="font-body-sm text-[11px] text-outline leading-snug">
                  {product.diamondSpecs?.caratWeight ? `${product.diamondSpecs.caratWeight} ct Total • ` : ""}
                  {product.diamondSpecs?.clarity || "VVS1 Antique Cut"}
                </span>
              </div>

              {/* Spec 4: Certification */}
              <div className="p-3.5 bg-surface-container flex flex-col gap-1 border border-primary/10">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[17px]">verified_user</span>
                  <span className="font-label-sm text-[10px] tracking-widest uppercase text-secondary">
                    Accreditation
                  </span>
                </div>
                <span className="font-headline-sm text-[15px] text-on-surface leading-tight">
                  {product.gemstoneSpecs?.certificationLab || "Gübelin / GIA"}
                </span>
                <span className="font-body-sm text-[11px] text-outline leading-snug">
                  Inscribed Gem Portrait & Lucerne Archival Vault Record
                </span>
              </div>
            </div>
          </div>

          {/* Diplomatic Escrow Assurance */}
          <div className="p-4 bg-surface-container-lowest border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface">
                  Diplomatic Transit Escrow
                </span>
                <span className="text-[11px] text-secondary">
                  Thermal-tamper sealed beryllium vault casing • 100% Lloyds Syndicate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gem Dossier Modal Simulation */}
      {showDossierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md">
          <div className="bg-surface-container-low border border-primary/30 p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-primary/20">
              <span className="font-label-md text-label-md uppercase tracking-widest text-primary">
                Gemological Dossier • Lucerne Archive
              </span>
              <button
                onClick={() => setShowDossierModal(false)}
                className="text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 bg-surface-container border border-primary/10 font-mono text-xs text-on-surface flex flex-col gap-1.5">
              <div className="text-primary font-bold">SOVIRA ATELIER ARCHIVE CERTIFICATE</div>
              <div>SKU: {product.sku}</div>
              <div>TITLE: {product.title}</div>
              <div>ASSAY: {product.bullionSpecs?.purityAssay}</div>
              <div>CENTER GEM: {product.gemstoneSpecs?.stoneType} ({product.gemstoneSpecs?.caratWeight} ct)</div>
              <div>LAB ACCREDITATION: {product.gemstoneSpecs?.certificationLab}</div>
              <div>STATUS: Sealed & Authenticated in High Vault</div>
            </div>
            <button
              onClick={() => {
                alert("The confidential PDF Gem Dossier has been compiled and downloaded for your records.");
                setShowDossierModal(false);
              }}
              className="w-full py-3 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-fixed transition-colors text-center"
            >
              Download Encrypted PDF Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
