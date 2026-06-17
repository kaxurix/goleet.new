import {
  Check,
  Megaphone,
  Rocket,
  Shield,
  Sparkles,
  Store,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const plans = [
  {
    slug: "free",
    title: "Lapak Gratis",
    price: "Rp 0",
    description:
      "Mulai tampil online dengan profil bisnis yang rapi dan meyakinkan.",
    icon: Store,
    accent: "from-slate-100 via-white to-blue-50",
    badge: "Tier 1 — Free",
    featured: false,
    benefits: [
      "Profil bisnis + alamat, kontak, jam operasional",
      "Maksimal 5 foto produk/layanan",
      "Muncul di pencarian kategori lokal",
      "Tombol WhatsApp langsung",
    ],
    buttonText: "Mulai Gratis",
  },
  {
    slug: "promo",
    title: "Booster Promo",
    price: "Rp 49k/bulan",
    description:
      "Campaign pendek untuk promo, launching, atau event lokal—hasil cepat, biaya terjangkau.",
    icon: Megaphone,
    accent: "from-amber-100 via-orange-50 to-white",
    badge: "Tier 2 — Most Popular",
    featured: false,
    benefits: [
      "Highlight promosi di section rekomendasi",
      "Template siap pakai + copy promo dibantu",
      "Cocok diskon, launching, event lokal",
      "Data campaign performa (klik, konversi)",
    ],
    buttonText: "Beli Sekarang",
  },
  {
    slug: "premium",
    title: "Premium Plus",
    price: "Rp 99k/bulan",
    description:
      "Untuk bisnis yang ingin trust tinggi, visibilitas stabil, dan terus dapat leads.",
    icon: Rocket,
    accent: "from-primary-600 via-indigo-600 to-sky-500",
    badge: "Tier 3 — Recommended",
    featured: true,
    benefits: [
      "SEMUA fitur Booster Promo",
      "Prioritas tampil di hasil pencarian",
      "Badge premium + profile polish",
      "Insight mendalam: visitor, engagement, trend",
      "Promo mingguan + highlight layanan unggulan",
    ],
    buttonText: "Pilih Premium",
  },
  {
    slug: "banner",
    title: "Banner & Campaign Ads",
    price: "Rp 500k/bulan",
    description:
      "Visibility maksimal lewat placement banner hero—untuk brand yang mau jangkauan besar.",
    icon: Star,
    accent: "from-emerald-100 via-cyan-50 to-white",
    badge: "Tier 4 — Scale Fast",
    featured: false,
    benefits: [
      "Placement di banner hero/carousel utama",
      "Desain visual campaign—tim kami bantu",
      "Jadwal tayang fleksibel (mingguan/bulanan)",
      "Dashboard reporting + performance tracking",
    ],
    buttonText: "Pasang Banner",
  },
];

const trustPoints = [
  {
    icon: Shield,
    title: "Format yang familiar",
    description:
      "Setiap paket dirancang tetap konsisten dengan alur direktori bisnis dan gaya visual Goleet.id.",
  },
  {
    icon: Sparkles,
    title: "Siap untuk tumbuh",
    description:
      "Benefit dirancang untuk membantu UMKM bertransisi dari offline ke ekosistem digital dengan mudah.",
  },
  {
    icon: Check,
    title: "Fokus ke konversi",
    description:
      "Strukturnya dibuat supaya pengunjung cepat paham beda tiap paket tanpa perlu membaca terlalu lama.",
  },
];

function PlanCard({ plan }) {
  const Icon = plan.icon;

  return (
    <article
      className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${
        plan.featured
          ? "bg-hero-gradient border-transparent shadow-2xl text-white hover:-translate-y-1"
          : "bg-white border-surface-100 shadow-card hover:shadow-card-hover hover:-translate-y-1"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${plan.accent} ${plan.featured ? "opacity-20" : "opacity-80"}`}
      />
      <div className="relative p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2
              className={`text-2xl font-black ${plan.featured ? "text-white" : "text-slate-900"}`}
            >
              {plan.title}
            </h2>
            <p
              className={`mt-2 text-sm leading-relaxed ${plan.featured ? "text-blue-100" : "text-slate-500"}`}
            >
              {plan.description}
            </p>
          </div>
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              plan.featured
                ? "bg-white/15 border border-white/20"
                : "bg-slate-900 text-white"
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <div className="mb-6">
          <div
            className={`text-sm font-medium ${plan.featured ? "text-blue-100" : "text-slate-500"}`}
          >
            Mulai dari
          </div>
          <div
            className={`text-3xl font-black tracking-tight ${plan.featured ? "text-white" : "text-slate-900"}`}
          >
            {plan.price}
          </div>
        </div>

        <ul className="space-y-3">
          {plan.benefits.map((benefit) => (
            <li
              key={benefit}
              className={`flex items-start gap-3 text-sm leading-relaxed ${plan.featured ? "text-white/90" : "text-slate-600"}`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                  plan.featured ? "bg-white/15" : "bg-primary-50"
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 ${plan.featured ? "text-white" : "text-primary-600"}`}
                />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            to={plan.slug === "banner" ? "/banner-ads" : "/claim"}
            className={`inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 font-semibold transition-all duration-200 active:scale-95 ${
              plan.featured
                ? "bg-white text-primary-700 hover:bg-blue-50"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {plan.buttonText}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Pricing() {
  const navigate = useNavigate();

  // Memisahkan paket sesuai instruksi
  const merchantPlans = plans.filter((p) =>
    ["free", "promo", "premium"].includes(p.slug),
  );
  const adsPlans = plans.filter((p) => p.slug === "banner");

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar Minimalis */}
      <nav className="w-full bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/80">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 select-none">
          Version 2.0
        </span>
      </nav>

      {/* Hero Section */}

      {/* Content Section */}
      <div className="max-w-7xl mx-auto flex flex-col items-center px-4 sm:px-6 py-12 space-y-16">
        {/* Merchant Section */}
        <section className="">
          <div className="border-b border-slate-100 mb-8 bg-white p-4 rounded-xl">
            <h2 className="text-2xl font-black text-slate-900">
              Merchant Plans
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Opsi pengelolaan lapak dan profil bisnis reguler Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {merchantPlans.map((plan) => (
              <PlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </section>

        {/* Ads Section */}
        <section>
          <div className="border-b border-slate-100 pb-4 mb-8">
            <h2 className="text-2xl font-black text-slate-900">Ads Section</h2>
            <p className="text-sm text-slate-500 mt-1">
              Maksimalkan visibilitas brand dengan penempatan iklan premium.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {adsPlans.map((plan) => (
              <PlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
