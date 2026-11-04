import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { CATEGORIES } from "../../data/products";

export const SOVIRA_EMBLEM_URL = "https://lh3.googleusercontent.com/aida/AEtjO1VpWC1dBIFZ0i8IMqkTIeEMyLW4o3LB_HkyAcMNjHJydEgtOELP8uTGB37QwZqY6fcdCmpqmzkcaIEYJdRodSjPIZ2HEqcoL4-YqbWqfocgYwxLqHCyXlkkU9A3lJGFW2Bg5vcwsbYEw-336CTUT9XmV33skmrTa4YQT6bTxPYGoeMTde1MdhNhATJTlOmZ-58i_goYEuza2dgYgDVJdgmod-9nwj4WJzz-Kb5KgfA";

export default function Header({ onOpenDrawer, onOpenSalon, onOpenConcierge }) {
  const location = useLocation();
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [logoImgFailed, setLogoImgFailed] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-primary/10 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* 1. Announcement Bar */}
      <div className="bg-surface-container-lowest px-4 py-1.5 flex items-center justify-between text-center overflow-hidden border-b border-primary/10">
        <div className="flex-1 text-center">
          <button
            onClick={onOpenSalon}
            className="font-label-sm text-[10px] md:text-label-sm uppercase text-primary tracking-widest truncate hover:text-primary-fixed transition-colors"
          >
            Private Salon Appointments: Mumbai • London • Dubai | Enquire Discreetly
          </button>
        </div>
        <button
          onClick={onOpenConcierge}
          className="hidden md:flex items-center gap-1.5 font-label-sm text-[10px] text-secondary hover:text-primary uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[14px] text-primary">chat</span>
          <span>Direct Concierge</span>
        </button>
      </div>

      {/* 2. Main Header Bar */}
      <div className="h-20 px-4 md:px-8 flex items-center justify-between">
        {/* Left: Drawer Trigger & Brand Logo */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            aria-label="Open Royal Navigation Archive"
            className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 text-primary hover:text-primary-fixed focus:outline-none transition-colors"
            onClick={onOpenDrawer}
          >
            <span className="w-6 h-[1.5px] bg-primary block transition-transform"></span>
            <span className="w-4 h-[1.5px] bg-primary block transition-transform self-start"></span>
          </button>

          <Link to="/" className="flex items-center gap-3 focus:outline-none group">
            {!logoImgFailed ? (
              <img
                alt="SOVIRA Royal Emblem"
                className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                src={SOVIRA_EMBLEM_URL}
                onError={() => setLogoImgFailed(true)}
              />
            ) : (
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L28.5 16.5L41.5 21L28.5 25.5L24 38L19.5 25.5L6.5 21L19.5 16.5L24 4Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="24" cy="21" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase tracking-[0.25em] text-primary leading-none">
                SOVIRA
              </span>
              <span className="font-label-sm text-[9px] md:text-label-sm uppercase tracking-[0.3em] text-secondary font-medium mt-0.5">
                HAUTE JOAILLERIE
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-label-md text-label-md uppercase tracking-[0.16em]">
          <Link
            to="/collections"
            className={`transition-colors py-2 hover:text-primary ${
              location.pathname === "/collections" ? "text-primary border-b border-primary" : "text-on-surface"
            }`}
          >
            High Jewellery
          </Link>
          <Link
            to="/signature"
            className={`transition-colors py-2 hover:text-primary ${
              location.pathname === "/signature" ? "text-primary border-b border-primary" : "text-on-surface"
            }`}
          >
            Signature
          </Link>
          <Link
            to="/gold"
            className={`transition-colors py-2 hover:text-primary ${
              location.pathname === "/gold" ? "text-primary border-b border-primary" : "text-on-surface"
            }`}
          >
            Royal Gold
          </Link>
          <Link
            to="/gemstones"
            className={`transition-colors py-2 hover:text-primary ${
              location.pathname === "/gemstones" ? "text-primary border-b border-primary" : "text-on-surface"
            }`}
          >
            Rare Gemstones
          </Link>
          <Link
            to="/silver"
            className={`transition-colors py-2 hover:text-primary ${
              location.pathname === "/silver" ? "text-primary border-b border-primary" : "text-on-surface"
            }`}
          >
            Silver Objects
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowCategoryMenu(true)}
            onMouseLeave={() => setShowCategoryMenu(false)}
          >
            <button
              className={`flex items-center gap-1 py-2 hover:text-primary transition-colors ${
                location.pathname.startsWith("/category") ? "text-primary" : "text-on-surface"
              }`}
            >
              <span>Categories</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {showCategoryMenu && (
              <div className="absolute top-full left-0 w-64 bg-surface-container-low border border-primary/20 shadow-2xl p-3 flex flex-col gap-1 z-50">
                {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="px-3 py-2 text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-outline">Lot</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/house"
            className={`transition-colors py-2 hover:text-primary ${
              location.pathname === "/house" ? "text-primary border-b border-primary" : "text-on-surface"
            }`}
          >
            The House
          </Link>
        </nav>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search Archive */}
          <Link
            to="/search"
            aria-label="Search Archive"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </Link>

          {/* Wishlist Folio */}
          <Link
            to="/wishlist"
            aria-label="High Jewelry Wishlist"
            className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[15px] h-[15px] flex items-center justify-center font-label-sm text-[9px] bg-primary text-on-primary px-0.5 leading-none">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Acquisitions Bag */}
          <Link
            to="/bag"
            aria-label="Acquisitions Bag"
            className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {totalCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[15px] h-[15px] flex items-center justify-center font-label-sm text-[9px] bg-primary text-on-primary px-0.5 leading-none">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Patron Avatar / Sanctuary Account */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/auth"}
            aria-label="Patron Sanctuary"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1 hover:ring-2 hover:ring-primary/40 transition-all"
            title={isAuthenticated ? user?.fullName || "Patron Sanctuary" : "Client Sign In"}
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
