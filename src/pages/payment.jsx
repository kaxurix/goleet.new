import React, { useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  QrCode,
  Wallet,
  Building,
  CheckCircle2,
} from "lucide-react";
import { useBanner } from "../hooks/useBanner";
import { useAuth } from "../context/AuthContext";
import { getDashboardRoute } from "../hooks/useDashboardRoute";

const planMeta = {
  free: { title: "Lapak Gratis", price: 0, period: "Selamanya" },
  promo: { title: "Booster Promo", price: 49000, period: "bulan" },
  premium: { title: "Premium Plus", price: 99000, period: "bulan" },
  banner: { title: "Banner & Campaign Ads", price: 500000, period: "bulan" },
};

function mapPaymentMethodToOption(method) {
  if (method === "QRIS Bisnis") {
    return "qris";
  }

  if (method === "VA Mandiri") {
    return "va";
  }

  return "gopay";
}

function mapOptionToPaymentMethod(option) {
  if (option === "qris") {
    return "QRIS Bisnis";
  }

  if (option === "va") {
    return "VA Mandiri";
  }

  return "GoPay / ShopeePay";
}

export default function Payment() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submitBannerRequest } = useBanner();
  const { user } = useAuth();
  const dashboardRoute = getDashboardRoute(user?.role);

  const bannerRequestData = location.state?.bannerRequestData || null;
  const isBannerCheckout =
    location.state?.flowType === "banner" && Boolean(bannerRequestData);

  const planSlug = searchParams.get("plan") || "premium";
  const isBannerPlan = planSlug === "banner";
  const currentPlan = planMeta[planSlug] || planMeta.premium;
  const initialMethod = "qris";

  const [selectedMethod, setSelectedMethod] = useState(initialMethod);
  const [merchantName, setMerchantName] = useState("");
  const [merchantEmail, setMerchantEmail] = useState("");
  const [merchantPhone, setMerchantPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form");
  const paymentHandledRef = useRef(false);

  const basePrice = currentPlan.price;
  const adminFee = basePrice > 0 ? 2500 : 0;
  const tax = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + adminFee + tax;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const finalizeBannerSubmission = () => {
    if (!isBannerCheckout || paymentHandledRef.current) {
      return;
    }

    submitBannerRequest({
      ...bannerRequestData,
      paymentMethod: mapOptionToPaymentMethod(selectedMethod),
      paymentStatus: "paid",
    });
    paymentHandledRef.current = true;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (basePrice === 0) {
        setPaymentStep("checking");
        setTimeout(() => {
          finalizeBannerSubmission();
          setPaymentStep("paid");
        }, 2000);
      } else {
        setPaymentStep("waiting_payment");
      }
    }, 1200);
  };

  const handleCheckPayment = () => {
    setPaymentStep("checking");

    setTimeout(() => {
      finalizeBannerSubmission();
      setPaymentStep("paid");
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <nav className="w-full bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/80">
        <button
          onClick={() => {
            if (paymentStep === "waiting_payment") {
              if (isBannerCheckout) {
                navigate("/banner-ads");
              } else {
                setPaymentStep("form");
              }
            } else {
              navigate(-1);
            }
          }}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl select-none">
          <Lock size={12} className="text-emerald-500" /> Secure Checkout
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {paymentStep === "form" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column — hanya tampil jika bukan banner plan */}
            {!isBannerPlan && (
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-black tracking-tight mb-1">
                    Informasi Bisnis
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Isi data di bawah untuk aktivasi benefit paket.
                  </p>

                  <form
                    className="space-y-4"
                    onSubmit={handlePaymentSubmit}
                    id="payment-form"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Nama Lapak / Merchant
                      </label>
                      <input
                        type="text"
                        required
                        value={merchantName}
                        onChange={(e) => setMerchantName(e.target.value)}
                        placeholder="Contoh: Kopi Kenangan Toko"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Email Pemilik
                        </label>
                        <input
                          type="email"
                          required
                          value={merchantEmail}
                          onChange={(e) => setMerchantEmail(e.target.value)}
                          placeholder="nama@email.com"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          No. WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={merchantPhone}
                          onChange={(e) => setMerchantPhone(e.target.value)}
                          placeholder="081234567xxx"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Right column — order summary + payment method */}
            <div
              className={`${isBannerPlan ? "lg:col-span-12 max-w-lg mx-auto w-full" : "lg:col-span-5"} lg:sticky lg:top-24`}
            >
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                {/* Metode Pembayaran — selalu tampil di sini, di atas ringkasan */}
                {basePrice > 0 && (
                  <div>
                    <h2 className="text-lg font-black tracking-tight mb-1">
                      Metode Pembayaran
                    </h2>
                    <p className="text-sm text-slate-500 mb-4">
                      Pilih opsi pembayaran aman yang Anda inginkan.
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedMethod("qris")}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border text-center transition-all ${
                          selectedMethod === "qris"
                            ? "border-slate-950 bg-slate-50 ring-2 ring-slate-950/5"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <QrCode
                          className={`w-6 h-6 ${selectedMethod === "qris" ? "text-slate-950" : "text-slate-400"}`}
                        />
                        <span className="text-xs font-bold">
                          QRIS (Otomatis)
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMethod("va")}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border text-center transition-all ${
                          selectedMethod === "va"
                            ? "border-slate-950 bg-slate-50 ring-2 ring-slate-950/5"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <Building
                          className={`w-6 h-6 ${selectedMethod === "va" ? "text-slate-950" : "text-slate-400"}`}
                        />
                        <span className="text-xs font-bold">
                          Virtual Account BCA
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMethod("gopay")}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border text-center transition-all ${
                          selectedMethod === "gopay"
                            ? "border-slate-950 bg-slate-50 ring-2 ring-slate-950/5"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <Wallet
                          className={`w-6 h-6 ${selectedMethod === "gopay" ? "text-slate-950" : "text-slate-400"}`}
                        />
                        <span className="text-xs font-bold">
                          GoPay / ShopeePay
                        </span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 mt-6" />
                  </div>
                )}

                {/* Ringkasan Order */}
                <h3 className="text-lg font-black tracking-tight">
                  Ringkasan Order
                </h3>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {currentPlan.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Aktivasi Paket Berkala
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900">
                      {basePrice === 0 ? "Gratis" : formatCurrency(basePrice)}
                    </span>
                    {basePrice > 0 && (
                      <span className="text-xs text-slate-400 block">
                        /{currentPlan.period}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 border-b border-slate-100 pb-4 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Harga Subtotal</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(basePrice)}
                    </span>
                  </div>
                  {basePrice > 0 && (
                    <>
                      <div className="flex justify-between text-slate-500">
                        <span>Pajak (PPN 12%)</span>
                        <span className="font-medium text-slate-900">
                          {formatCurrency(tax)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Biaya Admin</span>
                        <span className="font-medium text-slate-900">
                          {formatCurrency(adminFee)}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">
                    Total Pembayaran
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>

                {/* Form tersembunyi untuk banner plan — tidak butuh data bisnis */}
                {isBannerPlan && (
                  <form
                    id="payment-form"
                    onSubmit={handlePaymentSubmit}
                    className="hidden"
                  />
                )}

                <button
                  type="submit"
                  form="payment-form"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 font-semibold py-4 px-6 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses Order...
                    </>
                  ) : basePrice === 0 ? (
                    "Klaim Lapak Sekarang"
                  ) : (
                    "Bayar & Aktivasi Sekarang"
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center pt-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>Enkripsi SSL 256-bit • Pembayaran Aman Terjamin</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            {paymentStep === "waiting_payment" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {selectedMethod === "qris"
                      ? "QRIS Real-Time"
                      : selectedMethod === "va"
                        ? "BCA Virtual Account"
                        : "E-Wallet Transfer"}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-3">
                    Selesaikan Pembayaran
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Silakan lakukan pelunasan sesuai instruksi di bawah ini.
                  </p>
                </div>

                {isBannerCheckout && (
                  <div className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Campaign Banner
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900">
                      {bannerRequestData.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {bannerRequestData.advertiserName} •{" "}
                      {bannerRequestData.advertiserEmail}
                    </p>
                  </div>
                )}

                {selectedMethod === "qris" ? (
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 inline-block w-full">
                    <div className="w-44 h-44 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 mx-auto shadow-inner">
                      <QrCode className="w-full h-full text-slate-900" />
                    </div>
                    <p className="text-[10px] font-mono tracking-wider text-slate-400 mt-2 uppercase">
                      NMID: ID102026884091
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Scan QR menggunakan BCA, GoPay, OVO, ShopeePay, Dana dll.
                    </p>
                  </div>
                ) : (
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1 w-full">
                    <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      Nomor Virtual Account / Bayar
                    </p>
                    <p className="text-2xl font-black text-slate-900 tracking-widest my-2">
                      88301 0812 3456 78
                    </p>
                    <p className="text-xs text-slate-500 font-semibold">
                      Atas Nama: Goleet.id Partnership
                    </p>
                  </div>
                )}

                <div className="border-t border-b border-slate-100 py-3">
                  <p className="text-xs text-slate-400 font-medium">
                    Total Tagihan Anda
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    {formatCurrency(totalPrice)}
                  </p>
                </div>

                <button
                  onClick={handleCheckPayment}
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold py-3.5 px-6 rounded-2xl transition-all active:scale-[0.98]"
                >
                  Cek Status Pembayaran
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentStep("form")}
                  className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-3.5 px-6 rounded-2xl transition-all active:scale-[0.98]"
                >
                  Kembali ke Pilihan Metode
                </button>
              </div>
            )}

            {paymentStep === "checking" && (
              <div className="py-12 flex flex-col items-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Memverifikasi Pembayaran
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                    Sistem sedang memeriksa jaringan mutasi bank otomatis Anda.
                    Mohon tunggu beberapa saat.
                  </p>
                </div>
              </div>
            )}

            {paymentStep === "paid" && (
              <div className="py-4 space-y-6 animate-fade-in">
                <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
                  <CheckCircle2 className="w-10 h-10 text-green-500 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Status: Dibayar
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-4">
                    Pembayaran Berhasil!
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
                    {isBannerCheckout ? (
                      <>
                        Campaign banner{" "}
                        <span className="font-bold text-slate-800">
                          {bannerRequestData.title}
                        </span>{" "}
                        berhasil dikirim dan menunggu review admin.
                      </>
                    ) : (
                      <>
                        Paket{" "}
                        <span className="font-bold text-slate-800">
                          {currentPlan.title}
                        </span>{" "}
                        Anda saat ini telah aktif sepenuhnya di platform
                        Goleet.id.
                      </>
                    )}
                  </p>
                </div>
                {isBannerCheckout ? (
                  <Link
                    to="/banner-ads"
                    className="block w-full bg-green-500 text-white hover:bg-green-600 font-semibold py-3.5 px-6 rounded-2xl transition-all active:scale-[0.98] shadow-sm"
                  >
                    Selesai
                  </Link>
                ) : (
                  <button
                    onClick={() => navigate(dashboardRoute)}
                    className="w-full bg-green-500 text-white hover:bg-green-600 font-semibold py-3.5 px-6 rounded-2xl transition-all active:scale-[0.98] shadow-sm"
                  >
                    OK, Masuk ke Dashboard
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
