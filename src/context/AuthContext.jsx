import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext();

export const DEMO_PATRON = {
  id: "patron-001",
  memberId: "SVR-8902",
  title: "Maharaj",
  fullName: "Maharaj Vikramaditya Singhania",
  email: "v.singha@royal-council.in",
  phone: "+91 98200 48291",
  role: "customer",
  tier: "Sovereign Patron",
  since: "2021",
  dedicatedCurator: {
    name: "Aditi Somani",
    division: "Haute Joaillerie & High Vault Commissions",
    status: "Active Liaison"
  },
  privateLiaison: {
    name: "Devika Rathore",
    salon: "Mumbai Salon — The Oberoi"
  },
  deliveryAddress: {
    estate: "Singhania Palace Grounds",
    line1: "42 Sovereign Crescent, Malabar Hill",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400006",
    country: "India"
  },
  archivalPiecesCount: 4,
  activeCommissionsCount: 1
};

export const DEMO_ADMIN = {
  id: "admin-001",
  memberId: "SVR-0001-ARCHIVIST",
  title: "Grand Archivist",
  fullName: "Chief Curator Vikramaditya",
  email: "admin@sovira.vault",
  phone: "+91 98200 00001",
  role: "admin",
  tier: "Master Archivist",
  since: "2019"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sovira_user");
      return saved ? JSON.parse(saved) : DEMO_PATRON;
    } catch (e) {
      return DEMO_PATRON;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user));

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("sovira_user", JSON.stringify(user));
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("sovira_user");
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = async (identifier, passkey) => {
    // Attempt live backend authentication
    try {
      if (identifier?.includes("@")) {
        const res = await authApi.login(identifier, passkey || "PatronPasskey@2025");
        if (res.success && res.user) {
          const liveUser = {
            ...res.user,
            token: res.token
          };
          setUser(liveUser);
          setIsAuthenticated(true);
          return { success: true, user: liveUser };
        }
      }
    } catch (apiErr) {
      console.warn("[SOVIRA Auth] Live API notice:", apiErr.message, "Falling back to local session.");
    }

    // Graceful offline/demo fallback
    const isAdminUser = identifier?.toLowerCase().includes("admin");
    const base = isAdminUser ? DEMO_ADMIN : DEMO_PATRON;
    const patron = {
      ...base,
      memberId: identifier || base.memberId,
      email: identifier?.includes("@") ? identifier : base.email,
      fullName: identifier?.includes("@")
        ? identifier.split("@")[0].toUpperCase()
        : base.fullName
    };

    setUser(patron);
    setIsAuthenticated(true);
    return { success: true, user: patron };
  };

  const register = async (registrationData) => {
    try {
      const res = await authApi.register({
        fullName: registrationData.fullName,
        email: registrationData.email,
        password: registrationData.password || "PatronPasskey@2025",
        phone: registrationData.phone,
        title: registrationData.title || "Sovereign Patron"
      });

      if (res.success && res.user) {
        const liveUser = {
          ...res.user,
          token: res.token
        };
        setUser(liveUser);
        setIsAuthenticated(true);
        return { success: true, user: liveUser };
      }
    } catch (apiErr) {
      console.warn("[SOVIRA Auth] Live registration API notice:", apiErr.message, "Falling back to local session.");
    }

    const patron = {
      ...DEMO_PATRON,
      fullName: registrationData.fullName || "Sovereign Patron",
      email: registrationData.email || "patron@sovira.vault",
      phone: registrationData.phone || "+91 98000 00000",
      memberId: `SVR-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setUser(patron);
    setIsAuthenticated(true);
    return { success: true, user: patron };
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = Boolean(
    user?.role === "admin" ||
    user?.email === "admin@sovira.vault" ||
    user?.memberId?.includes("ARCHIVIST")
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        resetToDemo: () => setUser(DEMO_PATRON)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
