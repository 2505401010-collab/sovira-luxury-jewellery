import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatINR, FALLBACK_JEWELRY_IMAGE } from "../data/products";

export default function WishlistPage({ onOpenSalon, onOpenConcierge }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col w-full text-on-surface">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 w-full flex flex-col gap-8">
        {/* Header (Screen 13) */}
        <div className="flex flex-col gap-2 pb-4 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
              Confidential Vault Archive
            </span>
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-normal tracking-wide">
            Your Private Folio <span className="text-primary font-light text-2xl">({wishlist.length} Pieces)</span>
          </h1>
          <p className="font-body-md text-on-surface-variant leading-relaxed max-w-xl">
            Saved creations are reserved for your private gaze. To schedule an armored viewing or request a confidential dossier, engage our salon concierge.
          </p>
        </div>

        {/* Assigned Private Liaison Card */}
        <div className="bg-surface-container-high border border-primary/20 p-4 md:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-surface-container flex items-center justify-center text-primary border border-primary/30">
              <span className="material-symbols-outlined text-[22px]">shield_person</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-secondary">
                Assigned Private Liaison
              </span>
              <span className="font-headline-sm text-base text-on-surface">
                Devika Rathore — Mumbai Salon Suite
              </span>
            </div>
          </div>
          <button
            onClick={onOpenConcierge}
            aria-label="Direct encrypted call"
            className="bg-surface-container text-primary hover:text-primary-fixed w-10 h-10 flex items-center justify-center transition-colors border border-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </button>
        </div>

        {/* Wishlist Items List */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low border border-primary/15 p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-[32px]">favorite</span>
            </div>
            <h2 className="font-headline-sm text-on-surface">Your Folio Holds No Saved Pieces</h2>
            <p className="font-body-sm text-secondary max-w-md">
              Tap the heart icon on any high-jewellery vitrine to reserve masterworks for private inspection.
            </p>
            <Link
              to="/collections"
              className="mt-4 px-8 py-3.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest font-semibold hover:bg-primary-fixed transition-colors"
            >
              Explore The Collections
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {wishlist.map((item) => (
              <article
                key={item.id}
                className="bg-surface-container-low border border-primary/20 overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                  {/* Photo Vitrine (5 cols) */}
                  <div className="md:col-span-5 relative aspect-[4/5] bg-surface-container-lowest overflow-hidden border border-primary/10">
                    <img
                      src={item.images?.[0]?.url || FALLBACK_JEWELRY_IMAGE}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-[9px] uppercase tracking-widest px-2.5 py-1 border border-primary/20">
                        {item.isPieceUnique ? "Unique Piece 01/01" : item.lotNumber}
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-[9px] uppercase tracking-widest px-2.5 py-1 border border-primary/10 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[11px] text-primary">pin_drop</span>
                        {item.inVaultLocation || "In Vault — Mumbai"}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label="Remove item"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface-variant hover:text-error flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  {/* Details & Actions (7 cols) */}
                  <div className="md:col-span-7 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs font-label-sm uppercase tracking-widest text-primary">
                        <span>{item.category} • {item.collection}</span>
                        <span className="font-mono">{item.sku}</span>
                      </div>

                      <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h2 className="font-headline-sm text-xl text-on-surface">
                          {item.title}
                        </h2>
                      </Link>

                      <p className="font-body-sm text-xs text-secondary leading-relaxed font-light">
                        {item.tagline}
                      </p>

                      <div className="p-3 bg-surface-container border border-primary/10 text-xs flex flex-col gap-1 mt-2">
                        <div className="flex justify-between">
                          <span className="text-secondary">Bullion Purity:</span>
                          <span className="text-on-surface">{item.bullionSpecs?.metal || "22K Royal Gold"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Gemstone Origin:</span>
                          <span className="text-on-surface">{item.gemstoneSpecs?.originProvenance || "Archival Source"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Certification:</span>
                          <span className="text-primary">{item.gemstoneSpecs?.certificationLab || "Gübelin / GIA"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-primary/10 flex flex-col gap-3">
                      <div className="flex items-baseline justify-between">
                        <span className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                          Acquisition Valuation
                        </span>
                        <span className="font-headline-sm text-xl text-primary font-medium">
                          {formatINR(item.priceINR)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            addToCart(item, 1);
                            alert(`"${item.title}" reserved into your Sovereign Bag.`);
                          }}
                          className="py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-semibold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                          <span>Acquire into Bag</span>
                        </button>

                        <button
                          onClick={() => onOpenSalon(item.title)}
                          className="py-3 bg-surface-container-high border border-primary/20 text-on-surface hover:text-primary font-label-md text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-primary text-[16px]">calendar_month</span>
                          <span>Salon Viewing</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
