import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES, COLLECTIONS } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function HomePage({ onOpenSalon, onOpenConcierge }) {
  const featuredPieces = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 1. HERO SECTION (Exactly preserves sovira_homepage) */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest">
        <div className="relative w-full h-[620px] md:h-[760px] flex flex-col justify-end">
          {/* Atmospheric Background with Arch Shadow */}
          <div
            className="absolute inset-0 bg-cover bg-center w-full h-full transform scale-[1.02] transition-transform duration-1000 ease-out"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnnd3GW01c5g5RCGEKX_FJRUt1YDUAwX__3N_sWDM6-IQnjngcDdr8CMrCroaH4eyWUoFIebFJaO-mmHmco4L9gAUVU4g47TMXoFJZpb910O7RyDkn5UljR-aba2AgKtntKGjrVr3haBN8u1x9ZCTM4BoYBjT3GnQaQReZR0EAjtahMufKo41VScaBOuwK1c8vOTD5YyslI0O_apvnYwdC5QVoDGssWnWGwZraaXw')"
            }}
          ></div>

          {/* Sovereign Mood Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-surface-container-lowest/20"></div>

          {/* Subtle Ambient Filigree Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>

          {/* Hero Typography & CTAs */}
          <div className="relative z-10 px-6 pb-16 md:pb-24 flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Monogram Motif Divider */}
            <div className="flex items-center gap-3 mb-4 opacity-80">
              <span className="w-8 h-[1px] bg-primary/40"></span>
              <span className="material-symbols-outlined text-primary text-[14px] tracking-widest">
                lens_blur
              </span>
              <span className="w-8 h-[1px] bg-primary/40"></span>
            </div>

            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary mb-3">
              Haute Joaillerie MMXXV
            </span>

            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-light tracking-wide max-w-xl mb-4 leading-tight">
              A Legacy Beyond Ornament
            </h1>

            <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-secondary max-w-md font-light tracking-wide mb-8 leading-relaxed">
              Discover the rare art of sovereign Indian craftsmanship, forged for dynasties across centuries.
            </p>

            <div className="flex flex-col sm:flex-row w-full max-w-md gap-4 items-stretch justify-center">
              <Link
                to="/collections"
                className="w-full sm:w-auto py-3.5 px-8 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-[0.2em] font-medium text-center shadow-lg hover:bg-primary-fixed active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore The Collections</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>

              <Link
                to="/house"
                className="w-full sm:w-auto py-3.5 px-8 bg-surface-container-high/80 text-on-surface font-label-md text-label-md uppercase tracking-[0.2em] text-center hover:text-primary hover:bg-surface-container transition-all flex items-center justify-center border border-primary/20"
              >
                Discover The House
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE HOUSE PHILOSOPHY EDITORIAL */}
      <section className="relative w-full py-20 px-6 md:px-16 bg-surface-container-low overflow-hidden border-y border-primary/10">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.35em] text-primary/90 mb-3">
            The Hidden Royalty of India
          </span>

          <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface font-light italic mb-6">
            Sovereign Geometry & Living Stone
          </h2>

          {/* Filigree Architectural Divider */}
          <div className="w-full flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-16 bg-primary/30"></div>
            <div className="w-2 h-2 rotate-45 bg-primary/60"></div>
            <div className="h-[1px] w-16 bg-primary/30"></div>
          </div>

          <p className="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed max-w-2xl mb-8">
            Drawing from the structural majesty of Rajasthani havelis, warm sandstone plinths, and ancestral jharokha symmetry, SOVIRA unites museum-quality lapidary curation with uncompromising modern luxury restraint.
          </p>

          <div className="grid grid-cols-3 gap-6 md:gap-12 w-full pt-4 border-t border-primary/10 text-center">
            <div className="flex flex-col gap-1">
              <span className="font-headline-md text-primary font-normal">24K / 22K</span>
              <span className="font-label-sm text-[10px] md:text-label-sm uppercase tracking-widest text-outline">Royal Hallmarked Bullion</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-md text-primary font-normal">100%</span>
              <span className="font-label-sm text-[10px] md:text-label-sm uppercase tracking-widest text-outline">Unheated Provenance</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-md text-primary font-normal">Vault Escrow</span>
              <span className="font-label-sm text-[10px] md:text-label-sm uppercase tracking-widest text-outline">Diplomatic White-Glove</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED JEWELLERY CATEGORIES (User Requirement 7) */}
      <section className="w-full py-16 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
                Atelier Catalog
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1">
                Explore by Jewellery Type
              </h2>
            </div>
            <Link
              to="/collections"
              className="font-label-md text-label-md uppercase tracking-widest text-primary hover:text-primary-fixed flex items-center gap-1 self-start md:self-auto"
            >
              <span>View All Masterpieces</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group relative bg-surface-container-low p-5 border border-primary/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between min-h-[140px] hover:bg-surface-container"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
                    Type
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-transform group-hover:translate-x-1 text-[16px]">
                    arrow_forward
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-[18px] text-on-surface group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-body-sm text-[11px] text-outline mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGH JEWELLERY SUITES VITRINE */}
      <section className="w-full py-16 px-6 md:px-12 bg-surface-container-lowest border-t border-primary/10">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
                High Jewellery Suites
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1">
                Archival Masterpieces
              </h2>
            </div>
            <Link
              to="/collections"
              className="font-label-md text-label-md uppercase tracking-widest text-primary hover:text-primary-fixed flex items-center gap-1 self-start md:self-auto"
            >
              <span>Exhibition Gallery (16 Pieces)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPieces.map((piece) => (
              <ProductCard key={piece.id} product={piece} onOpenSalon={onOpenSalon} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE FOUR HOUSES OF SOVIRA */}
      <section className="w-full py-16 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary">
              Dynastic Lineages
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1">
              The Four Houses of SOVIRA
            </h2>
            <p className="font-body-md text-body-md text-secondary mt-2">
              Each signature collection represents a distinct architectural epoch of sovereign Indian design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* House 1: Jharokha */}
            <div className="bg-surface-container-low border border-primary/15 p-6 flex flex-col justify-between gap-6 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs uppercase tracking-widest text-primary">House I • Rajput Court</span>
                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">The Jharokha Collection</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Inspired by carved sandstone palace windows and inverted table-cut Golconda diamonds casting geometric shadows across the wearer.
                </p>
              </div>
              <Link
                to="/signature"
                className="font-label-md text-label-md uppercase tracking-widest text-primary hover:text-primary-fixed flex items-center gap-1 self-start"
              >
                <span>Explore Jharokha Chapters</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {/* House 2: Nizam */}
            <div className="bg-surface-container-low border border-primary/15 p-6 flex flex-col justify-between gap-6 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs uppercase tracking-widest text-primary">House II • Hyderabad Treasury</span>
                <span className="material-symbols-outlined text-primary text-[18px]">diamond</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">The Nizam Treasury</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Ceremonial Basra seed pearl cascades, Colombian fluted emerald pendants, and unheated Kashmir sapphires of museum pedigree.
                </p>
              </div>
              <Link
                to="/gemstones"
                className="font-label-md text-label-md uppercase tracking-widest text-primary hover:text-primary-fixed flex items-center gap-1 self-start"
              >
                <span>View Rare Gemstones</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENT SERVICES & PRIVATE SALON BANNER (Preserves Screen 1 Section 6) */}
      <section className="w-full py-16 px-6 md:px-12 bg-surface-container">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col text-center items-center">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary">
              Private Residences & Salons
            </span>
            <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface font-light mt-1">
              Discreet Global Access
            </h2>
            <p className="font-body-md text-body-md text-secondary font-light max-w-md mt-2">
              Experience our pieces within secluded salon suites or requested private armored viewings worldwide.
            </p>
          </div>

          {/* Salon Locations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-container-high p-5 flex flex-col gap-1 border border-primary/10">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase">Mumbai</span>
              <span className="font-body-sm text-[12px] text-on-surface-variant font-light">The Oberoi • Nariman Point</span>
              <span className="font-label-sm text-[10px] text-outline mt-2 tracking-wider">BY PRIVATE INVITATION</span>
            </div>
            <div className="bg-surface-container-high p-5 flex flex-col gap-1 border border-primary/10">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase">London</span>
              <span className="font-body-sm text-[12px] text-on-surface-variant font-light">Old Bond Street • Mayfair</span>
              <span className="font-label-sm text-[10px] text-outline mt-2 tracking-wider">SUMMER RESIDENCY</span>
            </div>
            <div className="bg-surface-container-high p-5 flex flex-col gap-1 border border-primary/10">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase">Dubai</span>
              <span className="font-body-sm text-[12px] text-on-surface-variant font-light">Gate Precinct • DIFC</span>
              <span className="font-label-sm text-[10px] text-outline mt-2 tracking-wider">SOVEREIGN SUITE</span>
            </div>
            <div className="bg-surface-container-high p-5 flex flex-col gap-1 border border-primary/10">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase">New Delhi</span>
              <span className="font-body-sm text-[12px] text-on-surface-variant font-light">The Imperial • Janpath</span>
              <span className="font-label-sm text-[10px] text-outline mt-2 tracking-wider">ANCESTRAL ARCHIVE</span>
            </div>
          </div>

          {/* Direct Liaison Contact Action */}
          <div className="bg-surface-container-lowest p-6 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">encrypted</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md uppercase text-on-surface tracking-wider">
                  Discreet Concierge Liaison
                </span>
                <span className="font-body-sm text-xs text-secondary">
                  Direct Secure WhatsApp Liaison & Private Vault Escrow
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenSalon}
                className="flex-1 sm:flex-none px-5 py-3 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-fixed transition-colors text-center"
              >
                Book Salon
              </button>
              <button
                onClick={onOpenConcierge}
                className="px-4 py-3 bg-surface-container-high text-primary hover:text-on-surface transition-colors flex items-center justify-center border border-primary/20"
                aria-label="Direct encrypted chat"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
