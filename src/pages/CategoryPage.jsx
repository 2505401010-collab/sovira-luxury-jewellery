import React from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function CategoryPage({ onOpenSalon, slugOverride }) {
  const { slug } = useParams();
  const effectiveSlug = slugOverride || slug;
  const currentCategory = CATEGORIES.find((c) => c.slug === effectiveSlug) || {
    id: "all",
    name: "All Masterworks",
    slug: "all",
    description: "Curated imperial creations across all sovereign jewellery forms."
  };

  const pieces =
    currentCategory.id === "all"
      ? PRODUCTS
      : PRODUCTS.filter(
          (p) =>
            p.categorySlug === currentCategory.slug ||
            p.category.toLowerCase() === currentCategory.name.toLowerCase() ||
            (currentCategory.slug === "gold" && p.collectionSlug === "royal-gold") ||
            (currentCategory.slug === "silver" && p.collectionSlug === "silver") ||
            (currentCategory.slug === "gemstones" && p.collectionSlug === "gemstones") ||
            (currentCategory.slug === "diamond" && p.diamondSpecs?.caratWeight > 0)
        );

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Category Header */}
      <section className="px-6 md:px-16 pt-8 pb-10 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Jewellery Typology
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-normal tracking-wide text-on-surface mb-3">
            {currentCategory.name}
          </h1>

          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-secondary font-light max-w-2xl leading-relaxed mb-6">
            {currentCategory.description}
          </p>

          {/* Quick Category Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={`px-4 py-2 font-label-md text-label-md tracking-wider uppercase shrink-0 transition-colors ${
                  cat.slug === effectiveSlug
                    ? "bg-primary text-on-primary font-medium"
                    : "bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full px-6 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          {pieces.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low border border-primary/10 p-8">
              <span className="material-symbols-outlined text-primary text-[32px] mb-2">diamond</span>
              <h3 className="font-headline-sm text-on-surface mb-2">Private Commissions in Progress</h3>
              <p className="font-body-sm text-on-surface-variant max-w-md mx-auto">
                Additional {currentCategory.name} creations are currently undergoing royal hallmarking and Gübelin certification. Inquire with our salon concierge for unlisted archive pieces.
              </p>
              <button
                onClick={onOpenSalon}
                className="mt-6 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider"
              >
                Inquire on Bespoke {currentCategory.name}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pieces.map((piece) => (
                <ProductCard key={piece.id} product={piece} onOpenSalon={onOpenSalon} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
