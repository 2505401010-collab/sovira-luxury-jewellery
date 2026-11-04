import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function SilverCollectionPage({ onOpenSalon }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const silverPieces = PRODUCTS.filter(
    (p) =>
      p.collection === "Silver Jewellery" ||
      p.bullionSpecs?.metal?.includes("Silver") ||
      p.bullionSpecs?.metal?.includes("925")
  );

  const categories = [
    { id: "all", label: `All Silver (${silverPieces.length})` },
    { id: "Necklaces", label: "Silver Chokers & Torcs" },
    { id: "Bracelets", label: "Sculptural Cuffs" },
    { id: "Pendants", label: "Archival Talismans" },
    { id: "Earrings", label: "Filigree Drops" }
  ];

  const filteredPieces =
    activeCategory === "all"
      ? silverPieces
      : silverPieces.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Editorial Header (Screen 5) */}
      <section className="px-6 md:px-16 pt-8 pb-10 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-label-sm text-label-sm uppercase text-secondary tracking-[0.25em]">
              Hallmarked 925 • Vermeil • Archival
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mb-2">
            Sterling & Moonlight
          </h1>

          <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary mb-4">
            Modern Sovereign Silver
          </p>

          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto font-light">
            Forged in deep Rajasthani courtyards and finished under cool starlight, SOVIRA Silver transcends ornamental boundaries. Each creation celebrates hallmarked 925 sterling, radiant 22-karat silver-gilt, and blackened oxidized silver.
          </p>
        </div>
      </section>

      {/* Hero Visual Frame */}
      <div className="relative w-full px-6 md:px-16 my-8">
        <div className="max-w-6xl mx-auto relative h-56 md:h-72 overflow-hidden bg-surface-container border border-primary/15">
          <img
            className="w-full h-full object-cover opacity-85"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu3-WgukP7hAPOgoCMbQr0_KqJdLAj3BSDoZPmzT1Bck1BBIEob_aIURFBtN53BSqJVMmQ2Jt9E-oWPvYY9jMHOTs86p5zGdsA9Gm8tGyseE0x2MceSU23YVo9u_20GouActtb9b09AnJmSf3JWEyXeHfGxewu_wBV6UwofUskJpTEVFc9MGLK4fYrvuQZf0yWAlI-PIv7eQpSDYbP6uYRFGsluiiGUKpIGBdkjow"
            alt="Opulent heavy sterling silver torc choker"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Atelier Monograph
              </span>
              <span className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
                The Lunar Metal of Mewar
              </span>
            </div>
            <span className="material-symbols-outlined text-primary text-[28px] animate-pulse">
              auto_awesome
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="w-full bg-surface-container-low px-6 md:px-16 py-4 overflow-x-auto scrollbar-none border-b border-primary/10 sticky top-20 z-20">
        <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
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
