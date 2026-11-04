import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function GemstonesCollectionPage({ onOpenSalon }) {
  const [activeProvenance, setActiveProvenance] = useState("all");

  const gemstonePieces = PRODUCTS.filter(
    (p) =>
      p.collection === "Precious Gemstones" ||
      Boolean(p.gemstoneSpecs?.originProvenance)
  );

  const tabs = [
    { id: "all", label: `All Curations (${gemstonePieces.length})` },
    { id: "Kashmir", label: "Kashmir Sapphires" },
    { id: "Muzo", label: "Muzo Emeralds" },
    { id: "Golconda", label: "Golconda Diamonds" },
    { id: "Basra", label: "Basra Pearls" }
  ];

  const filteredPieces =
    activeProvenance === "all"
      ? gemstonePieces
      : gemstonePieces.filter(
          (p) =>
            p.gemstoneSpecs?.originProvenance?.includes(activeProvenance) ||
            p.gemstoneSpecs?.stoneType?.includes(activeProvenance) ||
            p.diamondSpecs?.stoneType?.includes(activeProvenance)
        );

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Editorial Header (Screen 6) */}
      <section className="px-6 md:px-16 pt-8 pb-10 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Haute Joaillerie Archives
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-normal tracking-tight mb-3">
            Unbroken Earth:<br />
            <span className="italic font-normal text-primary">The Master Gemstones</span>
          </h1>

          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed font-light mb-6">
            Sacred crystal matrices untouched by thermal heat or chemical clarity enhancement. Sourced from the historical depths of Golconda, Mogok, Kashmir, and Old-Mine Muzo, each marvel is accompanied by SSEF, Gübelin, and GIA pedigree passports.
          </p>

          {/* Hero Visual Tableau */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface-container border border-primary/20 shadow-2xl">
            <img
              className="w-full h-full object-cover transform scale-100 transition-transform duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaorUkh1-kkyErZ4l_RtD3xUdUrMSsvrZjRqTZrvLE1i1uHTyJFgwgdF9TFu0YGmheC8EMo8aKeccJmVELRI7kv7kO3JXxVmsKAKYmBYRdTpQmGQv23b-P2-EHFZVZbn90pkhh_aPs2RXErj7lVXlWctrve2-4OD0j6s46BXH1NcF7dCAy0DiysX8tGIyR9aCILo3GohPELfm3yVpFfmjiI7Gwm25vlNe5mFDocFw"
              alt="Untouched 14-carat Kashmir cornflower blue sapphire resting on stone plinth"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-on-surface">
              <span className="font-label-sm text-xs text-secondary tracking-widest uppercase">
                Gübelin Gem Lab Certified
              </span>
              <span className="font-label-sm text-xs text-primary tracking-widest uppercase font-medium">
                100% Unheated Origin
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Provenance Filter Tabs */}
      <div className="w-full bg-surface-container-low px-6 md:px-16 py-4 overflow-x-auto scrollbar-none border-b border-primary/10 sticky top-20 z-20">
        <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveProvenance(tab.id)}
              className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-all ${
                activeProvenance === tab.id
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="w-full px-6 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPieces.map((piece) => (
              <ProductCard key={piece.id} product={piece} onOpenSalon={onOpenSalon} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
