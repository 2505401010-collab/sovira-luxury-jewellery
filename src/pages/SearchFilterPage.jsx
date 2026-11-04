import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, formatINR } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function SearchFilterPage({ onOpenSalon }) {
  const [searchTerm, setSearchTerm] = useState("Emerald");
  const [selectedMetal, setSelectedMetal] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  const instantPills = [
    "Emerald",
    "Golconda",
    "22K",
    "Sapphire",
    "Jharokha",
    "Silver",
    "Pearl",
    "Ruby"
  ];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.collection.toLowerCase().includes(q) ||
        item.gemstoneSpecs?.stoneType?.toLowerCase().includes(q) ||
        item.gemstoneSpecs?.originProvenance?.toLowerCase().includes(q) ||
        item.bullionSpecs?.metal?.toLowerCase().includes(q) ||
        item.editorialStory?.toLowerCase().includes(q);

      const matchMetal =
        selectedMetal === "all" ||
        item.bullionSpecs?.metal?.toLowerCase().includes(selectedMetal.toLowerCase());

      const matchCategory =
        selectedCategory === "all" ||
        item.categorySlug === selectedCategory ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchQuery && matchMetal && matchCategory;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceINR - a.priceINR);
    }

    return result;
  }, [searchTerm, selectedMetal, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 1. Curatorial Context Header (Screen 8) */}
      <section className="px-6 md:px-16 pt-8 pb-4 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.25em]">
              Salon Index
            </span>
            <span className="font-label-sm text-label-sm text-secondary/60">
              Vol. VII • MMXXV
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-normal tracking-wide">
            Search the SOVIRA Archives & Curations
          </h1>

          <p className="font-body-sm md:font-body-md text-secondary">
            Exploration of sovereign heirlooms, uncut gemstone suites, and palace vault commissions.
          </p>
        </div>
      </section>

      {/* 2. Bespoke Search Field Area */}
      <section className="px-6 md:px-16 py-4 bg-surface-container-low border-b border-primary/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 flex items-center bg-surface-container px-4 py-3 border border-primary/20 shadow-sm w-full">
            <span className="material-symbols-outlined text-primary text-[22px] mr-3 shrink-0">
              manage_search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gemstones, dynastic motifs, eras, karatage..."
              className="bg-transparent font-body-md text-body-md text-on-surface w-full focus:outline-none placeholder:text-outline-variant caret-primary"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Clear active query"
                className="w-7 h-7 flex items-center justify-center text-outline hover:text-primary transition-colors focus:outline-none shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className="w-full sm:w-auto px-5 py-3 bg-surface-container-high border border-primary/20 text-primary font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-surface-bright transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Filters</span>
          </button>
        </div>

        {/* Instant Category Trays (Scrollable Archival Pills) */}
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-3">
          {instantPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setSearchTerm(pill)}
              className={`shrink-0 px-3.5 py-1.5 font-label-sm text-xs uppercase tracking-wider transition-all border ${
                searchTerm.toLowerCase() === pill.toLowerCase()
                  ? "bg-primary text-on-primary border-primary font-medium"
                  : "bg-surface-container text-secondary hover:text-primary border-primary/10"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Refinement Toolbar Drawer */}
      {showFiltersDrawer && (
        <section className="px-6 md:px-16 py-6 bg-surface-container-lowest border-b border-primary/15 animate-fadeIn">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filter by Category */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                Jewellery Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-surface-container px-3 py-2 text-on-surface border border-primary/20 focus:border-primary focus:outline-none text-xs font-sans"
              >
                <option value="all">All Typologies</option>
                {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Metal */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                Precious Bullion
              </label>
              <select
                value={selectedMetal}
                onChange={(e) => setSelectedMetal(e.target.value)}
                className="bg-surface-container px-3 py-2 text-on-surface border border-primary/20 focus:border-primary focus:outline-none text-xs font-sans"
              >
                <option value="all">All Precious Metals</option>
                <option value="22K">22K Royal Gold</option>
                <option value="24K">24K Fine Gold</option>
                <option value="18K">18K Champagne / White Gold</option>
                <option value="925">925 Sterling Silver</option>
                <option value="Platinum">Platinum PT950</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                Curatorial Valuation Order
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container px-3 py-2 text-on-surface border border-primary/20 focus:border-primary focus:outline-none text-xs font-sans"
              >
                <option value="featured">Curator's Priority</option>
                <option value="price-desc">Valuation: Imperial to Accessible</option>
                <option value="price-asc">Valuation: Accessible to Imperial</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {/* 4. Results Bar & Count */}
      <section className="px-6 md:px-16 py-3 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-xs uppercase tracking-widest text-secondary">
              Showing {filteredProducts.length} Sovereign Masterpieces
            </span>
          </div>
          {(searchTerm || selectedMetal !== "all" || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedMetal("all");
                setSelectedCategory("all");
              }}
              className="font-label-sm text-[11px] text-primary hover:underline uppercase tracking-wider"
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* 5. Results Grid */}
      <section className="w-full px-6 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low border border-primary/10 p-8">
              <span className="material-symbols-outlined text-outline text-[32px] mb-2">search_off</span>
              <h3 className="font-headline-sm text-on-surface mb-2">No Matching Archival Pieces Found</h3>
              <p className="font-body-sm text-on-surface-variant max-w-md mx-auto mb-6">
                Try searching for "Emerald", "Gold", "Sapphire", "Silver", or "Jharokha". Alternatively, consult our Chief Curator for confidential vault pieces.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider"
              >
                View Complete Archives
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((piece) => (
                <ProductCard key={piece.id} product={piece} onOpenSalon={onOpenSalon} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
