import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PRODUCTS, formatINR } from "../data/products";

export default function DashboardPage({ onOpenSalon, onOpenConcierge }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const vaultPieces = PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col w-full text-on-surface">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 w-full flex flex-col gap-8">
        {/* Sovereign Welcome Header (Screen 12) */}
        <div className="flex flex-col gap-1 pb-4 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
              Sanctuary • Vault Access
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-light tracking-tight">
              Sovereign Portfolio
            </h1>
            <button
              onClick={() => {
                logout();
                navigate("/auth");
              }}
              className="font-label-sm text-xs text-secondary hover:text-error uppercase tracking-wider self-start sm:self-auto"
            >
              Sign Out Session
            </button>
          </div>
          <p className="font-body-sm text-on-surface-variant">
            Archival custody, private commissions dossier & high vault holdings.
          </p>
        </div>

        {/* Client Profile Plinth Card */}
        <div className="relative bg-surface-container-low border border-primary/20 p-6 flex flex-col gap-5 overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary relative border border-primary/30">
                <span className="material-symbols-outlined text-[28px]">stars</span>
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[10px]">check</span>
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-xs uppercase tracking-widest text-primary truncate">
                  {user?.tier || "Sovereign Patron"} • {user?.memberId || "SVR-8902"}
                </span>
                <h2 className="font-headline-sm text-xl text-on-surface leading-tight truncate">
                  {user?.fullName || "Maharaj Vikramaditya Singhania"}
                </h2>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Patronage commenced {user?.since || "2021"} • Sovereign Council Member
                </span>
              </div>
            </div>

            <button
              onClick={onOpenSalon}
              className="px-5 py-2.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest hover:bg-primary-fixed transition-colors self-stretch sm:self-auto text-center"
            >
              Book Salon Viewing
            </button>
          </div>

          {/* Curator Liaison Pill */}
          <div className="bg-surface-container px-4 py-3 border border-primary/15 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Dedicated Curator
                </span>
                <span className="font-body-sm text-sm text-on-surface truncate font-medium">
                  {user?.dedicatedCurator?.name || "Aditi Somani"} — {user?.dedicatedCurator?.division || "Haute Joaillerie"}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenConcierge}
              className="bg-surface-container-high hover:bg-surface-bright text-primary text-xs font-label-sm px-3 py-1.5 transition-colors uppercase tracking-wider border border-primary/20"
            >
              Contact Liaison
            </button>
          </div>
        </div>

        {/* Quick Stats Horizon */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-4 border border-primary/15 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="material-symbols-outlined text-[20px]">diamond</span>
              <span className="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">
                Vault
              </span>
            </div>
            <div>
              <span className="font-headline-lg-mobile text-2xl text-on-surface block leading-none mb-1">
                04
              </span>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant block leading-tight">
                Archival Pieces
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 border border-primary/15 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="material-symbols-outlined text-[20px]">architecture</span>
              <span className="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">
                Atelier
              </span>
            </div>
            <div>
              <span className="font-headline-lg-mobile text-2xl text-on-surface block leading-none mb-1">
                01
              </span>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant block leading-tight">
                Active Commission
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 border border-primary/15 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="material-symbols-outlined text-[20px]">shield</span>
              <span className="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">
                Certificates
              </span>
            </div>
            <div>
              <span className="font-headline-lg-mobile text-2xl text-on-surface block leading-none mb-1">
                100%
              </span>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant block leading-tight">
                Provenance Sealed
              </span>
            </div>
          </div>
        </div>

        {/* Active Bespoke Commission Card */}
        <div className="bg-surface-container-low border border-primary/20 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-medium">
                Active Atelier Commission • In Progress
              </span>
            </div>
            <span className="font-mono text-xs text-secondary">REF: CMS-8819</span>
          </div>

          <div>
            <h3 className="font-headline-sm text-lg text-on-surface">
              Kundan Enamel Parure — Royal Bridal Choker
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              22K Hallmarked Gold • 68.4 ct Syndicate Polki Diamonds • Jaipuri Meenakari
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-secondary">Stage: Hand-Setting Pavé Gems (Jaipur Atelier)</span>
              <span className="text-primary font-bold">75% Complete</span>
            </div>
            <div className="w-full h-2 bg-surface-container overflow-hidden">
              <div className="h-full bg-primary w-3/4 transition-all duration-500"></div>
            </div>
            <span className="text-[11px] text-outline font-light">
              Estimated Diplomatic Presentation: May 2025 • Oberoi Salon Suite, Mumbai
            </span>
          </div>
        </div>

        {/* Order History & Tracking Quick Access */}
        <div className="bg-surface-container-low border border-primary/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm text-on-surface">
                Diplomatic Orders & Armored Escort Registry
              </span>
              <span className="font-body-sm text-xs text-secondary">
                Track active transit coordinates and download sealed cryptographic provenance receipts.
              </span>
            </div>
          </div>
          <Link
            to="/orders"
            className="px-5 py-2 bg-surface-container border border-primary/30 text-primary font-label-md text-xs uppercase tracking-widest hover:bg-surface-container-high transition-colors text-center shrink-0"
          >
            Manage Orders & Transit
          </Link>
        </div>

        {/* Vault Archival Custody Holdings */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-secondary">
              High Vault Holdings & Custody
            </span>
            <div className="flex items-center gap-4">
              <Link to="/orders" className="font-label-sm text-xs uppercase tracking-wider text-secondary hover:text-primary">
                Order History
              </Link>
              <Link to="/wishlist" className="font-label-sm text-xs uppercase tracking-wider text-primary hover:underline">
                View Saved Folio
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {vaultPieces.map((piece) => (
              <div
                key={piece.id}
                className="bg-surface-container p-4 border border-primary/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 bg-surface-container-lowest overflow-hidden border border-primary/15">
                    <img src={piece.images?.[0]?.url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                      Vault Allocation • {piece.sku}
                    </span>
                    <h4 className="font-headline-sm text-sm text-on-surface">
                      {piece.title}
                    </h4>
                    <span className="text-xs text-secondary font-mono">
                      Declared Valuation: {formatINR(piece.priceINR)}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/product/${piece.id}`}
                  className="px-3.5 py-1.5 border border-primary/20 text-xs text-primary hover:bg-surface-container-high transition-colors uppercase tracking-wider shrink-0"
                >
                  View Dossier
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
