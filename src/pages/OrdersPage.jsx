import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { orderApi } from "../services/api";
import { formatINR } from "../data/products";
import { useAuth } from "../context/AuthContext";

export default function OrdersPage({ onOpenSalon, onOpenConcierge }) {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(initialRef ? "tracking" : "history");
  const [trackingInput, setTrackingInput] = useState(initialRef || "SVR-890211");
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Demo fallback order if user has none yet
  const DEMO_ORDERS = [
    {
      _id: "ord-demo-01",
      orderReference: "SVR-890211",
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      fulfillmentStatus: "In Transit",
      transitMethodLabel: "Armored Diplomatic Courier to Private Residence",
      financialSummary: {
        subtotalINR: 18500000,
        taxGSTINR: 555000,
        totalValuationINR: 19055000
      },
      paymentDetails: {
        methodLabel: "Sovereign Amex Centurion • Escrow Sealed",
        status: "PAID"
      },
      items: [
        {
          title: "The Padmavati Jharokha Collar",
          sku: "SVR-8902-DX",
          priceSnapshotINR: 18500000,
          quantity: 1,
          metalPurity: "22K Royal Hallmarked Gold",
          imageSnapshot: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4dCcKySnUKxXdhbUaNBSlUCPHqoe_2dbmDsmEWQiaf_HcqkVwIsPL5m8nKPugqF5dK73LVIMsVU7FzbNZvFtelmtf2eLSMIIcXLfE_IcNQkF5MzRlxDx58I6_q1NLtcTgjC-tzL8P5rsEY6sbnDbiQOl5F3moN5lVWztvEQsv9qjGKrZCN0hu4-1YJcLgic8kTRhRqigWd5Lk-mIhKkB3pq8WCi-GsPQFlB0fC5s"
        }
      ]
    }
  ];

  useEffect(() => {
    async function fetchOrders() {
      setOrdersLoading(true);
      try {
        const res = await orderApi.getMyOrders();
        if (res.success && res.orders && res.orders.length > 0) {
          setOrders(res.orders);
        } else {
          // Check local stored order from recent checkout
          const localOrder = localStorage.getItem("sovira_last_order");
          if (localOrder) {
            setOrders([JSON.parse(localOrder), ...DEMO_ORDERS]);
          } else {
            setOrders(DEMO_ORDERS);
          }
        }
      } catch (e) {
        const localOrder = localStorage.getItem("sovira_last_order");
        if (localOrder) {
          setOrders([JSON.parse(localOrder), ...DEMO_ORDERS]);
        } else {
          setOrders(DEMO_ORDERS);
        }
      } finally {
        setOrdersLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleTrack = async (refToTrack) => {
    const target = (refToTrack || trackingInput).trim().toUpperCase();
    if (!target) return;
    setTrackingLoading(true);
    setTrackingError("");

    try {
      const res = await orderApi.trackOrder(target);
      if (res.success) {
        setTrackingResult(res);
      } else {
        throw new Error(res.message || "Order not found");
      }
    } catch (err) {
      // Create local simulated timeline for the reference
      const matched = orders.find((o) => o.orderReference?.toUpperCase() === target);
      setTrackingResult({
        orderReference: target,
        fulfillmentStatus: matched ? matched.fulfillmentStatus : "In Transit",
        transitMethod: matched ? matched.transitMethodLabel : "Armored Diplomatic Courier",
        totalValuationINR: matched?.financialSummary?.totalValuationINR || 19055000,
        courierDetails: {
          agency: "Brink's Sovereign Global Diplomatic Fleet",
          trackingNumber: `BRK-IND-${target.replace("SVR-", "")}`,
          escortOfficer: "Capt. Ranvijay Singh Rathore",
          vehicleType: "Class B6 Ballistic Armored Transport"
        },
        milestones: [
          {
            step: 1,
            title: "Jaipur High Vault Allocation",
            description: "Masterpiece withdrawn from vault custody; BIS 916 hallmarks re-assayed.",
            status: "completed"
          },
          {
            step: 2,
            title: "Tamper-Proof Diplomatic Encasement",
            description: "Double-sealed in velvet bullion chest with cryptographic wax seal.",
            status: "completed"
          },
          {
            step: 3,
            title: "Armored Diplomatic Courier Transit",
            description: "Dispatched under armed diplomatic guard towards destination coordinates.",
            status: "in_progress"
          },
          {
            step: 4,
            title: "Private Residence / Salon Handover",
            description: "Direct white-glove inspection and cryptographic patron sign-off.",
            status: "pending"
          }
        ]
      });
    } finally {
      setTrackingLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      handleTrack(initialRef);
    }
  }, [initialRef]);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Header Banner */}
      <section className="px-6 md:px-16 pt-10 pb-12 bg-surface-container-lowest border-b border-primary/10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Archival Dispatch Registry
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-normal tracking-wide text-on-surface mb-3">
            Orders & Diplomatic Transit
          </h1>

          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-secondary font-light max-w-2xl leading-relaxed mb-6">
            Review your acquisition dossier, cryptographic certificates of authenticity, and trace live armored courier transit coordinates.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("history")}
              className={`px-5 py-2.5 font-label-md text-xs uppercase tracking-widest transition-colors ${
                activeTab === "history"
                  ? "bg-primary text-on-primary font-medium"
                  : "bg-surface-container text-on-surface-variant hover:text-primary"
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => {
                setActiveTab("tracking");
                if (!trackingResult) handleTrack("SVR-890211");
              }}
              className={`px-5 py-2.5 font-label-md text-xs uppercase tracking-widest transition-colors ${
                activeTab === "tracking"
                  ? "bg-primary text-on-primary font-medium"
                  : "bg-surface-container text-on-surface-variant hover:text-primary"
              }`}
            >
              Armored Courier Tracking
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Panels */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-12 w-full">
        {activeTab === "history" ? (
          /* TAB 1: ORDER HISTORY */
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-primary/15">
              <span className="font-label-sm text-xs uppercase tracking-widest text-secondary">
                Registered Acquisitions ({orders.length})
              </span>
              <span className="text-xs font-mono text-outline">
                Patron: {user?.fullName || "Maharaj Vikramaditya"}
              </span>
            </div>

            {ordersLoading ? (
              <div className="py-16 text-center text-primary font-mono text-xs uppercase tracking-widest">
                Accessing Sovereign Dispatch Vault...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center bg-surface-container-low border border-primary/15 flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-[36px] text-primary">local_shipping</span>
                <h3 className="font-headline-sm text-on-surface">No Historical Orders Yet</h3>
                <p className="font-body-sm text-xs text-on-surface-variant max-w-md">
                  Your acquisition folio has not yet recorded any sealed orders. Browse our High Jewellery masterworks to request allocation.
                </p>
                <Link
                  to="/collections"
                  className="mt-2 px-6 py-2.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider"
                >
                  Explore Masterpieces
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map((ord) => (
                  <div
                    key={ord._id || ord.orderReference}
                    className="bg-surface-container-low border border-primary/20 p-6 flex flex-col gap-5 shadow-lg"
                  >
                    {/* Order Head */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-primary/10">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                          Order Reference
                        </span>
                        <span className="font-headline-sm text-lg text-on-surface font-mono font-medium">
                          {ord.orderReference}
                        </span>
                        <span className="text-[11px] text-outline font-mono">
                          Placed on {new Date(ord.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-[11px] font-label-sm uppercase tracking-wider ${
                            ord.fulfillmentStatus === "Delivered"
                              ? "bg-primary/20 text-primary border border-primary/40"
                              : "bg-surface-container-high text-primary border border-primary/30"
                          }`}
                        >
                          {ord.fulfillmentStatus || "Confirmed"}
                        </span>
                        <button
                          onClick={() => {
                            setActiveTab("tracking");
                            setTrackingInput(ord.orderReference);
                            handleTrack(ord.orderReference);
                          }}
                          className="px-3.5 py-1.5 border border-primary/30 text-xs text-primary hover:bg-surface-container transition-colors uppercase tracking-wider font-label-md"
                        >
                          Track Live Transit
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-col gap-3">
                      {ord.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-4 p-3 bg-surface-container/60 border border-primary/10"
                        >
                          <div className="flex items-center gap-4">
                            {item.imageSnapshot && (
                              <img
                                src={item.imageSnapshot}
                                alt={item.title}
                                className="w-14 h-14 object-cover border border-primary/15"
                              />
                            )}
                            <div className="flex flex-col">
                              <span className="font-headline-sm text-sm text-on-surface">
                                {item.title}
                              </span>
                              <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline">
                                SKU: {item.sku} • Qty: {item.quantity} • {item.metalPurity || "22K Gold"}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-sm text-primary font-medium">
                            {formatINR(item.priceSnapshotINR * (item.quantity || 1))}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Foot / Totals */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-primary/10 text-xs font-mono">
                      <div className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                        <span>{ord.transitMethodLabel || "Armored Diplomatic Courier"}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-secondary mr-2">Total Settled (incl. 3% GST):</span>
                        <span className="text-primary font-bold text-sm">
                          {formatINR(ord.financialSummary?.totalValuationINR)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* TAB 2: LIVE COURIER TRACKING */
          <div className="flex flex-col gap-8">
            {/* Search Reference Bar */}
            <div className="bg-surface-container-low border border-primary/20 p-6 flex flex-col gap-3">
              <span className="font-label-sm text-xs uppercase tracking-widest text-primary">
                Inquire Diplomatic Escort Coordinates
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter Order Reference (e.g. SVR-890211)"
                  className="bg-surface-container border border-primary/20 px-4 py-3 font-mono text-sm text-on-surface uppercase w-full focus:outline-none focus:border-primary transition-colors tracking-widest"
                />
                <button
                  onClick={() => handleTrack(trackingInput)}
                  disabled={trackingLoading}
                  className="px-6 py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest hover:bg-primary-fixed transition-colors shrink-0"
                >
                  {trackingLoading ? "Tracing..." : "Trace Transit"}
                </button>
              </div>
            </div>

            {/* Tracking Result View */}
            {trackingResult && (
              <div className="bg-surface-container-low border border-primary/25 p-6 md:p-8 flex flex-col gap-8 shadow-2xl">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-primary/15">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">
                      Live Courier Dossier
                    </span>
                    <h2 className="font-headline-sm text-2xl text-on-surface font-mono">
                      REF: {trackingResult.orderReference}
                    </h2>
                    <span className="font-body-sm text-xs text-secondary">
                      Transit Protocol: {trackingResult.transitMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-surface-container px-4 py-2 border border-primary/20 self-start sm:self-auto">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                    <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-medium">
                      Status: {trackingResult.fulfillmentStatus}
                    </span>
                  </div>
                </div>

                {/* Diplomatic Escort Badge */}
                {trackingResult.courierDetails && (
                  <div className="bg-surface-container p-4 border border-primary/15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-outline text-[10px] uppercase tracking-wider block">Security Agency</span>
                      <span className="text-on-surface">{trackingResult.courierDetails.agency}</span>
                    </div>
                    <div>
                      <span className="text-outline text-[10px] uppercase tracking-wider block">Manifest Bill #</span>
                      <span className="text-primary font-bold">{trackingResult.courierDetails.trackingNumber}</span>
                    </div>
                    <div>
                      <span className="text-outline text-[10px] uppercase tracking-wider block">Escort Commander</span>
                      <span className="text-on-surface">{trackingResult.courierDetails.escortOfficer}</span>
                    </div>
                    <div>
                      <span className="text-outline text-[10px] uppercase tracking-wider block">Transit Vehicle</span>
                      <span className="text-on-surface">{trackingResult.courierDetails.vehicleType}</span>
                    </div>
                  </div>
                )}

                {/* Chronological Milestone Timeline */}
                <div className="flex flex-col gap-6 pt-2">
                  <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-secondary">
                    Cryptographic Chain of Custody
                  </span>

                  <div className="relative pl-6 flex flex-col gap-8 border-l border-primary/30 ml-3">
                    {trackingResult.milestones?.map((ms, idx) => {
                      const isDone = ms.status === "completed";
                      const isCurrent = ms.status === "in_progress";

                      return (
                        <div key={idx} className="relative flex flex-col gap-1">
                          {/* Dot on line */}
                          <div
                            className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isDone
                                ? "bg-primary border-primary text-on-primary"
                                : isCurrent
                                ? "bg-surface border-primary text-primary animate-pulse"
                                : "bg-surface-container border-outline text-transparent"
                            }`}
                          >
                            {isDone && <span className="material-symbols-outlined text-[10px]">check</span>}
                          </div>

                          <div className="flex items-center justify-between">
                            <span
                              className={`font-headline-sm text-base ${
                                isDone || isCurrent ? "text-primary" : "text-outline"
                              }`}
                            >
                              {ms.title}
                            </span>
                            <span
                              className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 ${
                                isDone
                                  ? "bg-primary/20 text-primary"
                                  : isCurrent
                                  ? "bg-surface-bright text-primary font-bold"
                                  : "text-outline"
                              }`}
                            >
                              {ms.status.replace("_", " ")}
                            </span>
                          </div>

                          <p className="font-body-sm text-xs text-on-surface-variant max-w-xl">
                            {ms.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Liaison assistance footnote */}
                <div className="pt-4 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-on-surface-variant">
                    Require urgent escort schedule adjustments?
                  </span>
                  <button
                    onClick={onOpenConcierge}
                    className="text-primary hover:underline uppercase tracking-wider font-label-md"
                  >
                    Connect with Armored Transit Liaison
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
