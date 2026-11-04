import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState("signin");

  // Sign in form state
  const [memberId, setMemberId] = useState("SVR-8902");
  const [passkey, setPasskey] = useState("••••••••••••");

  // Registration form state
  const [regData, setRegData] = useState({
    fullName: "Maharaj Vikramaditya Singhania",
    email: "v.singha@royal-council.in",
    phone: "+91 98200 48291",
    estate: "Singhania Palace Grounds, Mumbai"
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    login(memberId, passkey);
    navigate("/dashboard");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(regData);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col w-full text-on-surface py-12 px-6 md:px-12">
      <div className="max-w-md mx-auto w-full flex flex-col gap-6">
        {/* Brand Crest & Sanctuary Title (Screen 11) */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center mb-3 shadow-md border border-primary/20">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4L28.5 16.5L41.5 21L28.5 25.5L24 38L19.5 25.5L6.5 21L19.5 16.5L24 4Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
              ></path>
              <circle cx="24" cy="21" r="3.5" stroke="currentColor" strokeWidth="1"></circle>
              <path
                d="M24 38V44M20 44H28"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.2"
              ></path>
              <circle cx="24" cy="9" fill="currentColor" r="1"></circle>
              <circle cx="36" cy="21" fill="currentColor" r="1"></circle>
              <circle cx="12" cy="21" fill="currentColor" r="1"></circle>
            </svg>
          </div>

          <span className="font-label-md text-label-md uppercase tracking-[0.28em] text-primary mb-1">
            SOVIRA High Jewelry
          </span>
          <h1 className="font-headline-md text-headline-md text-on-surface">
            Client Sanctuary
          </h1>
          <p className="font-body-sm text-body-sm text-secondary mt-1 max-w-xs leading-relaxed">
            Private portal for Sovereign patrons, bespoke commissions & archivist records.
          </p>
        </div>

        {/* Tab Switcher (Plinth Style) */}
        <div className="w-full bg-surface-container-lowest p-1 border border-primary/15 flex items-center">
          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2.5 px-3 text-center font-label-md text-xs tracking-widest uppercase transition-all duration-300 ${
              activeTab === "signin"
                ? "bg-surface-container-high text-primary shadow-sm border border-primary/20"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Client Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2.5 px-3 text-center font-label-md text-xs tracking-widest uppercase transition-all duration-300 ${
              activeTab === "register"
                ? "bg-surface-container-high text-primary shadow-sm border border-primary/20"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Atelier Registration
          </button>
        </div>

        {/* TAB 1: SIGN IN PANEL */}
        {activeTab === "signin" && (
          <div className="flex flex-col w-full space-y-4">
            {/* Visual Accent Card */}
            <div className="relative w-full h-36 overflow-hidden bg-surface-container-low border border-primary/15 flex items-end p-4">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-35"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnsmVxxHxfRVgYLX2MhTHQJ08Ti2XEU-d4ipuGcbiiu7tkFffDBAJvIvW8suTqwXZpJCKdcoxGTBcJemDq1FdMn14pmDUzKP9luU0Un2ZSYHLZCqwbkX6XT1MNeABdsdd-a7MqsJtitlVr3pq7iDtkXcVPtS_9PNnkUeaA_w2uhJJAeH9QLUJz3bL0LrJdVVv1xWa_f_5jXSLXPH2YLfnnqVabyiPTy0hhY8-vOgs"
                alt="Uncut royal sapphire"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/60 to-transparent"></div>
              <div className="relative z-10">
                <span className="font-label-sm text-xs text-primary uppercase tracking-widest">
                  Salon Authenticator
                </span>
                <p className="font-headline-sm text-lg text-on-surface">
                  Protected Vault Session
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="flex flex-col w-full space-y-4">
              <div className="relative flex flex-col pt-3 bg-surface-container-low px-4 pb-2 border border-primary/10">
                <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                  Client Identification
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="material-symbols-outlined text-outline text-[18px]">account_circle</span>
                  <input
                    type="text"
                    required
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="Email or Member ID (e.g. SVR-8902)"
                    className="w-full bg-transparent font-body-md text-sm text-on-surface placeholder:text-outline-variant focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative flex flex-col pt-3 bg-surface-container-low px-4 pb-2 border border-primary/10">
                <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                  Confidential Passkey
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
                  <input
                    type="password"
                    required
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter passkey or pin"
                    className="w-full bg-transparent font-body-md text-sm text-on-surface placeholder:text-outline-variant focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-[0.2em] font-semibold hover:bg-primary-fixed transition-colors shadow-lg mt-2"
              >
                Access Sovereign Sanctuary
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: REGISTRATION PANEL */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="flex flex-col w-full space-y-4">
            <div className="relative flex flex-col pt-3 bg-surface-container-low px-4 pb-2 border border-primary/10">
              <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                Patron Full Name & Title
              </label>
              <input
                type="text"
                required
                value={regData.fullName}
                onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                placeholder="e.g. Maharaj Vikramaditya Singhania"
                className="w-full bg-transparent font-body-md text-sm text-on-surface placeholder:text-outline-variant focus:outline-none mt-1"
              />
            </div>

            <div className="relative flex flex-col pt-3 bg-surface-container-low px-4 pb-2 border border-primary/10">
              <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                Confidential Phone / WhatsApp
              </label>
              <input
                type="text"
                required
                value={regData.phone}
                onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                placeholder="+91 98000 00000"
                className="w-full bg-transparent font-body-md text-sm text-on-surface placeholder:text-outline-variant focus:outline-none mt-1"
              />
            </div>

            <div className="relative flex flex-col pt-3 bg-surface-container-low px-4 pb-2 border border-primary/10">
              <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                Curatorial Email
              </label>
              <input
                type="email"
                required
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                placeholder="patron@royal-council.in"
                className="w-full bg-transparent font-body-md text-sm text-on-surface placeholder:text-outline-variant focus:outline-none mt-1"
              />
            </div>

            <div className="relative flex flex-col pt-3 bg-surface-container-low px-4 pb-2 border border-primary/10">
              <label className="font-label-sm text-xs text-secondary uppercase tracking-widest">
                Ancestral Estate / City
              </label>
              <input
                type="text"
                required
                value={regData.estate}
                onChange={(e) => setRegData({ ...regData, estate: e.target.value })}
                placeholder="City or Estate grounds"
                className="w-full bg-transparent font-body-md text-sm text-on-surface placeholder:text-outline-variant focus:outline-none mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-[0.2em] font-semibold hover:bg-primary-fixed transition-colors shadow-lg mt-2"
            >
              Inscribe Sovereign Patronage
            </button>
          </form>
        )}

        {/* Privileges of Membership List */}
        <div className="p-5 bg-surface-container-low border border-primary/15 flex flex-col gap-3">
          <span className="font-label-sm text-xs text-primary uppercase tracking-widest">
            Privileges of Sovereign Patronage
          </span>
          <div className="flex flex-col gap-2 font-body-sm text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[16px]">key</span>
              <span>Exclusive access to unpublished high-jewelry lots</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[16px]">security</span>
              <span>White-glove armored transit with Lloyds insurance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[16px]">chat</span>
              <span>Dedicated Chief Gemologist private WhatsApp liaison</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
