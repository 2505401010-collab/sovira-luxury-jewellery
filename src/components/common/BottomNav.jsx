import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav({ onOpenSalon, onOpenConcierge }) {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 w-full z-40 pb-safe bg-surface/95 backdrop-blur-xl border-t border-primary/10 shadow-[0_-1px_8px_rgba(0,0,0,0.15)]">
      <div className="flex justify-around items-center h-16 md:h-20 px-2">
        {/* Atelier / Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-14 md:h-16 transition-colors ${
            location.pathname === "/" ? "text-primary font-medium" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-[20px] md:text-[22px]">diamond</span>
          <span className="font-label-sm text-[9px] md:text-[10px] tracking-widest uppercase">Atelier</span>
        </Link>

        {/* Exhibition / Collections */}
        <Link
          to="/collections"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-14 md:h-16 transition-colors ${
            location.pathname.startsWith("/collections") || location.pathname.startsWith("/signature") || location.pathname.startsWith("/gold") || location.pathname.startsWith("/silver") || location.pathname.startsWith("/gemstones") || location.pathname.startsWith("/category")
              ? "text-primary font-medium"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-[20px] md:text-[22px]">auto_awesome</span>
          <span className="font-label-sm text-[9px] md:text-[10px] tracking-widest uppercase">Exhibition</span>
        </Link>

        {/* Salon Modal Trigger */}
        <button
          onClick={onOpenSalon}
          className="flex flex-col items-center justify-center gap-1 w-16 h-14 md:h-16 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px] md:text-[22px]">calendar_today</span>
          <span className="font-label-sm text-[9px] md:text-[10px] tracking-widest uppercase">Salon</span>
        </button>

        {/* Vault / Dashboard */}
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-14 md:h-16 transition-colors ${
            location.pathname === "/dashboard" || location.pathname === "/auth"
              ? "text-primary font-medium"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-[20px] md:text-[22px]">lock</span>
          <span className="font-label-sm text-[9px] md:text-[10px] tracking-widest uppercase">Vault</span>
        </Link>

        {/* Liaison / Concierge Modal Trigger */}
        <button
          onClick={onOpenConcierge}
          className="flex flex-col items-center justify-center gap-1 w-16 h-14 md:h-16 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px] md:text-[22px]">support_agent</span>
          <span className="font-label-sm text-[9px] md:text-[10px] tracking-widest uppercase">Liaison</span>
        </button>
      </div>
    </nav>
  );
}
