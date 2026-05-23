import { Check, Megaphone, Rocket, Shield, Sparkles, Store, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    title: 'Lapak Gratis',
    price: 'Rp 0',
    description: 'Mulai tampil online dengan profil bisnis sederhana yang tetap terlihat rapi dan meyakinkan.',
    icon: Store,
    accent: 'from-slate-100 via-white to-blue-50',
    badge: 'Mulai Cepat',
    featured: false,
    benefits: [
      'Profil bisnis dasar dengan alamat, kontak, dan jam operasional',
      'Maksimal 5 foto produk atau layanan',
      'Muncul di pencarian kategori lokal',
      'Tombol WhatsApp langsung ke pelanggan',
    ],
  },
  {
    title: 'SaaS Premium',
    price: 'Rp 99k',
    description: 'Paket inti untuk bisnis yang ingin tampil lebih serius, lebih dipercaya, dan lebih mudah dipilih.',
    icon: Rocket,
    accent: 'from-primary-600 via-indigo-600 to-sky-500',
    badge: 'Paling Populer',
    featured: true,
    benefits: [
      'Semua fitur Lapak Gratis',
      'Prioritas tampil di hasil pencarian pilihan',
      'Insight performa profil dan klik pelanggan',
      'Badge premium untuk meningkatkan trust',
      'Bisa pasang promo mingguan dan highlight layanan unggulan',
    ],
  },
  {
    title: 'Promote My Business',
    price: 'Rp 49k',
    description: 'Dorong campaign singkat untuk promo musiman, grand opening, atau produk baru yang butuh perhatian cepat.',
    icon: Megaphone,
    accent: 'from-amber-100 via-orange-50 to-white',
    badge: 'Booster Promo',
    featured: false,
    benefits: [
      'Highlight promosi selama periode campaign aktif',
      'Slot tampil di section rekomendasi promosi',
      'Copy promo singkat dibantu template siap pakai',
      'Cocok untuk diskon, launching, atau event lokal',
    ],
  },
  {
    title: 'Banner dan Iklan',
    price: 'Rp 500k',
    description: 'Untuk brand yang ingin visibilitas besar lewat area banner utama dan placement yang lebih agresif.',
    icon: Star,
    accent: 'from-emerald-100 via-cyan-50 to-white',
    badge: 'Awareness Maksimal',
    featured: false,
    benefits: [
      'Placement banner di area hero atau carousel promosi',
      'Desain visual campaign dummy bisa dibantu tim',
      'Jadwal tayang fleksibel sesuai kebutuhan campaign',
      'Cocok untuk brand campaign, event, atau seasonal push',
    ],
  },
];

const trustPoints = [
  {
    icon: Shield,
    title: 'Format yang familiar',
    description: 'Setiap paket dirancang tetap konsisten dengan alur direktori bisnis dan gaya visual Goleet.id.',
  },
  {
    icon: Sparkles,
    title: 'Siap untuk dummy dulu',
    description: 'Benefit saat ini dibuat sebagai placeholder yang tetap terasa realistis untuk presentasi atau validasi awal.',
  },
  {
    icon: Check,
    title: 'Fokus ke konversi',
    description: 'Strukturnya dibuat supaya pengunjung cepat paham beda tiap paket tanpa perlu membaca terlalu lama.',
  },
];

function PlanCard({ plan }) {
  const Icon = plan.icon;

  return (
    <article
      className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${
        plan.featured
          ? 'bg-hero-gradient border-transparent shadow-2xl text-white hover:-translate-y-1'
          : 'bg-white border-surface-100 shadow-card hover:shadow-card-hover hover:-translate-y-1'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${plan.accent} ${plan.featured ? 'opacity-20' : 'opacity-80'}`} />
      <div className="relative p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-4 ${
                plan.featured ? 'bg-white/15 text-white border border-white/20' : 'bg-primary-50 text-primary-700'
              }`}
            >
              {plan.badge}
            </span>
            <h2 className={`text-2xl font-black ${plan.featured ? 'text-white' : 'text-slate-900'}`}>{plan.title}</h2>
            <p className={`mt-2 text-sm leading-relaxed ${plan.featured ? 'text-blue-100' : 'text-slate-500'}`}>
              {plan.description}
            </p>
          </div>
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              plan.featured ? 'bg-white/15 border border-white/20' : 'bg-slate-900 text-white'
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <div className="mb-6">
          <div className={`text-sm font-medium ${plan.featured ? 'text-blue-100' : 'text-slate-500'}`}>Mulai dari</div>
          <div className={`text-4xl font-black tracking-tight ${plan.featured ? 'text-white' : 'text-slate-900'}`}>
            {plan.price}
          </div>
        </div>

        <ul className="space-y-3">
          {plan.benefits.map((benefit) => (
            <li
              key={benefit}
              className={`flex items-start gap-3 text-sm leading-relaxed ${plan.featured ? 'text-white/90' : 'text-slate-600'}`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                  plan.featured ? 'bg-white/15' : 'bg-primary-50'
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${plan.featured ? 'text-white' : 'text-primary-600'}`} />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            to="/claim"
            className={`inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 font-semibold transition-all duration-200 active:scale-95 ${
              plan.featured
                ? 'bg-white text-primary-700 hover:bg-blue-50'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Pilih Paket
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Pricing() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-hero-gradient pt-28 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl text-center mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Paket untuk tampil, promosi, dan tumbuh
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight text-balance">
              Pricing yang simpel,
              <br />
              tapi tetap terasa siap jualan
            </h1>
            <p className="mt-5 text-lg text-blue-100 leading-relaxed">
              Halaman ini mengikuti gaya visual Goleet.id: hero gradien kuat, kartu membulat, copy ringkas, dan CTA yang langsung jelas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title">Pilih Paket yang Pas</h2>
            <p className="section-subtitle">Mulai dari listing gratis sampai exposure penuh untuk campaign bisnis Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => (
              <PlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div className="card p-8">
              <h2 className="section-title">Arah styling yang dipakai</h2>
              <p className="section-subtitle">
                Supaya page baru ini tidak terasa asing, saya pertahankan ritme visual yang sudah kuat di landing page dan komponen publik.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {trustPoints.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="rounded-2xl bg-surface-50 border border-surface-100 p-5">
                    <div className="w-11 h-11 rounded-2xl bg-primary-600 flex items-center justify-center shadow-glow-blue mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-primary-300">Next Step</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">Butuh paket custom untuk campaign lokal?</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Kita bisa arahkan pengguna ke alur klaim bisnis dulu, lalu tindak lanjuti penawaran sesuai kebutuhan promosi.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/claim" className="btn-primary justify-center">
                  Klaim Bisnis
                </Link>
                <Link to="/search" className="btn-secondary justify-center">
                  Lihat Direktori
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
