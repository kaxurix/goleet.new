import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Shield, Zap, TrendingUp, MapPin, Star } from 'lucide-react';
import MerchantCard from '../components/MerchantCard';
import { merchants, categories, banners } from '../data/data';

function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [catOpen, setCatOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}&cat=${selectedCategory}`);
  };

  const stats = [
    { value: '10.000+', label: 'Bisnis Terdaftar' },
    { value: '4.8★', label: 'Rating Rata-rata' },
    { value: '50.000+', label: 'Pengguna Aktif' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-32">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Direktori Bisnis Lokal #1 di Purbalingga
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-slide-up text-balance">
          Arep Golet Apa
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">Dina Kiye?</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          Temukan bisnis lokal terbaik di Purbalingga — dari kuliner, otomotif, hingga jasa profesional. Semua ada di Goleet.id.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-12 animate-slide-up"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="hero-search-input"
              placeholder="Cari bisnis, layanan, produk..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl placeholder-slate-400"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 w-full sm:w-auto px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-2xl text-sm font-medium hover:bg-white/20 transition-all"
            >
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.label : 'Semua Kategori'}
              <ChevronDown className="w-4 h-4" />
            </button>
            {catOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-surface-100 z-50 min-w-[180px] overflow-hidden">
                <button
                  onClick={() => { setSelectedCategory(''); setCatOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  Semua Kategori
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setCatOpen(false); }}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            id="hero-search-btn"
            className="px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Cari
          </button>
        </form>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 animate-fade-in">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-xs text-blue-200 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 0C1440 0 1080 60 720 60C360 60 0 0 0 0L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    setCurrent(idx);
    clearInterval(intervalRef.current);
    startAuto();
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-80">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bg} opacity-80`} />
              <div className="absolute inset-0 flex items-center px-10 sm:px-16">
                <div className="max-w-lg">
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">{banner.title}</h2>
                  <p className="text-white/80 text-sm sm:text-base mb-6">{banner.subtitle}</p>
                  <button className="px-6 py-3 bg-white text-slate-800 font-bold rounded-xl hover:bg-white/90 transition-all text-sm shadow-lg hover:scale-105 active:scale-95">
                    {banner.cta} →
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-white w-8' : 'bg-white/40 w-2'}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button onClick={() => goTo((current - 1 + banners.length) % banners.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => goTo((current + 1) % banners.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Temukan Berdasarkan Kategori</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Jelajahi ribuan bisnis lokal di berbagai bidang</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-${cat.id}`}
              onClick={() => navigate(`/search?cat=${cat.id}`)}
              className="group relative flex flex-col items-center gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden text-left"
            >
              {/* Subtle gradient blob behind icon */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />

              {/* Icon container */}
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl leading-none">{cat.icon}</span>
              </div>

              {/* Label */}
              <div className="relative text-center">
                <span className="block text-sm font-bold text-slate-800 group-hover:text-primary-700 transition-colors leading-tight">{cat.label}</span>
                <span className="block text-xs text-slate-400 mt-0.5 group-hover:text-primary-400 transition-colors">Lihat bisnis →</span>
              </div>

              {/* Active indicator */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-12 bg-gradient-to-r ${cat.gradient} rounded-full transition-all duration-300`} />
            </button>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
          >
            Lihat Semua Bisnis
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function TopRecommendations() {
  const featured = merchants.filter((m) => m.verified).slice(0, 6);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">Rekomendasi Teratas</h2>
            <p className="section-subtitle">Bisnis lokal terpercaya & terverifikasi</p>
          </div>
          <Link to="/search" className="btn-secondary text-sm hidden sm:inline-flex">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((merchant) => (
            <MerchantCard key={merchant.id} merchant={merchant} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/search" className="btn-secondary">
            Lihat Semua Bisnis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyGoleet() {
  const features = [
    { icon: Shield, title: 'Terverifikasi & Terpercaya', desc: 'Setiap bisnis melewati proses verifikasi identitas dan dokumen resmi.' },
    { icon: Sparkles, title: 'AI Review Summarizer', desc: 'Ringkasan ulasan otomatis berbasis AI untuk keputusan lebih cepat.' },
    { icon: Zap, title: 'Chat & Nego Langsung', desc: 'Hubungi bisnis langsung via WhatsApp — tanpa perantara, lebih hemat.' },
    { icon: TrendingUp, title: 'Dashboard Bisnis Lengkap', desc: 'Kelola reputasi, analitik, dan pertumbuhan bisnis Anda dari satu tempat.' },
  ];
  return (
    <section className="py-16 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Mengapa Goleet.id?</h2>
          <p className="section-subtitle">Platform yang dirancang untuk menghubungkan komunitas lokal</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 card-hover text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-5 shadow-glow-blue">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Punya Bisnis Lokal? Daftarkan Sekarang!
        </h2>
        <p className="text-blue-100 mb-8 text-lg">
          Jangkau ribuan calon pelanggan digital di Purbalingga. Mulai gratis 30 hari.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/claim" className="px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:bg-blue-50 shadow-xl transition-all hover:scale-105 active:scale-95">
            Klaim Bisnis Saya
          </Link>
          <Link to="/search" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all">
            Jelajahi Bisnis
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div>
      <HeroSection />
      <BannerCarousel />
      <TopRecommendations />
      <CategoryGrid />
      <WhyGoleet />
      <CTABanner />
    </div>
  );
}
