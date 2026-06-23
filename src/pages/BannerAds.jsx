import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  CreditCard,
  ImagePlus,
  Megaphone,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import { useBanner } from "../hooks/useBanner";

const gradientOptions = [
  {
    id: "purple",
    label: "Ungu Festival",
    value: "from-purple-600 via-indigo-600 to-blue-600",
  },
  {
    id: "blue",
    label: "Biru Bisnis",
    value: "from-blue-600 via-cyan-600 to-teal-600",
  },
  {
    id: "warm",
    label: "Sunset Promo",
    value: "from-orange-500 via-rose-500 to-pink-600",
  },
  {
    id: "green",
    label: "Hijau Fresh",
    value: "from-emerald-600 via-teal-500 to-cyan-500",
  },
];

function SummaryRow({
  label,
  value,
  strong = false,
  labelClassName = "text-sm text-slate-500",
  valueClassName = "text-sm font-medium text-slate-700",
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-surface-100 last:border-b-0">
      <span className={labelClassName}>{label}</span>
      <span className={strong ? "text-sm font-bold text-white" : valueClassName}>
        {value}
      </span>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="p-8 text-center bg-white shadow-xl rounded-3xl">
      <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-100">
        <BadgeCheck className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-3xl font-black text-slate-900">
        Pengajuan Banner Terkirim
      </h1>
      <p className="max-w-lg mx-auto mt-4 text-sm leading-relaxed text-slate-500">
        Tim Goleet akan memverifikasi pembayaran dan materi banner Anda. Setelah
        disetujui admin, banner akan siap dijadwalkan tayang di carousel utama.
      </p>
      <div className="flex flex-col justify-center gap-3 mt-8 sm:flex-row">
        <Link to="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
        <Link to="/pricing" className="btn-secondary">
          Lihat Paket Lain
        </Link>
      </div>
    </div>
  );
}

export default function BannerAds() {
  const { submitBannerRequest } = useBanner();
  const [done, setDone] = useState(false);
  const [bannerImageName, setBannerImageName] = useState("");
  const [paymentProofName, setPaymentProofName] = useState("");
  const [formData, setFormData] = useState({
    advertiserName: "",
    advertiserEmail: "",
    advertiserPhone: "",
    title: "",
    subtitle: "",
    cta: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=1200&q=80",
    bg: gradientOptions[0].value,
    paymentMethod: "Transfer Bank BCA",
  });

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleBannerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerImageName(file.name);
    updateField(
      "image",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    );
  };

  const handlePaymentProofChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPaymentProofName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBannerRequest({
      ...formData,
      bannerImageName,
      paymentProofName,
      paymentStatus: "pending",
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-surface-50">
        <div className="max-w-3xl px-4 mx-auto sm:px-6">
          <SuccessScreen />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-surface-50">
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-0 left-0 w-72 h-72 bg-white/10 blur-3xl" />
          <div className="absolute rounded-full bottom-0 right-0 w-80 h-80 bg-cyan-400/20 blur-3xl" />
        </div>
        <div className="relative max-w-6xl px-4 py-14 mx-auto sm:px-6">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Pricing
          </Link>
          <div className="grid items-start gap-8 mt-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full bg-white/10 border-white/20">
                <Megaphone className="w-4 h-4 text-amber-300" />
                Banner Placement
              </div>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                Pasang banner campaign
                <br />
                di carousel utama Goleet.id
              </h1>
              <p className="max-w-2xl mt-5 text-base leading-relaxed text-blue-100">
                Cocok untuk event lokal, promo grand opening, seasonal push,
                atau awareness brand. Slot banner dikenakan biaya tetap Rp
                500.000 per pengajuan.
              </p>
            </div>

            <div className="p-6 border bg-white/10 backdrop-blur-sm rounded-3xl border-white/15 text-white">
              <h2 className="text-lg font-bold">Ringkasan Paket</h2>
              <div className="mt-4 space-y-1">
                <SummaryRow
                  label="Harga"
                  value="Rp 500.000"
                  strong
                  labelClassName="text-sm text-white/70"
                />
                <SummaryRow
                  label="Placement"
                  value="Carousel banner homepage"
                  labelClassName="text-sm text-white/70"
                  valueClassName="text-sm font-medium text-white"
                />
                <SummaryRow
                  label="Durasi review"
                  value="1-2 hari kerja"
                  labelClassName="text-sm text-white/70"
                  valueClassName="text-sm font-medium text-white"
                />
                <SummaryRow
                  label="Materi wajib"
                  value="Visual, CTA, deskripsi"
                  labelClassName="text-sm text-white/70"
                  valueClassName="text-sm font-medium text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="grid max-w-6xl gap-8 px-4 mx-auto lg:grid-cols-[1.15fr_0.85fr] sm:px-6">
          <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-3xl sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-600 shadow-glow-blue">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Detail Campaign Banner
                </h2>
                <p className="text-sm text-slate-500">
                  Isi data campaign, upload materi, lalu kirim bukti pembayaran.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-base" htmlFor="banner-business-name">
                  Nama Bisnis / Brand
                </label>
                <input
                  id="banner-business-name"
                  type="text"
                  value={formData.advertiserName}
                  onChange={(e) => updateField("advertiserName", e.target.value)}
                  className="input-base"
                  placeholder="cth: FitZone Purbalingga"
                  required
                />
              </div>
              <div>
                <label className="label-base" htmlFor="banner-email">
                  Email PIC
                </label>
                <input
                  id="banner-email"
                  type="email"
                  value={formData.advertiserEmail}
                  onChange={(e) => updateField("advertiserEmail", e.target.value)}
                  className="input-base"
                  placeholder="promo@brand.id"
                  required
                />
              </div>
              <div>
                <label className="label-base" htmlFor="banner-phone">
                  Nomor WhatsApp
                </label>
                <input
                  id="banner-phone"
                  type="tel"
                  value={formData.advertiserPhone}
                  onChange={(e) => updateField("advertiserPhone", e.target.value)}
                  className="input-base"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>
              <div>
                <label className="label-base" htmlFor="banner-cta">
                  CTA Button
                </label>
                <input
                  id="banner-cta"
                  type="text"
                  value={formData.cta}
                  onChange={(e) => updateField("cta", e.target.value)}
                  className="input-base"
                  placeholder="Lihat Promo"
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="label-base" htmlFor="banner-title">
                Judul Banner
              </label>
              <input
                id="banner-title"
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="input-base"
                placeholder="Grand Opening FitZone Purbalingga"
                required
              />
            </div>

            <div className="mt-5">
              <label className="label-base" htmlFor="banner-subtitle">
                Subtitle Banner
              </label>
              <textarea
                id="banner-subtitle"
                rows={3}
                value={formData.subtitle}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="resize-none input-base"
                placeholder="Potongan membership dan bonus personal trainer untuk pendaftar awal."
                required
              />
            </div>

            <div className="mt-5">
              <label className="label-base" htmlFor="banner-description">
                Deskripsi Campaign
              </label>
              <textarea
                id="banner-description"
                rows={4}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="resize-none input-base"
                placeholder="Ceritakan tujuan campaign, periode tayang, dan konteks promo."
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
              <div>
                <label className="label-base" htmlFor="banner-gradient">
                  Overlay Gradient
                </label>
                <select
                  id="banner-gradient"
                  value={formData.bg}
                  onChange={(e) => updateField("bg", e.target.value)}
                  className="input-base"
                >
                  {gradientOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-base" htmlFor="banner-payment-method">
                  Metode Pembayaran
                </label>
                <select
                  id="banner-payment-method"
                  value={formData.paymentMethod}
                  onChange={(e) => updateField("paymentMethod", e.target.value)}
                  className="input-base"
                >
                  <option>Transfer Bank BCA</option>
                  <option>VA Mandiri</option>
                  <option>QRIS Bisnis</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2">
              <div>
                <label className="label-base" htmlFor="banner-image-upload">
                  Upload Gambar Banner
                </label>
                <label
                  htmlFor="banner-image-upload"
                  className="flex flex-col items-center justify-center p-5 text-center transition-all border-2 border-dashed rounded-2xl cursor-pointer border-surface-200 bg-surface-50 hover:border-primary-400 hover:bg-primary-50"
                >
                  <ImagePlus className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-700">
                    {bannerImageName || "Pilih file visual banner"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Rekomendasi rasio lebar seperti carousel landing page
                  </p>
                  <input
                    id="banner-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerImageChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label className="label-base" htmlFor="banner-payment-proof">
                  Upload Bukti Pembayaran
                </label>
                <label
                  htmlFor="banner-payment-proof"
                  className="flex flex-col items-center justify-center p-5 text-center transition-all border-2 border-dashed rounded-2xl cursor-pointer border-surface-200 bg-surface-50 hover:border-primary-400 hover:bg-primary-50"
                >
                  <ReceiptText className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-700">
                    {paymentProofName || "Pilih file bukti pembayaran"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Bisa screenshot transfer atau bukti QRIS
                  </p>
                  <input
                    id="banner-payment-proof"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handlePaymentProofChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-slate-400">
                Dengan mengirim formulir ini, Anda setuju materi akan direview
                terlebih dahulu sebelum tayang.
              </p>
              <button type="submit" className="btn-primary">
                Kirim Pengajuan Banner
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="p-6 bg-white shadow-lg rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-900">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Informasi Pembayaran</h3>
                  <p className="text-sm text-slate-500">
                    Biaya placement banner satu kali pengajuan
                  </p>
                </div>
              </div>
              <div className="p-5 border rounded-2xl border-surface-100 bg-surface-50">
                <p className="text-sm text-slate-500">Total tagihan</p>
                <p className="mt-1 text-3xl font-black text-slate-900">
                  Rp 500.000
                </p>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p>Bank BCA: `1234567890` a.n. PT Goleet Digital Lokal</p>
                  <p>VA Mandiri: `880081234567890`</p>
                  <p>QRIS tersedia untuk pembayaran instan</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-white shadow-lg rounded-3xl">
              <div className="relative h-56">
                <img
                  src={formData.image}
                  alt={formData.title || "Preview banner"}
                  className="object-cover w-full h-full"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${formData.bg} opacity-80`}
                />
                <div className="absolute inset-0 flex items-center px-6">
                  <div className="max-w-sm text-white">
                    <h3 className="text-2xl font-black">
                      {formData.title || "Judul banner Anda akan tampil di sini"}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      {formData.subtitle ||
                        "Subtitle campaign akan mengikuti gaya carousel di landing page."}
                    </p>
                    <div className="inline-flex px-4 py-2 mt-5 text-sm font-bold rounded-xl bg-white text-slate-800">
                      {formData.cta || "CTA Banner"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900">Preview Materi</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Preview ini mengikuti style banner carousel di halaman landing
                  agar user dan admin bisa melihat gambaran final placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
