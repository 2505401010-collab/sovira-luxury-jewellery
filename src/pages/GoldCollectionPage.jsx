import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function GoldCollectionPage({ onOpenSalon }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const goldPieces = PRODUCTS.filter(
    (p) =>
      p.collection === "Royal Gold" ||
      p.bullionSpecs?.metal?.includes("22K") ||
      p.bullionSpecs?.metal?.includes("24K")
  );

  const categories = [
    { id: "all", label: `All Royal Gold (${goldPieces.length})` },
    { id: "Bangles", label: "Kadas & Bangles" },
    { id: "Necklaces", label: "Torques & Hanslis" },
    { id: "Mangalsutra", label: "Royal Mangalsutra" },
    { id: "Maang Tikka", label: "Maang Tikka" }
  ];

  const filteredPieces =
    activeCategory === "all"
      ? goldPieces
      : goldPieces.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Editorial Hero Banner (Screen 4) */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest">
        <div className="relative w-full h-[480px] md:h-[580px] overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk')"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/90 via-transparent to-surface-container-lowest/40"></div>

          {/* Hero Typography & Framing */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 max-w-4xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
                Royal Karigari Archives • Vol. IV
              </span>
            </div>

            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-3 leading-tight tracking-tight">
              The Golden Lineage — Pure Form, Sacred Geometry
            </h1>

            <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-xl leading-relaxed mb-6 font-light">
              Ancestral repoussé, champlevé enameling, and jadau gold foil techniques resurrecting medieval sovereign dynasties in untainted 22-karat and 24-karat minted gold.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#curated-catalog"
                className="px-6 py-3 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary-fixed transition-colors shadow-lg"
              >
                Explore Curated Bullion
              </a>
              <button
                onClick={onOpenSalon}
                className="px-5 py-3 bg-surface-container-high text-primary font-label-md text-label-md uppercase tracking-wider flex items-center gap-1.5 hover:bg-surface-bright transition-colors border border-primary/20"
              >
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Assay Lineage</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign Assurances Grid */}
      <section className="w-full bg-surface-container-low px-6 md:px-16 py-6 border-b border-primary/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-surface-container flex flex-col gap-1 border border-primary/10">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              <span className="font-label-sm text-xs tracking-widest uppercase">Purity Assayed</span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-1">22K / 916 Royal</p>
            <span className="font-body-sm text-xs text-on-surface-variant">BIS Hallmarked & Minted</span>
          </div>

          <div className="p-4 bg-surface-container flex flex-col gap-1 border border-primary/10">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">handyman</span>
              <span className="font-label-sm text-xs tracking-widest uppercase">Artisanship</span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-1">Nakashi Chasing</p>
            <span className="font-body-sm text-xs text-on-surface-variant">Zero Cadmium Solder</span>
          </div>

          <div className="p-4 bg-surface-container flex flex-col gap-1 border border-primary/10">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-label-sm text-xs tracking-widest uppercase">Gold Custody</span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-1">Vault Insured</p>
            <span className="font-body-sm text-xs text-on-surface-variant">100% Lloyds Escrow</span>
          </div>

          <div className="p-4 bg-surface-container flex flex-col gap-1 border border-primary/10">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">history_edu</span>
              <span className="font-label-sm text-xs tracking-widest uppercase">Provenance</span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-1">Royal Hallmark</p>
            <span className="font-body-sm text-xs text-on-surface-variant">Engraved Serial Registry</span>
          </div>
        </div>
      </section>

      {/* Catalog Filter Bar */}
      <div id="curated-catalog" className="w-full bg-surface-container-low px-6 md:px-16 py-4 overflow-x-auto scrollbar-none border-b border-primary/10 sticky top-20 z-20">
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
