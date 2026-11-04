import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

// Components
import Header from "./components/common/Header";
import DrawerNav from "./components/common/DrawerNav";
import BottomNav from "./components/common/BottomNav";
import Footer from "./components/common/Footer";
import SalonModal from "./components/common/SalonModal";
import ConciergeModal from "./components/common/ConciergeModal";

// Pages
import HomePage from "./pages/HomePage";
import HighJewelleryPage from "./pages/HighJewelleryPage";
import SignatureCollectionsPage from "./pages/SignatureCollectionsPage";
import GoldCollectionPage from "./pages/GoldCollectionPage";
import SilverCollectionPage from "./pages/SilverCollectionPage";
import GemstonesCollectionPage from "./pages/GemstonesCollectionPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchFilterPage from "./pages/SearchFilterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import WishlistPage from "./pages/WishlistPage";
import HouseHeritagePage from "./pages/HouseHeritagePage";
import ContactPage from "./pages/ContactPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSalonModalOpen, setIsSalonModalOpen] = useState(false);
  const [salonPiece, setSalonPiece] = useState(null);
  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);

  const handleOpenSalon = (pieceName = null) => {
    setSalonPiece(pieceName);
    setIsSalonModalOpen(true);
  };

  const handleOpenConcierge = () => {
    setIsConciergeModalOpen(true);
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased selection:bg-primary selection:text-on-primary">
      <ScrollToTop />

      {/* Header */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSalon={() => handleOpenSalon()}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Slide-out Drawer */}
      <DrawerNav
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenSalon={() => handleOpenSalon()}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 md:pt-28 pb-20 lg:pb-8 flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route
            path="/collections"
            element={<HighJewelleryPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/signature"
            element={<SignatureCollectionsPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/gold"
            element={<GoldCollectionPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/silver"
            element={<SilverCollectionPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/gemstones"
            element={<GemstonesCollectionPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/category/:slug"
            element={<CategoryPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route
            path="/search"
            element={<SearchFilterPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/bag"
            element={<CartPage onOpenSalon={handleOpenSalon} />}
          />
          <Route
            path="/cart"
            element={<CartPage onOpenSalon={handleOpenSalon} />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route
            path="/house"
            element={
              <HouseHeritagePage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route
            path="/about"
            element={
              <HouseHeritagePage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          {/* Direct Category & Typology Routes */}
          <Route
            path="/rings"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="rings" />}
          />
          <Route
            path="/necklaces"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="necklaces" />}
          />
          <Route
            path="/earrings"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="earrings" />}
          />
          <Route
            path="/bracelets"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="bracelets" />}
          />
          <Route
            path="/bangles"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="bangles" />}
          />
          <Route
            path="/pendants"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="pendants" />}
          />
          <Route
            path="/bridal"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="bridal-jewellery" />}
          />
          <Route
            path="/bridal-jewellery"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="bridal-jewellery" />}
          />
          <Route
            path="/diamond"
            element={<CategoryPage onOpenSalon={handleOpenSalon} slugOverride="diamond" />}
          />

          {/* Contact, Orders, Tracking & Admin Suites */}
          <Route
            path="/contact"
            element={
              <ContactPage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <OrdersPage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route
            path="/tracking"
            element={
              <OrdersPage
                onOpenSalon={handleOpenSalon}
                onOpenConcierge={handleOpenConcierge}
              />
            }
          />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        onOpenSalon={() => handleOpenSalon()}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        onOpenSalon={() => handleOpenSalon()}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Global Modals */}
      <SalonModal
        isOpen={isSalonModalOpen}
        onClose={() => setIsSalonModalOpen(false)}
        preselectedPiece={salonPiece}
      />

      <ConciergeModal
        isOpen={isConciergeModalOpen}
        onClose={() => setIsConciergeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <MainLayout />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
