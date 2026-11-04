import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../data/products";
import { orderApi } from "../services/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { totalValuationINR, clearCart, cartItems } = useCart();
  const { user } = useAuth();

  const [transitMethod, setTransitMethod] = useState("armored");
  const [activePaymentTab, setActivePaymentTab] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderReference, setOrderReference] = useState(`SVR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [paymentError, setPaymentError] = useState("");
  const [configNotice, setConfigNotice] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const paymentTabs = [
    {
      id: "card",
      name: "Sovereign Amex",
      sub: "Centurion / Infinite",
      icon: "credit_card"
    },
    {
      id: "upi",
      name: "UPI Sovereign",
      sub: "Zero Latency Swift",
      icon: "qr_code_2"
    },
    {
      id: "netbanking",
      name: "Private Banking",
      sub: "Tier-1 Consortia",
      icon: "account_balance"
    },
    {
      id: "wire",
      name: "Private Wire",
      sub: "RTGS / SWIFT Escrow",
      icon: "assured_workload"
    }
  ];

  const handleAuthorizePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      setPaymentError("Your acquisitions bag is currently empty. Please select masterpieces first.");
      return;
    }

    setPaymentError("");
    setConfigNotice(null);
    setIsProcessing(true);

    try {
      // 1. Establish pending order allocation in the backend
      const orderPayload = {
        deliveryProtocol: transitMethod,
        paymentMethod: activePaymentTab,
        shippingAddress: {
          addressLine: user?.deliveryAddress?.line1 || "42 Sovereign Crescent, Malabar Hill",
          city: user?.deliveryAddress?.city || "Mumbai",
          state: user?.deliveryAddress?.state || "Maharashtra",
          pincode: user?.deliveryAddress?.pincode || "400006",
          country: "India"
        }
      };

      let createdOrder;
      try {
        const orderRes = await orderApi.createOrder(orderPayload);
        createdOrder = orderRes?.order;
      } catch (orderErr) {
        throw new Error(orderErr.message || "Failed to establish sovereign order in backend.");
      }

      if (!createdOrder) {
        throw new Error("Unable to establish sovereign order allocation.");
      }

      setOrderReference(createdOrder.orderReference);

      // 2. If Private Wire transfer was selected (Offline Escrow Protocol)
      if (activePaymentTab === "wire") {
        localStorage.setItem("sovira_last_order", JSON.stringify(createdOrder));
        setIsProcessing(false);
        setOrderConfirmed(true);
        clearCart();
        return;
      }

      // 3. For Online Payments (Card, UPI, Netbanking): Initialize Razorpay TEST MODE Order
      let rzpRes;
      try {
        rzpRes = await orderApi.createRazorpayOrder({
          orderId: createdOrder._id,
          amountINR: createdOrder.financialSummary?.totalValuationINR || totalValuationINR
        });
      } catch (rzpErr) {
        setIsProcessing(false);
        if (
          rzpErr.configError ||
          rzpErr.message?.includes("credentials") ||
          rzpErr.message?.includes("configured")
        ) {
          setConfigNotice({
            title: "Razorpay TEST MODE Configuration Required",
            message:
              rzpErr.message ||
              "Valid Razorpay test credentials (RAZORPAY_KEY_ID starting with rzp_test_ and RAZORPAY_KEY_SECRET) must be set in sovira-backend/.env to process online payments."
          });
        } else {
          setPaymentError(rzpErr.message || "Failed to initialize Razorpay test payment session.");
        }
        return;
      }

      if (!rzpRes?.razorpayOrder?.id) {
        setIsProcessing(false);
        setPaymentError("The server did not return a valid Razorpay order ID.");
        return;
      }

      // 4. Load Razorpay Checkout Script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setIsProcessing(false);
        setPaymentError(
          "Unable to load Razorpay secure checkout script from https://checkout.razorpay.com/v1/checkout.js. Please verify internet connectivity."
        );
        return;
      }

      // 5. Open Razorpay Checkout Modal
      const options = {
        key: rzpRes.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: rzpRes.razorpayOrder.amount, // in paise
        currency: rzpRes.razorpayOrder.currency || "INR",
        name: "SOVIRA Haute Joaillerie",
        description: `Acquisition Order ${createdOrder.orderReference}`,
        image:
          "https://lh3.googleusercontent.com/aida/AEtjO1VpWC1dBIFZ0i8IMqkTIeEMyLW4o3LB_HkyAcMNjHJydEgtOELP8uTGB37QwZqY6fcdCmpqmzkcaIEYJdRodSjPIZ2HEqcoL4-YqbWqfocgYwxLqHCyXlkkU9A3lJGFW2Bg5vcwsbYEw-336CTUT9XmV33skmrTa4YQT6bTxPYGoeMTde1MdhNhATJTlOmZ-58i_goYEuza2dgYgDVJdgmod-9nwj4WJzz-Kb5KgfA",
        order_id: rzpRes.razorpayOrder.id,
        prefill: {
          name: user?.fullName || "Sovereign Patron",
          email: user?.email || "patron@sovira.vault",
          contact: user?.phone || "+919820048291"
        },
        theme: {
          color: "#e2c28a"
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setPaymentError(
              "Razorpay payment was dismissed. Your acquisition bag and pieces remain preserved."
            );
          }
        },
        handler: async function (paymentResponse) {
          // This callback ONLY executes after customer completes payment in the modal
          try {
            setIsProcessing(true);
            const verifyRes = await orderApi.verifyRazorpayPayment({
              orderId: createdOrder._id || createdOrder.orderReference,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature
            });

            if (verifyRes.success) {
              const finalizedOrder = verifyRes.order || {
                ...createdOrder,
                fulfillmentStatus: "Confirmed",
                paymentDetails: {
                  ...createdOrder.paymentDetails,
                  status: "PAID",
                  razorpayPaymentId: paymentResponse.razorpay_payment_id
                }
              };
              localStorage.setItem("sovira_last_order", JSON.stringify(finalizedOrder));
              setOrderReference(finalizedOrder.orderReference || createdOrder.orderReference);
              setOrderConfirmed(true);
              clearCart();
            } else {
              setPaymentError(
                verifyRes.message || "Cryptographic signature verification failed on the server."
              );
            }
          } catch (verifyErr) {
            setPaymentError(
              verifyErr.message || "Server signature verification failed. Order not confirmed."
            );
          } finally {
            setIsProcessing(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (failResponse) {
        setIsProcessing(false);
        setPaymentError(
          `Payment transaction declined: ${failResponse.error?.description || "Transaction failed"}`
        );
      });

      razorpayInstance.open();
      setIsProcessing(false);
    } catch (generalErr) {
      setIsProcessing(false);
      setPaymentError(generalErr.message || "An error occurred during checkout processing.");
    }
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Checkout Container */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 w-full flex flex-col gap-8">
        {orderConfirmed ? (
          /* Order Confirmation View */
          <div className="bg-surface-container-low border border-primary/30 p-8 md:p-12 flex flex-col items-center text-center gap-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/40">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-xs uppercase tracking-[0.3em] text-primary">
                Acquisition Sealed & Cryptographically Verified
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-normal">
                Sovereign Order Confirmed
              </h1>
              <p className="font-body-md text-secondary max-w-lg mx-auto">
                Your allocation is locked in the Jaipur High Vault. An armored diplomatic security escort has been scheduled.
              </p>
            </div>

            <div className="w-full max-w-md bg-surface-container p-5 border border-primary/20 flex flex-col gap-2 text-left font-mono text-xs text-on-surface">
              <div className="flex justify-between border-b border-primary/15 pb-1.5">
                <span className="text-secondary">Order Reference:</span>
                <span className="text-primary font-bold">{orderReference}</span>
              </div>
              <div className="flex justify-between border-b border-primary/15 pb-1.5">
                <span className="text-secondary">Patron:</span>
                <span>{user?.fullName || "Maharaj Vikramaditya Singhania"}</span>
              </div>
              <div className="flex justify-between border-b border-primary/15 pb-1.5">
                <span className="text-secondary">Settlement Protocol:</span>
                <span>{activePaymentTab.toUpperCase()} • Razorpay Sovereign HSM</span>
              </div>
              <div className="flex justify-between border-b border-primary/15 pb-1.5">
                <span className="text-secondary">Delivery Method:</span>
                <span>{transitMethod === "armored" ? "Armored Diplomatic Courier" : "Private Salon Suite"}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-sans font-medium text-primary">
                <span>Total Settled:</span>
                <span>{formatINR(totalValuationINR)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/tracking?ref=${orderReference}`}
                className="px-8 py-3.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest font-semibold hover:bg-primary-fixed transition-colors text-center"
              >
                Track Armored Transit
              </Link>
              <Link
                to="/orders"
                className="px-8 py-3.5 bg-surface-container border border-primary/20 text-secondary hover:text-primary font-label-md text-label-md uppercase tracking-widest text-center"
              >
                View Order History
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3.5 bg-surface-container-high border border-primary/20 text-secondary hover:text-primary font-label-md text-label-md uppercase tracking-widest text-center"
              >
                Sanctuary Portfolio
              </Link>
            </div>
          </div>
        ) : (
          /* Normal Settlement View (Screen 10) */
          <>
            {/* Step Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-primary/10">
              <div className="flex flex-col">
                <span className="font-label-sm text-xs uppercase tracking-[0.25em] text-primary">
                  Settlement Protocol
                </span>
                <h1 className="font-headline-sm text-headline-sm text-on-surface">
                  Step 2 of 3: Diplomatic Delivery & Settlement
                </h1>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                <span className="w-8 h-1 rounded-full bg-primary"></span>
                <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
              </div>
            </div>

            {/* Acquisition Reference Plinth */}
            <div className="bg-surface-container-low border border-primary/20 p-5 shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-xs text-primary tracking-[0.2em] uppercase">
                    Acquisition Reference
                  </span>
                  <span className="bg-surface-container-high px-1.5 py-0.5 text-[9px] tracking-widest text-secondary font-label-md border border-primary/20">
                    VERIFIED
                  </span>
                </div>
                <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5 tracking-wider font-mono">
                  {orderReference}
                </div>
                <div className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  {cartItems.length} Reserved Creations • Imperial Archival Allocation
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-label-sm text-xs text-secondary tracking-[0.18em] uppercase block">
                  Total Settlement Value
                </span>
                <span className="font-headline-sm text-xl text-primary font-medium tracking-tight">
                  {formatINR(totalValuationINR)}
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant block mt-0.5">
                  Duties & Insured Transit Included
                </span>
              </div>
            </div>

            {/* Patron Identification */}
            <div className="bg-surface-container-low border border-primary/15 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                <h2 className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary">
                  Patron Identification
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-xs text-secondary tracking-widest uppercase block">
                    Patron Title & Full Name
                  </label>
                  <div className="bg-surface-container px-3.5 py-2.5 flex items-center justify-between border border-primary/10">
                    <span className="font-body-md text-sm text-on-surface font-medium">
                      {user?.fullName || "Maharaj Vikramaditya Singhania"}
                    </span>
                    <span className="material-symbols-outlined text-primary text-[18px]">shield</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-label-sm text-xs text-secondary tracking-widest uppercase block">
                    Confidential Mobile
                  </label>
                  <div className="bg-surface-container px-3.5 py-2.5 flex items-center justify-between border border-primary/10">
                    <span className="font-body-md text-sm text-on-surface tracking-wider font-mono">
                      {user?.phone || "+91 98200 48291"}
                    </span>
                    <span className="font-label-sm text-[10px] text-primary tracking-widest uppercase bg-surface-container-high px-2 py-0.5">
                      Encrypted
                    </span>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="font-label-sm text-xs text-secondary tracking-widest uppercase block">
                    Curatorial Dispatch Dossier (Email)
                  </label>
                  <div className="bg-surface-container px-3.5 py-2.5 flex items-center justify-between border border-primary/10">
                    <span className="font-body-md text-sm text-on-surface">
                      {user?.email || "v.singha@royal-council.in"}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[16px]">lock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Protocol Selection */}
            <div className="bg-surface-container-low border border-primary/15 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                  <h2 className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary">
                    Diplomatic Transit Protocol
                  </h2>
                </div>
                <span className="font-label-sm text-xs text-secondary tracking-wider uppercase">
                  Tier-A Vault Courier
                </span>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setTransitMethod("armored")}
                  className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-all ${
                    transitMethod === "armored"
                      ? "bg-surface-container-high border-primary"
                      : "bg-surface-container border-primary/10 hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="transit_method"
                    checked={transitMethod === "armored"}
                    onChange={() => setTransitMethod("armored")}
                    className="mt-1 accent-primary w-4 h-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-body-md text-sm text-on-surface font-medium">
                      Armored Diplomatic Courier to Private Residence
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      Biometric twin-custody transfer directly to ancestral residence: {user?.deliveryAddress?.line1 || "Malabar Hill, Mumbai"}.
                    </span>
                    <span className="font-label-sm text-xs text-primary mt-1 tracking-wider uppercase">
                      Transit Insurance: 100% Lloyds Sovereign Syndicate
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setTransitMethod("salon")}
                  className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-all ${
                    transitMethod === "salon"
                      ? "bg-surface-container-high border-primary"
                      : "bg-surface-container border-primary/10 hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="transit_method"
                    checked={transitMethod === "salon"}
                    onChange={() => setTransitMethod("salon")}
                    className="mt-1 accent-primary w-4 h-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-body-md text-sm text-on-surface font-medium">
                      Direct Private Salon Presentation & Vault Depository
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      Held in personal vault suite at The Oberoi, Mumbai or Old Bond St, London for hands-on inspection.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment / Settlement Conduit */}
            <div className="bg-surface-container-low border border-primary/15 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                <h2 className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary">
                  Settlement Conduit
                </h2>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {paymentTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePaymentTab(tab.id)}
                    className={`text-left p-3 border transition-all ${
                      activePaymentTab === tab.id
                        ? "bg-surface-container-highest border-primary text-on-surface"
                        : "bg-surface-container border-primary/10 text-on-surface-variant hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs uppercase tracking-wider text-primary">
                        {tab.name}
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {tab.icon}
                      </span>
                    </div>
                    <span className="font-label-sm text-[10px] text-on-surface-variant block mt-1">
                      {tab.sub}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              {activePaymentTab === "card" && (
                <div className="bg-surface-container p-4 border border-primary/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs uppercase tracking-widest text-secondary">
                      Pre-Authorized Sovereign Card
                    </span>
                    <span className="font-label-sm text-xs text-primary tracking-widest font-mono">
                      AMEX CENTURION
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 bg-surface-container-high flex items-center justify-center border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-[14px]">contactless</span>
                    </div>
                    <span className="font-headline-sm text-base text-on-surface tracking-widest font-mono">
                      •••• •••• •••• 1008
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-xs border-t border-primary/10">
                    <span className="text-on-surface-variant">Cardholder: V. Singha</span>
                    <span className="text-secondary tracking-widest font-mono">EXP 09/29</span>
                  </div>
                </div>
              )}

              {activePaymentTab === "upi" && (
                <div className="bg-surface-container p-4 border border-primary/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs uppercase tracking-widest text-secondary">
                      Instant Settlement VPA
                    </span>
                    <span className="font-label-sm text-xs text-primary tracking-widest font-mono">
                      BHIM UPI ULTRA
                    </span>
                  </div>
                  <div className="font-headline-sm text-sm text-on-surface font-mono">
                    vikramaditya@sovira.vault
                  </div>
                  <p className="text-[11px] text-secondary">
                    Pre-cleared diplomatic credit limit with zero transaction latency.
                  </p>
                </div>
              )}

              {activePaymentTab === "netbanking" && (
                <div className="bg-surface-container p-4 border border-primary/20 space-y-2">
                  <span className="font-label-sm text-xs uppercase tracking-widest text-secondary">
                    Private Banking Consortia
                  </span>
                  <p className="text-xs text-on-surface font-medium">
                    HDFC Private Banking • Kotak Privé • Standard Chartered Wealth
                  </p>
                  <p className="text-[11px] text-secondary">
                    Direct executive clearance handled through your assigned private banker.
                  </p>
                </div>
              )}

              {activePaymentTab === "wire" && (
                <div className="bg-surface-container p-4 border border-primary/20 space-y-2">
                  <span className="font-label-sm text-xs uppercase tracking-widest text-secondary">
                    RTGS / SWIFT Escrow Depository
                  </span>
                  <div className="font-mono text-xs text-on-surface">
                    IBAN: IN92 SOVR 0001 9283 8812 00
                  </div>
                  <p className="text-[11px] text-secondary">
                    Vault escrow deposit holds pieces for 48 hours awaiting wire settlement verification.
                  </p>
                </div>
              )}

              {/* Configuration Error / Requirement Notice */}
              {configNotice && (
                <div className="bg-surface-container-high border-2 border-primary/40 p-4 md:p-5 flex flex-col gap-3 shadow-xl">
                  <div className="flex items-center gap-2.5 text-primary">
                    <span className="material-symbols-outlined text-[24px]">settings_suggest</span>
                    <span className="font-headline-sm text-sm font-medium tracking-wide">
                      {configNotice.title}
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {configNotice.message}
                  </p>
                  <div className="bg-surface-container-lowest p-3 border border-primary/20 font-mono text-[11px] text-primary/90 space-y-1">
                    <div className="text-secondary text-[10px] uppercase tracking-wider">
                      Setup Instructions (sovira-backend/.env):
                    </div>
                    <div>RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere</div>
                    <div>RAZORPAY_KEY_SECRET=YourSecretHere</div>
                  </div>
                  <span className="font-body-sm text-[11px] text-outline italic">
                    * Orders are never confirmed automatically. A genuine Razorpay test payment and server-side signature verification are required.
                  </span>
                </div>
              )}

              {/* Payment Error Banner */}
              {paymentError && (
                <div className="bg-error/15 border border-error/40 p-3.5 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5 text-error">
                    <span className="material-symbols-outlined text-[18px] mt-0.5">error</span>
                    <span className="font-body-sm text-xs leading-relaxed">{paymentError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaymentError("")}
                    className="text-error hover:text-on-surface text-[10px] uppercase font-mono tracking-wider shrink-0"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Razorpay Test Mode Banner Notice */}
              <div className="bg-surface-container-high/60 border border-primary/20 p-3.5 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  lock_clock
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs uppercase tracking-wider text-primary font-medium">
                    Secured via Razorpay Sovereign Protocol (TEST MODE ONLY)
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Interactive Razorpay Modal with Cryptographic Server-Side HMAC-SHA256 Signature Verification
                  </span>
                </div>
              </div>
            </div>

            {/* Non-Disclosure Protocol */}
            <div className="bg-surface-container-low border border-primary/10 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[16px]">privacy_tip</span>
                <span className="font-label-sm text-xs uppercase tracking-[0.2em] text-secondary">
                  Non-Disclosure & Atelier Discretion Protocol
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                All acquisitions bypass general commercial manifests. Consignments arrive in unbranded, thermal-tamper sealed beryllium vault casings transported via unmarked diplomatic vehicles accompanied by licensed security officers.
              </p>
            </div>

            {/* Sovereign Settlement CTA Action */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAuthorizePayment}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-md text-label-md uppercase tracking-[0.2em] py-4 px-6 font-semibold shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-75"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isProcessing ? "hourglass_empty" : "lock"}
                </span>
                <span>
                  {isProcessing
                    ? "Connecting to Razorpay Secure Gateway..."
                    : activePaymentTab === "wire"
                    ? `Authorize & Inscribe Wire Escrow — ${formatINR(totalValuationINR)}`
                    : `Open Razorpay Test Checkout — ${formatINR(totalValuationINR)}`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-center">
                <span className="material-symbols-outlined text-secondary text-[14px]">gavel</span>
                <span className="font-label-sm text-xs text-secondary tracking-widest uppercase">
                  Binding Royal Vault Allocation • Sovira Atelier Jaipur
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
