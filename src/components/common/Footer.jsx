import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SOVIRA_EMBLEM_URL } from "./Header";
import { CATEGORIES } from "../../data/products";

export default function Footer({ onOpenSalon, onOpenConcierge }) {
  const [gazetteEmail, setGazetteEmail] = useState("");
  const [gazetteSubscribed, setGazetteSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!gazetteEmail) return;
    setGazetteSubscribed(true);
    setGazetteEmail("");
  };

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant px-6 md:px-16 py-16 flex flex-col gap-12 mt-16 border-t border-primary/10">
      {/* Brand Monogram & Mission */}
      <div className="flex flex-col gap-3 text-center items-center max-w-xl mx-auto">
        <img
          alt="SOVIRA Royal Emblem"
          className="h-10 md:h-12 w-auto object-contain opacity-90"
          src={SOVIRA_EMBLEM_URL}
        />
        <span className="font-headline-md text-headline-md text-primary tracking-[0.25em] uppercase mt-2">
          SOVIRA
        </span>
        <span className="font-label-sm text-[11px] tracking-[0.3em] uppercase text-secondary">
          HAUTE JOAILLERIE
        </span>
        <p className="font-headline-sm text-headline-sm italic text-secondary font-light max-w-md mt-1">
          "The Hidden Royalty of India, Reimagined for the World"
        </p>
      </div>

      {/* The Royal Gazette Subscription */}
      <div className="flex flex-col gap-3 max-w-md mx-auto w-full text-center">
        <span className="font-label-md text-label-md uppercase tracking-[0.25em] text-primary">
          The Royal Gazette
        </span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Receive seasonal monographs, private provenance unveilings, and global salon residency schedules.
        </p>

        {gazetteSubscribed ? (
          <div className="p-3 bg-surface-container border border-primary/20 text-primary text-xs uppercase tracking-widest font-mono">
            Patron Inscribed Into Royal Gazette
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex items-center bg-surface-container border border-primary/20 px-3 py-1 mt-1">
            <input
              type="email"
              required
              value={gazetteEmail}
              onChange={(e) => setGazetteEmail(e.target.value)}
              placeholder="EXECUTIVE ENVOY EMAIL"
              className="bg-transparent w-full text-on-surface font-label-sm text-label-sm tracking-widest placeholder:text-outline focus:outline-none h-11"
            />
            <button
              type="submit"
              className="h-11 px-5 font-label-md text-label-md uppercase tracking-widest text-primary hover:text-primary-fixed shrink-0 font-medium transition-colors"
            >
              Inscribe
            </button>
          </form>
        )}
      </div>

      {/* Navigation Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-primary/10 max-w-6xl mx-auto w-full font-label-sm text-label-sm uppercase tracking-widest">
        {/* Col 1: The Maison */}
        <div className="flex flex-col gap-3">
          <span className="text-primary font-bold tracking-wider">The Maison</span>
          <Link to="/house" className="hover:text-primary transition-colors">Ancestral Archives</Link>
          <Link to="/signature" className="hover:text-primary transition-colors">The Four Houses</Link>
          <button onClick={onOpenSalon} className="text-left hover:text-primary transition-colors">Private Viewings</button>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Atelier</Link>
          <Link to="/dashboard" className="hover:text-primary transition-colors">Client Sanctuary</Link>
          <Link to="/admin" className="hover:text-primary transition-colors text-[10px] text-outline">Master Admin</Link>
        </div>

        {/* Col 2: Curated Collections */}
        <div className="flex flex-col gap-3">
          <span className="text-primary font-bold tracking-wider">Curations</span>
          <Link to="/collections" className="hover:text-primary transition-colors">High Jewellery</Link>
          <Link to="/gold" className="hover:text-primary transition-colors">Royal Gold</Link>
          <Link to="/gemstones" className="hover:text-primary transition-colors">Rare Gemstones</Link>
          <Link to="/silver" className="hover:text-primary transition-colors">Sterling & Moonlight</Link>
          <Link to="/bridal" className="hover:text-primary transition-colors">Imperial Bridal</Link>
        </div>

        {/* Col 3: Jewellery Types */}
        <div className="flex flex-col gap-3">
          <span className="text-primary font-bold tracking-wider">Categories</span>
          <Link to="/rings" className="hover:text-primary transition-colors">Solitaire Rings</Link>
          <Link to="/necklaces" className="hover:text-primary transition-colors">Necklaces & Chokers</Link>
          <Link to="/earrings" className="hover:text-primary transition-colors">Pavé & Drops</Link>
          <Link to="/bracelets" className="hover:text-primary transition-colors">Articulated Cuffs</Link>
          <Link to="/bangles" className="hover:text-primary transition-colors">Heritage Bangles</Link>
          <Link to="/pendants" className="hover:text-primary transition-colors">Talisman Pendants</Link>
          <Link to="/bridal" className="hover:text-primary transition-colors">Bridal Parures</Link>
        </div>

        {/* Col 4: Concierge & Diplomatic Security */}
        <div className="flex flex-col gap-3">
          <span className="text-primary font-bold tracking-wider">Liaison</span>
          <button onClick={onOpenConcierge} className="text-left hover:text-primary transition-colors">Discreet Concierge</button>
          <Link to="/orders" className="hover:text-primary transition-colors">Order History & Tracking</Link>
          <Link to="/checkout" className="hover:text-primary transition-colors">Armored Courier</Link>
          <Link to="/dashboard" className="hover:text-primary transition-colors">Provenance Registry</Link>
          <span className="text-outline text-[11px] normal-case tracking-normal">Direct WhatsApp: +91 98200 48291</span>
        </div>
      </div>

      {/* Salons Footnote */}
      <div className="border-t border-primary/10 pt-6 text-center flex flex-col gap-2 max-w-2xl mx-auto">
        <span className="font-label-sm text-xs uppercase tracking-[0.2em] text-primary">
          Global Residencies
        </span>
        <p className="font-body-sm text-xs text-on-surface-variant">
          The Oberoi, Mumbai • Old Bond Street, Mayfair, London • Gate Precinct, DIFC, Dubai • The Imperial, New Delhi
        </p>
      </div>

      {/* Sovereign Copyright & Hallmark */}
      <div className="flex flex-col gap-2 pt-4 text-center border-t border-primary/10">
        <span className="font-label-sm text-label-sm tracking-[0.2em] text-outline uppercase">
          MMXXV © SOVIRA ROYAL JEWELLERY ATELIER
        </span>
        <span className="font-body-sm text-xs text-outline-variant">
          All masterworks registered with sovereign BIS 916 hallmark, Gübelin, SSEF & imperial provenance.
        </span>
      </div>
    </footer>
  );
}
