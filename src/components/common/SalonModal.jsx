import React, { useState } from "react";

export default function SalonModal({ isOpen, onClose, preselectedPiece = null }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "Maharaj Vikramaditya Singhania",
    email: "v.singha@royal-council.in",
    phone: "+91 98200 48291",
    salonLocation: "Mumbai — The Oberoi Salon Suite",
    preferredDate: "2025-04-12",
    preferredTime: "16:00 (Private Sunset Appointment)",
    discretionProtocol: "Armored Twin-Custody Escort",
    notes: preselectedPiece ? `Requesting private viewing of: ${preselectedPiece}` : ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep confirmed state
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-surface-container-low border border-primary/20 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Close salon modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {submitted ? (
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/30">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Protocol Sealed • Confidential Notice
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Salon Appointment Requested
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm leading-relaxed">
              Your dedicated private curator has been notified. A discreet liaison dispatch will reach you via encrypted telephone within two hours to confirm security credentials and salon suite allocations.
            </p>
            <div className="p-3 bg-surface-container border border-primary/15 text-xs text-secondary mt-2 w-full text-left font-mono">
              <div>Appointment ID: SVR-SLN-{(Math.random() * 10000).toFixed(0)}</div>
              <div>Salon: {formData.salonLocation}</div>
              <div>Protocol: {formData.discretionProtocol}</div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary-fixed transition-colors"
            >
              Return to Archives
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 pb-2 border-b border-primary/15">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary">
                Private Viewing Protocol
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Request Private Salon Appointment
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Secluded salon viewing rooms in Mumbai, London, Dubai or by diplomatic invitation.
              </p>
            </div>

            {preselectedPiece && (
              <div className="bg-surface-container p-3 border border-primary/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">diamond</span>
                <span className="font-label-sm text-xs text-primary uppercase tracking-wider">
                  Reserved Artifact: {preselectedPiece}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Patron Full Name & Title
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-surface-container px-3.5 py-2.5 text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-sans"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Encrypted Mobile / WhatsApp
                </label>
                <input
                  required
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-surface-container px-3.5 py-2.5 text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-sans"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Curatorial Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-surface-container px-3.5 py-2.5 text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-sans"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Salon Suite Location
              </label>
              <select
                value={formData.salonLocation}
                onChange={(e) => setFormData({ ...formData, salonLocation: e.target.value })}
                className="bg-surface-container px-3.5 py-2.5 text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-sans"
              >
                <option value="Mumbai — The Oberoi Salon Suite">Mumbai — The Oberoi Salon Suite, Nariman Point</option>
                <option value="London — Old Bond Street Mayfair Suite">London — Old Bond Street, Mayfair</option>
                <option value="Dubai — Gate Precinct DIFC Sovereign Suite">Dubai — Gate Precinct, DIFC Sovereign Suite</option>
                <option value="New Delhi — The Imperial Janpath Archive">New Delhi — The Imperial, Janpath Archive</option>
                <option value="Private Residence / Armored Diplomatic Suite">Private Family Residence / Armored Traveling Vault</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Requested Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="bg-surface-container px-3.5 py-2.5 text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-sans"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Security Protocol
                </label>
                <select
                  value={formData.discretionProtocol}
                  onChange={(e) => setFormData({ ...formData, discretionProtocol: e.target.value })}
                  className="bg-surface-container px-3.5 py-2.5 text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-sans"
                >
                  <option value="Armored Twin-Custody Escort">Armored Twin-Custody Escort</option>
                  <option value="Standard High-Vault Discretion">Standard High-Vault Discretion</option>
                  <option value="Strict Anonymous NDA Protocol">Strict Anonymous NDA Protocol</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Curatorial Inquiries & Specific Pieces
              </label>
              <textarea
                rows="2"
                placeholder="Mention specific karatage, gem requirements or bespoke commission goals..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-surface-container px-3.5 py-2 text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-sans resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-[0.2em] font-semibold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Confirm Salon Appointment Protocol</span>
              </button>
              <span className="font-label-sm text-[10px] text-outline text-center uppercase tracking-widest">
                Strict Discretion Assured • Non-Disclosure Protocols Apply
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
