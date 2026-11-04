import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/products";
import { SOVIRA_EMBLEM_URL } from "./Header";

export default function DrawerNav({ isOpen, onClose, onOpenSalon, onOpenConcierge }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Slide-out Drawer Panel */}
      <div
        className={`absolute inset-y-0 left-0 w-[85%] max-w-sm bg-surface-container-low p-6 flex flex-col justify-between transform transition-transform duration-300 pt-safe pb-safe shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-primary/15">
            <div className="flex items-center gap-2">
              <img
                alt="SOVIRA Royal Emblem"
                className="h-7 w-auto object-contain"
                src={SOVIRA_EMBLEM_URL}
              />
              <span className="font-headline-sm text-headline-sm uppercase tracking-[0.2em] text-primary">
                SOVIRA
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Navigation Archive"
              className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 py-4">
            <span className="font-label-sm text-[10px] uppercase tracking-[0.25em] text-secondary/70 mb-1">
              Exhibitions & Archives
            </span>
            <Link
              to="/collections"
              onClick={onClose}
              className="py-2.5 font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors tracking-wide"
            >
              High Jewellery
            </Link>
            <Link
              to="/signature"
              onClick={onClose}
              className="py-2.5 font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors tracking-wide"
            >
              Signature Collections
            </Link>
            <Link
              to="/gold"
              onClick={onClose}
              className="py-2.5 font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors tracking-wide"
            >
              Royal Gold
            </Link>
            <Link
              to="/gemstones"
              onClick={onClose}
              className="py-2.5 font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors tracking-wide"
            >
              Rare Gemstones
            </Link>
            <Link
              to="/silver"
              onClick={onClose}
              className="py-2.5 font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors tracking-wide"
            >
              Silver Objects
            </Link>

            {/* Quick Categories Section */}
            <div className="mt-3 pt-3 border-t border-primary/10">
              <span className="font-label-sm text-[10px] uppercase tracking-[0.25em] text-secondary/70 mb-2 block">
                Jewellery Types
              </span>
              <div className="grid grid-cols-2 gap-2 pb-2">
                {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="py-1.5 text-xs text-on-surface-variant hover:text-primary uppercase tracking-wider"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-primary/10 flex flex-col gap-1">
              <Link
                to="/house"
                onClick={onClose}
                className="py-2 font-headline-sm text-[18px] text-on-surface hover:text-primary transition-colors tracking-wide"
              >
                The House & Heritage
              </Link>
              <button
                onClick={() => {
                  onClose();
                  onOpenSalon();
                }}
                className="py-2 text-left font-headline-sm text-[18px] text-primary hover:text-primary-fixed transition-colors tracking-wide flex items-center justify-between"
              >
                <span>Private Appointments</span>
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenConcierge();
                }}
                className="py-2 text-left font-headline-sm text-[18px] text-secondary hover:text-primary transition-colors tracking-wide flex items-center justify-between"
              >
                <span>Client Concierge</span>
                <span className="material-symbols-outlined text-[16px]">chat</span>
              </button>
              <Link
                to="/orders"
                onClick={onClose}
                className="py-2 font-headline-sm text-[18px] text-on-surface hover:text-primary transition-colors tracking-wide flex items-center justify-between"
              >
                <span>Orders & Transit Tracking</span>
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="py-2 font-headline-sm text-[18px] text-on-surface hover:text-primary transition-colors tracking-wide flex items-center justify-between"
              >
                <span>Contact the Maison</span>
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </Link>
              <Link
                to="/dashboard"
                onClick={onClose}
                className="py-2 font-headline-sm text-[18px] text-on-surface hover:text-primary transition-colors tracking-wide flex items-center justify-between"
              >
                <span>Sanctuary Portfolio</span>
                <span className="material-symbols-outlined text-[16px]">lock</span>
              </Link>
              <Link
                to="/admin"
                onClick={onClose}
                className="py-2 font-headline-sm text-[14px] text-outline hover:text-primary transition-colors tracking-wide flex items-center justify-between pt-2 border-t border-primary/10"
              >
                <span>Curator Admin Suite</span>
                <span className="material-symbols-outlined text-[14px]">shield</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Salons Footer */}
        <div className="pt-6 border-t border-primary/15 flex flex-col gap-2">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary">
            Private Salons
          </span>
          <p className="font-body-sm text-xs text-on-surface-variant">
            The Oberoi, Mumbai • Mayfair, London • DIFC, Dubai • The Imperial, New Delhi
          </p>
        </div>
      </div>
    </div>
  );
}
