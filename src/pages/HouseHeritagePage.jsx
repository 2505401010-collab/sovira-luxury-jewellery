import React from "react";
import { Link } from "react-router-dom";

export default function HouseHeritagePage({ onOpenSalon, onOpenConcierge }) {
  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Hero Banner */}
      <section className="relative w-full h-[520px] md:h-[640px] flex items-center justify-center overflow-hidden bg-surface-container-lowest">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnnd3GW01c5g5RCGEKX_FJRUt1YDUAwX__3N_sWDM6-IQnjngcDdr8CMrCroaH4eyWUoFIebFJaO-mmHmco4L9gAUVU4g47TMXoFJZpb910O7RyDkn5UljR-aba2AgKtntKGjrVr3haBN8u1x9ZCTM4BoYBjT3GnQaQReZR0EAjtahMufKo41VScaBOuwK1c8vOTD5YyslI0O_apvnYwdC5QVoDGssWnWGwZraaXw')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-transparent"></div>

        <div className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center">
          <span className="font-label-sm text-xs uppercase tracking-[0.35em] text-primary mb-3">
            Atelier Archives MMXXV
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-light tracking-wide mb-4">
            The House of SOVIRA
          </h1>
          <p className="font-headline-sm md:font-headline-md italic text-secondary font-light max-w-xl leading-relaxed mb-6">
            The Hidden Royalty of India, Reimagined for the World
          </p>
          <div className="h-[1px] w-24 bg-primary/40 mb-6"></div>
        </div>
      </section>

      {/* Main Narrative Sections */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-16">
        {/* Section 1: The Art of Precious Living */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
            I. The Philosophy
          </span>
          <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface font-light">
            Sovereign Restraint & Architectural Splendor
          </h2>
          <p className="font-body-lg text-on-surface-variant font-light leading-relaxed">
            The design philosophy of SOVIRA translates the hidden architectural grandeur and royal heritage of Indian high jewelry into an uncompromising modern luxury interface. Rooted in the visual philosophy of *The Art of Precious Living*, the Maison prioritizes quiet sovereign power, museum-quality curation, and spatial generosity over commercial excess.
          </p>
          <p className="font-body-md text-on-surface-variant font-light leading-relaxed">
            Drawing from the structural majesty of Rajasthani havelis, warm sandstone plinths, and ancestral jharokha symmetry, the aesthetic fuses Warm Editorial Minimalism with Sovereign High-Contrast Restraint. Visual treatments evoke private salon appointments: deeply immersive dark canvases punctuated by antique champagne tones, razor-sharp editorial typography, and expansive negative space.
          </p>
        </div>

        {/* Section 2: Pure Bullion & Lapidary Discipline */}
        <div className="p-8 bg-surface-container-low border border-primary/20 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 aspect-square bg-surface-container-lowest overflow-hidden border border-primary/10">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGbTw_KRp4wg_o9Vo031kCG2MzW69eedNYLMrrwPrs2uhDTILAOGWMGdZ_BjGNcVrwbE8R1rHLjV2OFS67HiNLgf1S9EhoaJi5FmZA88_CKQFpN4vJ6aX3lawe3fbBWOxZ570w8V0vakTnIpTVc5R2HYpc9BQzi_sHwiAoxzNRfAFZS0F97am4DHZvyjqPvZgIK1qLdfeF3pbRxOAONmJAHjE2lRwEAgJ5Fbfq5Sk"
              alt="Ancestral Goldsmithing"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
              II. The Craft Guilds
            </span>
            <h3 className="font-headline-sm text-xl text-on-surface">
              Ancestral Karigari & Zero Cadmium Solder
            </h3>
            <p className="font-body-sm text-on-surface-variant font-light leading-relaxed">
              Every creation is forged strictly in BIS 916 royal hallmarked 22K gold, 24K fine minted bullion, or 925 sterling silver. Cadmium solder is unconditionally prohibited in our ateliers, preserving the pure metallurgical frequency of sovereign heirloom gold.
            </p>
            <div className="pt-2 flex flex-col gap-1 text-xs font-mono text-secondary">
              <div>• Chased Nakashi Goldsmithing</div>
              <div>• Mughal Meenakari Enamelling</div>
              <div>• Hand-Pressed Kundan Gold Foil Bezel Setting</div>
            </div>
          </div>
        </div>

        {/* Section 3: Global Salon Residences */}
        <div className="flex flex-col gap-6 text-center">
          <span className="font-label-sm text-xs uppercase tracking-[0.3em] text-primary">
            III. Private Appointments
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface font-light">
            Private Viewings by Diplomatic Reservation
          </h2>
          <p className="font-body-md text-secondary max-w-xl mx-auto font-light leading-relaxed">
            Experience one-of-a-kind high jewellery creations in absolute confidentiality within our private salon suites across Mumbai, London, Dubai, and New Delhi.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenSalon()}
              className="px-8 py-3.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary-fixed transition-colors font-semibold"
            >
              Request Private Salon Viewing
            </button>
            <button
              onClick={() => onOpenConcierge()}
              className="px-8 py-3.5 bg-surface-container border border-primary/20 text-secondary hover:text-primary font-label-md text-label-md uppercase tracking-widest transition-colors"
            >
              Contact Discreet Liaison
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
