import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatINR, FALLBACK_JEWELRY_IMAGE } from "../../data/products";

export default function ProductCard({ product, onOpenSalon }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imgSrc, setImgSrc] = useState(product.images?.[0]?.url || FALLBACK_JEWELRY_IMAGE);
  const [acquiredToast, setAcquiredToast] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAcquire = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAcquiredToast(true);
    setTimeout(() => setAcquiredToast(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group bg-surface-container-low border border-primary/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-primary/40 hover:bg-surface-container">
      {/* Visual Vitrine */}
      <Link to={`/product/${product.id}`} className="relative w-full aspect-[4/5] bg-surface-container-lowest overflow-hidden block">
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc(FALLBACK_JEWELRY_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent opacity-60"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.isPieceUnique && (
            <span className="bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-[9px] uppercase tracking-widest px-2 py-0.5 border border-primary/20">
              Piece Unique
            </span>
          )}
          <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-[9px] uppercase tracking-widest px-2 py-0.5 border border-primary/10">
            {product.lotNumber}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorited ? "Remove from folio" : "Add to folio"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-md ${
            isFavorited
              ? "bg-primary text-on-primary"
              : "bg-surface-container-lowest/80 text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className={`material-symbols-outlined text-[18px] ${isFavorited ? "fill-current" : ""}`}>
            favorite
          </span>
        </button>

        {/* Vault Origin Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="font-label-sm text-[10px] uppercase tracking-widest text-secondary/80 bg-surface-container-lowest/90 px-2 py-0.5">
            {product.inVaultLocation || "Maison Vault"}
          </span>
        </div>
      </Link>

      {/* Editorial Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] text-secondary font-label-sm uppercase tracking-widest">
            <span>{product.category}</span>
            <span className="text-primary/80">{product.collection}</span>
          </div>

          <Link to={`/product/${product.id}`} className="group-hover:text-primary transition-colors">
            <h3 className="font-headline-sm text-[17px] text-on-surface leading-snug">
              {product.title}
            </h3>
          </Link>

          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Valuation & Actions */}
        <div className="pt-3 border-t border-primary/10 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
              Acquisition Valuation
            </span>
            <span className="font-headline-sm text-[17px] text-primary font-medium tracking-normal">
              {formatINR(product.priceINR)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAcquire}
              className={`py-2 px-2 uppercase font-label-sm text-[10px] tracking-widest transition-all duration-300 font-semibold flex items-center justify-center gap-1 border ${
                acquiredToast
                  ? "bg-green-800 text-white border-green-700"
                  : "bg-primary hover:bg-primary-fixed text-on-primary border-primary shadow-sm"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {acquiredToast ? "done" : "shopping_bag"}
              </span>
              <span>{acquiredToast ? "Acquired" : "Acquire"}</span>
            </button>

            <Link
              to={`/product/${product.id}`}
              className="py-2 px-2 uppercase font-label-sm text-[10px] tracking-widest text-center border border-primary/30 text-on-surface hover:text-primary hover:border-primary transition-colors flex items-center justify-center"
            >
              Dossier
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
