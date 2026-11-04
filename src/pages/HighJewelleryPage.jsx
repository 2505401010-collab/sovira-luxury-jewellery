import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function HighJewelleryPage({ onOpenSalon }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const highJewelleryPieces = PRODUCTS.filter(
    (p) => p.collection === "High Jewellery" || p.isPieceUnique
  );

  const filterTabs = [
    { id: "all", label: `All Masterpieces (${highJewelleryPieces.length})` },
    { id: "Necklaces", label: "Archival Collars" },
    { id: "Earrings", label: "Jharokha Earrings" },
    { id: "Bangles", label: "Solitaire Cuffs" },
    { id: "Rings", label: "Heirloom Rings" },
  ];

  const filteredPieces =
    activeFilter === "all"
      ? highJewelleryPieces
      : highJewelleryPieces.filter((p) => p.category === activeFilter);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Editorial Header Showcase (Screen 2) */}
      <section className="flex flex-col px-6 md:px-16 pt-8 pb-10 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Sovereign Haute Joaillerie
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-normal tracking-wide text-on-surface text-balance">
            High Jewellery Collections
          </h1>

          <p className="font-headline-sm text-headline-sm italic text-secondary font-light mt-2 mb-4">
            Couture Masterpieces of Rare Provenance
          </p>

          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed font-light">
            Handcrafted over thousands of atelier hours using untreated gemstones, archival 22K and 18K royal gold, and proprietary diamond settings. Each artifact preserves sovereign lineages of ancient lapidary mastery.
          </p>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-primary/15">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary">16</span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">
                Numbered Creations
              </span>
            </div>
            <div className="w-[1px] h-7 bg-primary/20"></div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary">100%</span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">
                Unheated & Certified
              </span>
            </div>
            <div className="w-[1px] h-7 bg-primary/20"></div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary">Vault</span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">
                Secure Escrow
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter Scroll */}
      <div className="w-full bg-surface-container-low px-6 md:px-16 py-4 overflow-x-auto scrollbar-none border-b border-primary/10 sticky top-20 z-20">
        <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-all ${
                activeFilter === tab.id
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exhibition Grid */}
      <section className="w-full px-6 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          {filteredPieces.length === 0 ? (
            <div className="text-center py-16 text-secondary">
              No pieces found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPieces.map((piece) => (
                <ProductCard key={piece.id} product={piece} onOpenSalon={onOpenSalon} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
