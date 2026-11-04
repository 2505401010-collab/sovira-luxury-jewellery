import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { adminApi, categoryApi, productApi } from "../services/api";
import { PRODUCTS, CATEGORIES, formatINR } from "../data/products";

export default function AdminDashboardPage() {
  const { user, isAdmin, login } = useAuth();

  const [activeTab, setActiveTab] = useState("overview"); // overview | orders | products | categories | patrons
  const [adminPasskey, setAdminPasskey] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Live Stats
  const [stats, setStats] = useState({
    totalRevenueINR: 58500000,
    totalOrders: 14,
    totalPatrons: 28,
    totalProducts: PRODUCTS.length,
    lowStockAlerts: 3
  });

  // Orders State
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("In Transit");
  const [newTracking, setNewTracking] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Products State
  const [catalog, setCatalog] = useState(PRODUCTS);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    sku: "",
    category: "Rings",
    categorySlug: "rings",
    priceINR: 1500000,
    inventoryCount: 1,
    metal: "22K Royal Hallmarked Gold",
    image: ""
  });

  // Categories State
  const [categoriesList, setCategoriesList] = useState(CATEGORIES.filter((c) => c.id !== "all"));
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");

  // Customers State
  const [patrons, setPatrons] = useState([
    {
      _id: "patron-01",
      fullName: "Maharaj Vikramaditya Singhania",
      email: "v.singha@royal-council.in",
      phone: "+91 98200 48291",
      memberId: "SVR-8902",
      tier: "Sovereign Patron",
      createdAt: "2024-01-15"
    },
    {
      _id: "patron-02",
      fullName: "Princess Gayatri Devi Somani",
      email: "g.somani@mayfair-consortium.uk",
      phone: "+44 7700 900122",
      memberId: "SVR-9014",
      tier: "Imperial Vault Member",
      createdAt: "2024-03-20"
    },
    {
      _id: "patron-03",
      fullName: "Sheikha Reem Al-Nuaimi",
      email: "reem.nuaimi@difc-capital.ae",
      phone: "+971 50 123 4567",
      memberId: "SVR-9420",
      tier: "Sovereign Patron",
      createdAt: "2024-06-11"
    }
  ]);

  // Load Data if Authorized
  useEffect(() => {
    if (!isAdmin) return;

    async function loadAdminData() {
      try {
        const statsRes = await adminApi.getStats();
        if (statsRes.success && statsRes.stats) {
          setStats(statsRes.stats);
        }
      } catch (e) {
        // Keep demo defaults
      }

      try {
        setOrdersLoading(true);
        const ordRes = await adminApi.getOrders();
        if (ordRes.success && ordRes.orders) {
          setOrders(ordRes.orders);
        } else {
          // Default initial demo orders
          setOrders([
            {
              _id: "ord-890211",
              orderReference: "SVR-890211",
              user: { fullName: "Maharaj Vikramaditya Singhania", email: "v.singha@royal-council.in" },
              createdAt: new Date().toISOString(),
              fulfillmentStatus: "In Transit",
              transitMethodLabel: "Armored Diplomatic Courier",
              financialSummary: { totalValuationINR: 19055000 },
              paymentDetails: { status: "PAID" },
              items: [{ title: "The Padmavati Jharokha Collar", sku: "SVR-8902-DX", quantity: 1 }]
            },
            {
              _id: "ord-881900",
              orderReference: "SVR-881900",
              user: { fullName: "Princess Gayatri Devi", email: "g.somani@mayfair.uk" },
              createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
              fulfillmentStatus: "Confirmed",
              transitMethodLabel: "Direct Private Salon Presentation",
              financialSummary: { totalValuationINR: 6592000 },
              paymentDetails: { status: "AUTHORIZED" },
              items: [{ title: "The Nizam Royal Sapphire Ring", sku: "SVR-8911-RG", quantity: 1 }]
            }
          ]);
        }
      } catch (e) {
        // demo fallback
      } finally {
        setOrdersLoading(false);
      }

      try {
        const custRes = await adminApi.getCustomers();
        if (custRes.success && custRes.patrons) {
          setPatrons(custRes.patrons);
        }
      } catch (e) {}
    }

    loadAdminData();
  }, [isAdmin]);

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setIsAuthorizing(true);
    setAuthError("");

    try {
      const res = await login("admin@sovira.vault", adminPasskey || "SoviraAdmin@2025");
      if (!res.success) {
        setAuthError("Discretionary access denied. Master passkey invalid.");
      }
    } catch (err) {
      setAuthError(err.message || "Admin authorization failed");
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleUpdateOrderStatus = async () => {
    if (!selectedOrder) return;
    try {
      await adminApi.updateOrderStatus(selectedOrder._id, {
        fulfillmentStatus: newStatus,
        courierTrackingNumber: newTracking
      });
    } catch (e) {
      // Local fallback
    }

    setOrders((prev) =>
      prev.map((ord) =>
        ord._id === selectedOrder._id
          ? { ...ord, fulfillmentStatus: newStatus, courierTrackingNumber: newTracking }
          : ord
      )
    );
    setSelectedOrder(null);
  };

  const handleUpdateStock = async (pieceId, delta) => {
    setCatalog((prev) =>
      prev.map((item) => {
        if (item.id === pieceId || item.sku === pieceId) {
          const updated = Math.max(0, (item.inventoryCount || 1) + delta);
          try {
            adminApi.updateInventory(item._id || item.id, updated);
          } catch (e) {}
          return { ...item, inventoryCount: updated };
        }
        return item;
      })
    );
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const createdPiece = {
      id: newProduct.sku.toLowerCase(),
      sku: newProduct.sku.toUpperCase(),
      title: newProduct.title,
      category: newProduct.category,
      categorySlug: newProduct.categorySlug,
      collection: "High Jewellery",
      collectionSlug: "high-jewellery",
      priceINR: Number(newProduct.priceINR),
      inventoryCount: Number(newProduct.inventoryCount),
      bullionSpecs: { metal: newProduct.metal },
      images: [
        {
          url:
            newProduct.image ||
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
          label: "Vitrine Primary"
        }
      ]
    };

    setCatalog([createdPiece, ...catalog]);
    setShowAddProductModal(false);
    setNewProduct({
      title: "",
      sku: "",
      category: "Rings",
      categorySlug: "rings",
      priceINR: 1500000,
      inventoryCount: 1,
      metal: "22K Royal Hallmarked Gold",
      image: ""
    });
  };

  const handleDeleteProduct = (pieceId) => {
    if (window.confirm("Remove this masterpiece from the active archival catalog?")) {
      setCatalog((prev) => prev.filter((p) => p.id !== pieceId && p.sku !== pieceId));
      try {
        productApi.delete(pieceId);
      } catch (e) {}
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    const slug = newCategoryName.toLowerCase().replace(/\s+/g, "-");
    const newCat = {
      id: slug,
      name: newCategoryName,
      slug,
      description: newCategoryDesc || "Imperial curations under sovereign classification."
    };
    setCategoriesList([...categoriesList, newCat]);
    setNewCategoryName("");
    setNewCategoryDesc("");
    try {
      categoryApi.create(newCat);
    } catch (e) {}
  };

  const handleDeleteCategory = (catSlug) => {
    setCategoriesList((prev) => prev.filter((c) => c.slug !== catSlug));
  };

  // If NOT ADMIN, show Royal Vault Gate
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 text-on-surface">
        <div className="max-w-md w-full bg-surface-container-low border border-primary/30 p-8 flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary border border-primary/40">
              <span className="material-symbols-outlined text-[28px]">shield</span>
            </div>
            <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
              Restricted Curatorial Chamber
            </span>
            <h1 className="font-headline-sm text-2xl text-on-surface">
              Master Admin Access
            </h1>
            <p className="font-body-sm text-xs text-secondary max-w-sm">
              This sanctuary is restricted to authorized curators, lapidary directors, and executive atelier administrators.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-error/15 border border-error/30 text-error text-xs text-center font-mono">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                Curator Passkey (Default: SoviraAdmin@2025)
              </label>
              <input
                type="password"
                required
                value={adminPasskey}
                onChange={(e) => setAdminPasskey(e.target.value)}
                placeholder="••••••••••••"
                className="bg-surface-container border border-primary/20 px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthorizing}
              className="py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary-fixed transition-colors"
            >
              {isAuthorizing ? "Validating Credentials..." : "Authenticate as Master Curator"}
            </button>
          </form>

          <div className="pt-2 border-t border-primary/10 text-center text-xs text-outline font-mono">
            Direct Access: admin@sovira.vault
          </div>
        </div>
      </div>
    );
  }

  // AUTHORIZED ADMIN SUITE
  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Admin Top Header */}
      <section className="px-6 md:px-16 pt-8 pb-8 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
                Executive Atelier Portal • Master Curator
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-2xl md:text-3xl text-on-surface font-light tracking-wide">
              Maison Administration Suite
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-secondary px-3 py-1 bg-surface-container border border-primary/20">
              Session: Chief Curator Vikramaditya
            </span>
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 border border-primary/30 text-primary text-xs uppercase tracking-wider hover:bg-surface-container transition-colors"
            >
              Exit to Patron Portal
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="max-w-6xl mx-auto w-full flex items-center gap-2 pt-6 overflow-x-auto no-scrollbar">
          {[
            { id: "overview", label: "Executive KPIs", icon: "monitoring" },
            { id: "orders", label: `Orders Registry (${orders.length})`, icon: "local_shipping" },
            { id: "products", label: `Masterpieces (${catalog.length})`, icon: "diamond" },
            { id: "categories", label: `Categories (${categoriesList.length})`, icon: "category" },
            { id: "patrons", label: `Patron Registry (${patrons.length})`, icon: "groups" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-label-md text-xs uppercase tracking-widest flex items-center gap-2 shrink-0 transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-on-primary font-medium"
                  : "bg-surface-container text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-10 w-full flex flex-col gap-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface-container-low border border-primary/20 p-5 flex flex-col gap-2 shadow-md">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                  Gross Revenue (INR)
                </span>
                <span className="font-display-lg-mobile text-2xl text-on-surface font-light">
                  {formatINR(stats.totalRevenueINR || 58500000)}
                </span>
                <span className="text-[11px] text-outline font-mono">Across all royal orders</span>
              </div>

              <div className="bg-surface-container-low border border-primary/20 p-5 flex flex-col gap-2 shadow-md">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                  Total Orders
                </span>
                <span className="font-display-lg-mobile text-2xl text-on-surface font-light">
                  {stats.totalOrders || orders.length}
                </span>
                <span className="text-[11px] text-outline font-mono">100% Cryptographically Sealed</span>
              </div>

              <div className="bg-surface-container-low border border-primary/20 p-5 flex flex-col gap-2 shadow-md">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                  Registered Patrons
                </span>
                <span className="font-display-lg-mobile text-2xl text-on-surface font-light">
                  {stats.totalPatrons || patrons.length}
                </span>
                <span className="text-[11px] text-outline font-mono">Sovereign Council Members</span>
              </div>

              <div className="bg-surface-container-low border border-primary/20 p-5 flex flex-col gap-2 shadow-md">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                  Catalog Masterpieces
                </span>
                <span className="font-display-lg-mobile text-2xl text-on-surface font-light">
                  {catalog.length}
                </span>
                <span className="text-[11px] text-outline font-mono">
                  {stats.lowStockAlerts || 3} pieces low stock
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-surface-container-low border border-primary/20 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                <h3 className="font-headline-sm text-base text-on-surface">
                  Recent Dispatch Activity
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-primary uppercase tracking-wider font-label-md hover:underline"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-primary/15 text-secondary uppercase tracking-wider">
                      <th className="py-2.5 px-3">Order Ref</th>
                      <th className="py-2.5 px-3">Patron</th>
                      <th className="py-2.5 px-3">Valuation</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord._id} className="border-b border-primary/10 hover:bg-surface-container">
                        <td className="py-3 px-3 text-primary font-bold">{ord.orderReference}</td>
                        <td className="py-3 px-3 text-on-surface">{ord.user?.fullName || "Patron Singhania"}</td>
                        <td className="py-3 px-3">{formatINR(ord.financialSummary?.totalValuationINR)}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 bg-surface-container-high text-primary border border-primary/20">
                            {ord.fulfillmentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setNewStatus(ord.fulfillmentStatus);
                              setActiveTab("orders");
                            }}
                            className="text-primary hover:underline"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-primary/15">
              <div>
                <h2 className="font-headline-sm text-lg text-on-surface">
                  Sovereign Orders Ledger
                </h2>
                <span className="font-body-sm text-xs text-secondary">
                  Manage fulfillment lifecycles, payment authorizations, and assign armed diplomatic courier escort numbers.
                </span>
              </div>
            </div>

            {/* Modal / Inline Status Editor */}
            {selectedOrder && (
              <div className="bg-surface-container border border-primary/30 p-6 flex flex-col gap-4 shadow-xl mb-4">
                <div className="flex items-center justify-between pb-2 border-b border-primary/15">
                  <span className="font-label-sm text-xs uppercase tracking-widest text-primary">
                    Update Order Status • Ref: {selectedOrder.orderReference}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-secondary hover:text-primary text-xs uppercase"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                      Fulfillment Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                    >
                      <option>Confirmed</option>
                      <option>In Transit</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                      <option>Vault Sealed Escrow</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                      Armed Escort Tracking Number
                    </label>
                    <input
                      type="text"
                      value={newTracking}
                      onChange={(e) => setNewTracking(e.target.value)}
                      placeholder="e.g. BRK-IND-890211"
                      className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleUpdateOrderStatus}
                  className="self-end px-5 py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest hover:bg-primary-fixed transition-colors"
                >
                  Save Dispatch Updates
                </button>
              </div>
            )}

            {/* Orders Table */}
            <div className="bg-surface-container-low border border-primary/20 overflow-x-auto shadow-md">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-primary/15 text-secondary uppercase tracking-wider bg-surface-container/50">
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Patron Details</th>
                    <th className="py-3 px-4">Acquisition Pieces</th>
                    <th className="py-3 px-4">Total Settled</th>
                    <th className="py-3 px-4">Transit Protocol</th>
                    <th className="py-3 px-4">Fulfillment</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord._id} className="border-b border-primary/10 hover:bg-surface-container">
                      <td className="py-3.5 px-4 text-primary font-bold">{ord.orderReference}</td>
                      <td className="py-3.5 px-4 text-outline">
                        {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-on-surface block">{ord.user?.fullName || "Patron Singhania"}</span>
                        <span className="text-[10px] text-outline">{ord.user?.email}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {ord.items?.map((it, i) => (
                          <span key={i} className="block text-[11px] text-on-surface-variant truncate max-w-[200px]">
                            • {it.title} ({it.quantity || 1}x)
                          </span>
                        ))}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-on-surface">
                        {formatINR(ord.financialSummary?.totalValuationINR)}
                      </td>
                      <td className="py-3.5 px-4 text-outline">
                        {ord.transitMethodLabel || "Armored Diplomatic Courier"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-surface-container-high text-primary border border-primary/20 text-[10px]">
                          {ord.fulfillmentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setNewStatus(ord.fulfillmentStatus);
                            setNewTracking(ord.courierTrackingNumber || "");
                          }}
                          className="px-2.5 py-1 border border-primary/20 text-primary hover:bg-surface-container text-[11px]"
                        >
                          Modify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS CATALOG & STOCK */}
        {activeTab === "products" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-primary/15">
              <div>
                <h2 className="font-headline-sm text-lg text-on-surface">
                  Vault Masterpieces Catalog & Inventory
                </h2>
                <span className="font-body-sm text-xs text-secondary">
                  Add new jewellery creations, modify valuation parameters, and manage live vault inventory allocations.
                </span>
              </div>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest hover:bg-primary-fixed transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Inscribe New Piece</span>
              </button>
            </div>

            {/* Add Product Modal */}
            {showAddProductModal && (
              <div className="bg-surface-container border border-primary/30 p-6 flex flex-col gap-4 shadow-2xl mb-4">
                <div className="flex items-center justify-between pb-2 border-b border-primary/15">
                  <span className="font-label-sm text-xs uppercase tracking-widest text-primary">
                    Inscribe New Masterpiece into Royal Archives
                  </span>
                  <button
                    onClick={() => setShowAddProductModal(false)}
                    className="text-secondary hover:text-primary text-xs uppercase"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                        Piece Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        placeholder="e.g. Royal Golconda Solitaire Ring"
                        className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                        Vault SKU *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                        placeholder="e.g. SVR-9920-RG"
                        className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                        Category
                      </label>
                      <select
                        value={newProduct.categorySlug}
                        onChange={(e) => {
                          const slug = e.target.value;
                          const name = categoriesList.find((c) => c.slug === slug)?.name || "Rings";
                          setNewProduct({ ...newProduct, categorySlug: slug, category: name });
                        }}
                        className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                      >
                        {categoriesList.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                        Valuation INR *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProduct.priceINR}
                        onChange={(e) => setNewProduct({ ...newProduct, priceINR: e.target.value })}
                        className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                        Bullion Metal
                      </label>
                      <input
                        type="text"
                        value={newProduct.metal}
                        onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })}
                        className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[10px] uppercase tracking-widest text-secondary">
                        Vault Inventory
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newProduct.inventoryCount}
                        onChange={(e) => setNewProduct({ ...newProduct, inventoryCount: e.target.value })}
                        className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="self-end px-5 py-2.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest hover:bg-primary-fixed transition-colors"
                  >
                    Confirm & Inscribe Piece
                  </button>
                </form>
              </div>
            )}

            {/* Catalog Table */}
            <div className="bg-surface-container-low border border-primary/20 overflow-x-auto shadow-md">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-primary/15 text-secondary uppercase tracking-wider bg-surface-container/50">
                    <th className="py-3 px-4">Masterpiece</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Valuation (INR)</th>
                    <th className="py-3 px-4 text-center">Stock Count</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catalog.map((piece) => (
                    <tr key={piece.id || piece.sku} className="border-b border-primary/10 hover:bg-surface-container">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={piece.images?.[0]?.url}
                          alt=""
                          className="w-10 h-10 object-cover border border-primary/15"
                        />
                        <span className="text-on-surface font-sans font-medium text-xs">
                          {piece.title}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-primary font-bold">{piece.sku}</td>
                      <td className="py-3 px-4 text-outline">{piece.category}</td>
                      <td className="py-3 px-4 font-bold">{formatINR(piece.priceINR || piece.valuationINR)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleUpdateStock(piece.id || piece.sku, -1)}
                            className="w-6 h-6 bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-primary border border-primary/20"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold">
                            {piece.inventoryCount !== undefined ? piece.inventoryCount : 1}
                          </span>
                          <button
                            onClick={() => handleUpdateStock(piece.id || piece.sku, 1)}
                            className="w-6 h-6 bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-primary border border-primary/20"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteProduct(piece.id || piece.sku)}
                          className="text-error hover:underline text-[11px]"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORIES MANAGEMENT */}
        {activeTab === "categories" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-primary/15">
              <div>
                <h2 className="font-headline-sm text-lg text-on-surface">
                  Jewellery Typologies & Materials
                </h2>
                <span className="font-body-sm text-xs text-secondary">
                  Manage the curatorial taxomony (Rings, Necklaces, Precious Metals, Gemstone suites).
                </span>
              </div>
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="bg-surface-container p-4 border border-primary/20 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                required
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category Name (e.g. Royal Brooches)"
                className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface w-full sm:w-1/3 focus:outline-none"
              />
              <input
                type="text"
                value={newCategoryDesc}
                onChange={(e) => setNewCategoryDesc(e.target.value)}
                placeholder="Curatorial Description"
                className="bg-surface-container-high border border-primary/20 px-3 py-2 text-xs font-mono text-on-surface w-full sm:w-1/2 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest shrink-0"
              >
                Inscribe Category
              </button>
            </form>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categoriesList.map((cat) => (
                <div
                  key={cat.slug}
                  className="bg-surface-container-low p-4 border border-primary/15 flex flex-col justify-between gap-3 shadow-sm"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-base text-primary font-medium">
                        {cat.name}
                      </span>
                      <span className="font-mono text-[10px] text-outline">/{cat.slug}</span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-primary/10 flex items-center justify-between">
                    <Link
                      to={`/category/${cat.slug}`}
                      className="text-xs text-primary hover:underline font-mono"
                    >
                      View Live Vitrine →
                    </Link>
                    <button
                      onClick={() => handleDeleteCategory(cat.slug)}
                      className="text-error hover:underline text-[11px] font-mono"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PATRONS REGISTRY */}
        {activeTab === "patrons" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-primary/15">
              <div>
                <h2 className="font-headline-sm text-lg text-on-surface">
                  Patron Registry & Sanctuary Dossier
                </h2>
                <span className="font-body-sm text-xs text-secondary">
                  High-net-worth client accounts, sovereign council allocations, and private concierge liaisons.
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low border border-primary/20 overflow-x-auto shadow-md">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-primary/15 text-secondary uppercase tracking-wider bg-surface-container/50">
                    <th className="py-3 px-4">Member ID</th>
                    <th className="py-3 px-4">Patron Name</th>
                    <th className="py-3 px-4">Confidential Email</th>
                    <th className="py-3 px-4">Direct Contact</th>
                    <th className="py-3 px-4">Sanctuary Tier</th>
                    <th className="py-3 px-4">Patron Since</th>
                  </tr>
                </thead>
                <tbody>
                  {patrons.map((pat) => (
                    <tr key={pat._id || pat.memberId} className="border-b border-primary/10 hover:bg-surface-container">
                      <td className="py-3.5 px-4 text-primary font-bold">{pat.memberId || "SVR-8902"}</td>
                      <td className="py-3.5 px-4 text-on-surface font-sans font-medium text-xs">
                        {pat.fullName}
                      </td>
                      <td className="py-3.5 px-4 text-outline">{pat.email}</td>
                      <td className="py-3.5 px-4 text-outline">{pat.phone || "+91 98200 48291"}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-surface-container-high text-primary border border-primary/20 text-[10px]">
                          {pat.tier || "Sovereign Patron"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-outline">
                        {pat.createdAt ? new Date(pat.createdAt).getFullYear() : "2024"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
