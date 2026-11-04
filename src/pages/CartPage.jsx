import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatINR, FALLBACK_JEWELRY_IMAGE } from "../data/products";

export default function CartPage({ onOpenSalon }) {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotalINR,
    gstINR,
    totalValuationINR,
    reservationClock,
    isReservationActive
  } = useCart();

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 1. Top Sovereign Reservation Ambient Status (Screen 9) */}
      <div className="bg-surface-container-lowest px-6 md:px-16 py-3.5 border-b border-primary/10 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0"></span>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-xs uppercase tracking-widest text-primary truncate">
              Vault Reservation Active
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant truncate">
              Held exclusively in high security custody for your gaze
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 border border-primary/20 shrink-0">
          <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
          <span className="font-label-md text-sm text-primary font-medium tracking-wider font-mono">
            {reservationClock}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 w-full flex flex-col gap-8">
        {/* Folio Metadata */}
        <div className="flex flex-col gap-1 pb-4 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-secondary">
              Acquisition Folio
            </span>
            <span className="font-label-sm text-xs uppercase tracking-widest text-primary bg-secondary-container/40 px-2.5 py-1 border border-primary/20">
              {cartItems.length} Vault Pieces
            </span>
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            Sovereign Bag
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Archived heirloom specimens held in climate-controlled isolation prior to white-glove dispatch or private salon viewing.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low border border-primary/15 p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
            </div>
            <h2 className="font-headline-sm text-on-surface">Your Acquisition Bag is Empty</h2>
            <p className="font-body-sm text-secondary max-w-md leading-relaxed">
              Explore the museum vitrines of our High Jewellery, Royal Gold, or Rare Gemstone suites to reserve creations into your folio.
            </p>
            <Link
              to="/collections"
              className="mt-4 px-8 py-3.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest font-semibold hover:bg-primary-fixed transition-colors"
            >
              Explore The Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Reserved Curated Pieces List (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {cartItems.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="bg-surface-container-low p-5 border border-primary/15 flex flex-col gap-4 shadow-sm relative overflow-hidden"
                >
                  <div className="flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-32 md:w-28 md:h-36 flex-shrink-0 bg-surface-container-lowest overflow-hidden border border-primary/10">
                      <img
                        src={product.images?.[0]?.url || FALLBACK_JEWELRY_IMAGE}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-surface-container-lowest/90 text-primary font-label-sm text-[8px] px-1.5 py-0.5 uppercase tracking-wider">
                        Masterwork
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 min-w-0 justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                            {product.lotNumber}
                          </span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            aria-label="Release lot from reservation"
                            className="text-on-surface-variant hover:text-error transition-colors p-1"
                          >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                          </button>
                        </div>

                        <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                          <h2 className="font-headline-sm text-base md:text-lg text-on-surface leading-tight mt-1">
                            {product.title}
                          </h2>
                        </Link>

                        <p className="font-body-sm text-xs text-secondary mt-1">
                          {product.bullionSpecs?.metal} • {product.gemstoneSpecs?.stoneType || "Natural Gem"}
                        </p>
                      </div>

                      <div className="mt-4 flex items-baseline justify-between border-t border-primary/10 pt-2">
                        <span className="font-headline-sm text-base md:text-lg text-primary font-medium">
                          {formatINR(product.priceINR * quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-surface-container px-2 py-1 border border-primary/20">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-secondary hover:text-primary"
                          >
                            -
                          </button>
                          <span className="font-label-sm text-xs font-mono text-on-surface px-1">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-secondary hover:text-primary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Tiers */}
                  <div className="pt-2 flex items-center justify-between gap-2 bg-surface-container-lowest/60 p-2.5 border border-primary/10">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                      <span className="font-label-sm text-[10px] uppercase tracking-wider">
                        {product.gemstoneSpecs?.certificationLab || "Royal Assay Sealed"}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenSalon(product.title)}
                      className="font-label-sm text-[11px] text-primary uppercase tracking-widest hover:text-primary-fixed transition-colors underline underline-offset-4 flex items-center gap-1"
                    >
                      <span>Request Salon Viewing</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Right: Financial Valuation Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-low p-6 border border-primary/20 flex flex-col gap-5">
                <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary pb-2 border-b border-primary/15">
                  Folio Valuation Settlement
                </span>

                <div className="flex flex-col gap-3 font-body-sm text-sm">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Acquisition Subtotal</span>
                    <span className="font-label-md text-sm text-on-surface font-mono">
                      {formatINR(subtotalINR)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="flex items-center gap-1.5">
                      <span>Sovereign Transit & Lloyds Insurance</span>
                      <span className="material-symbols-outlined text-[14px] text-primary">info</span>
                    </span>
                    <span className="font-label-sm text-xs uppercase tracking-wider text-primary">
                      Complimentary
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Bullion & Gemstone GST (3%)</span>
                    <span className="font-label-md text-sm text-on-surface font-mono">
                      {formatINR(gstINR)}
                    </span>
                  </div>
                </div>

                {/* Total Valuation Plinth */}
                <div className="pt-4 border-t border-primary/20 bg-surface-container-lowest p-4 border border-primary/15 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-secondary">
                      Total Acquisition Valuation
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      Duties & White-Glove Transit Included
                    </span>
                  </div>
                  <span className="font-headline-sm text-xl text-primary font-medium">
                    {formatINR(totalValuationINR)}
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-primary text-on-primary py-4 px-6 uppercase font-label-md text-label-md tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>Proceed to Secure Acquisition</span>
                  </button>

                  <Link
                    to="/collections"
                    className="w-full bg-surface-container py-3 px-6 uppercase font-label-md text-xs tracking-[0.2em] text-center text-secondary hover:text-primary hover:bg-surface-container-high transition-colors border border-primary/10"
                  >
                    Continue Curating Archives
                  </Link>
                </div>
              </div>

              {/* Security & Discretion Assurances */}
              <div className="p-5 bg-surface-container-lowest border border-primary/15 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-6 text-secondary text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">enhanced_encryption</span>
                    <span className="font-label-sm text-[10px] uppercase tracking-wider">256-Bit Sovereign Enclave</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">lock_clock</span>
                    <span className="font-label-sm text-[10px] uppercase tracking-wider">Private Discretion</span>
                  </div>
                </div>

                <p className="font-body-sm text-[11px] text-on-surface-variant text-center leading-relaxed">
                  SOVIRA Client Liaison guarantees absolute non-disclosure of your collection acquisitions across global banking & customs registries.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
