import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage({ onOpenSalon, onOpenConcierge }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    salonCity: "Mumbai — The Oberoi",
    interest: "High Jewellery Commission",
    message: ""
  });

  const salons = [
    {
      city: "Mumbai",
      location: "The Oberoi, Nariman Point",
      hours: "By Private Appointment • 11:00 - 20:00 IST",
      phone: "+91 (022) 6632 5757",
      liaison: "Devika Rathore — Senior Salon Director"
    },
    {
      city: "London",
      location: "14 Old Bond Street, Mayfair",
      hours: "By Diplomatic Accreditation • 10:00 - 18:30 GMT",
      phone: "+44 (020) 7493 8820",
      liaison: "Alistair Sterling — European Envoy"
    },
    {
      city: "Dubai",
      location: "Gate Precinct 4, DIFC",
      hours: "Private Majlis Suites • 11:00 - 21:00 GST",
      phone: "+971 (04) 362 7000",
      liaison: "Zareen Al-Maktoum — Gulf Liaison"
    },
    {
      city: "Jaipur",
      location: "Amber Fort Royal Workshop Road",
      hours: "Master Craftsmen Atelier • By Archival Permit",
      phone: "+91 (0141) 2530 112",
      liaison: "Pt. Ramnarayan Sharma — Chief Lapidary"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Header Banner */}
      <section className="px-6 md:px-16 pt-10 pb-12 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Diplomatic Liaison & Salon Viewings
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-normal tracking-wide text-on-surface mb-3">
            Contact the Maison
          </h1>

          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-secondary font-light max-w-2xl leading-relaxed">
            Whether arranging a private viewing at one of our global salons, commissioning a piece unique, or requesting discreet armored transit, our concierge stands at your command.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact & Appointment Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-surface-container-low border border-primary/20 p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-primary/15 mb-6">
              <div>
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary block">
                  Private Correspondence
                </span>
                <h2 className="font-headline-sm text-xl text-on-surface">
                  Request an Atelier Audience
                </h2>
              </div>
              <span className="material-symbols-outlined text-primary text-[24px]">mark_email_read</span>
            </div>

            {formSubmitted ? (
              <div className="p-8 bg-surface-container border border-primary/30 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">verified</span>
                </div>
                <h3 className="font-headline-sm text-lg text-primary">
                  Audience Request Inscribed
                </h3>
                <p className="font-body-sm text-secondary max-w-md text-xs">
                  Your inquiry has been routed to our Senior Salon Director. A dedicated concierge will initiate contact via telephone or encrypted courier within four business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 px-5 py-2 border border-primary/30 text-primary text-xs uppercase tracking-widest font-label-md hover:bg-surface-container-high transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                      Full Dignitary Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Maharaj Vikramaditya"
                      className="bg-surface-container border border-primary/20 px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors font-body-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                      Executive Envoy Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patron@royal-council.in"
                      className="bg-surface-container border border-primary/20 px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors font-body-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="bg-surface-container border border-primary/20 px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors font-body-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                      Preferred Salon Residency
                    </label>
                    <select
                      value={formData.salonCity}
                      onChange={(e) => setFormData({ ...formData, salonCity: e.target.value })}
                      className="bg-surface-container border border-primary/20 px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors font-body-sm"
                    >
                      <option>Mumbai — The Oberoi</option>
                      <option>London — Mayfair</option>
                      <option>Dubai — DIFC</option>
                      <option>Jaipur — Amber Fort Atelier</option>
                      <option>Virtual High-Definition Salon</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="bg-surface-container border border-primary/20 px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors font-body-sm"
                  >
                    <option>High Jewellery Commission</option>
                    <option>Imperial Bridal Trousseau Consultation</option>
                    <option>Private Salon Viewing Appointment</option>
                    <option>Archival Gemstone Provenance Inquiry</option>
                    <option>Diplomatic Armored Transit Request</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                    Special Inscriptions or Timing Constraints
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding preferred dates, security requirements, or particular archive pieces..."
                    className="bg-surface-container border border-primary/20 p-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors font-body-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-2 py-3.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Seal & Dispatch Confidential Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Global Salon Residencies (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-surface-container-low border border-primary/20 p-6 flex flex-col gap-4">
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
              Global Salon Residencies
            </span>

            <div className="flex flex-col gap-4">
              {salons.map((salon) => (
                <div
                  key={salon.city}
                  className="bg-surface-container p-4 border border-primary/10 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-base text-primary font-medium">
                      {salon.city} Salon
                    </span>
                    <span className="text-[10px] font-mono text-outline uppercase tracking-wider">
                      Flagship
                    </span>
                  </div>
                  <span className="text-xs text-on-surface font-light">{salon.location}</span>
                  <span className="text-[11px] text-secondary/80 font-mono mt-0.5">{salon.hours}</span>
                  <div className="pt-2 mt-1 border-t border-primary/10 flex items-center justify-between text-[11px] text-outline">
                    <span>{salon.liaison}</span>
                    <span className="text-primary font-mono">{salon.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Concierge Box */}
          <div className="bg-surface-container-lowest border border-primary/20 p-6 flex flex-col gap-3">
            <span className="font-label-sm text-xs uppercase tracking-widest text-secondary">
              Direct Encrypted Protocol
            </span>
            <p className="font-body-sm text-xs text-on-surface-variant">
              For immediate assistance with time-sensitive high vault allocations:
            </p>
            <div className="flex flex-col gap-2 font-mono text-xs text-on-surface pt-1">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp: +91 98200 48291</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>concierge@sovira.vault</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
