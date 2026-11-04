import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function SignatureCollectionsPage({ onOpenSalon }) {
  const [activeEpoch, setActiveEpoch] = useState("all");

  const epochs = [
    { id: "all", label: "All Houses" },
    { id: "The Jharokha Collection", label: "I. Jharokha" },
    { id: "The Nizam Treasury", label: "II. Nizam" },
    { id: "Sovereign Solitaires", label: "III. Solitaires" },
    { id: "The Chausath Parure", label: "IV. Chausath" }
  ];

  const pieces = PRODUCTS.filter(
    (p) => activeEpoch === "all" || p.subCollection === activeEpoch
  );

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Editorial Hero Header (Screen 3) */}
      <section className="px-6 md:px-16 pt-8 pb-10 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Archival Chapters
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary font-normal leading-tight tracking-tight mb-4">
            Signature Collections — Chapters of Sovereign Design
          </h1>

          <p className="font-body-lg text-body-lg text-secondary font-light leading-relaxed max-w-2xl mb-6">
            The Four Houses of SOVIRA. Each collection is an architectural and historical chapter inspired by royal Indian dynasties and lost craft guild archives.
          </p>

          {/* Interactive Epoch Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
            {epochs.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setActiveEpoch(ep.id)}
                className={`px-4 py-2 font-label-md text-label-md tracking-widest uppercase shrink-0 transition-colors ${
                  activeEpoch === ep.id
                    ? "bg-primary text-on-primary font-medium shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                }`}
              >
                {ep.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Gallery */}
      <section className="w-full px-6 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pieces.map((piece) => (
              <ProductCard key={piece.id} product={piece} onOpenSalon={onOpenSalon} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
