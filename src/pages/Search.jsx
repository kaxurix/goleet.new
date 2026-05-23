import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { Icon } from '@iconify/react';
import MerchantCard from '../components/MerchantCard';
import { merchants, categories } from '../data/data';

const categoryIcons = {
  kuliner: 'mdi:silverware-fork-knife',
  otomotif: 'mdi:car-wrench',
  teknologi: 'mdi:laptop',
  fashion: 'mdi:tshirt-crew',
  kesehatan: 'mdi:hospital-box',
  pendidikan: 'mdi:book-education',
  jasa: 'mdi:toolbox-outline',
  hiburan: 'mdi:music-circle',
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCat, setSelectedCat] = useState(searchParams.get('cat') || '');
  const [sortBy, setSortBy] = useState('rating');
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = merchants
    .filter((m) => {
      const matchQuery = !query || m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        m.categoryLabel.toLowerCase().includes(query.toLowerCase());
      const matchCat = !selectedCat || m.category === selectedCat;
      const matchRating = m.rating >= minRating;
      const matchVerified = !verifiedOnly || m.verified;
      return matchQuery && matchCat && matchRating && matchVerified;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price') return a.priceStart - b.priceStart;
      return 0;
    });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query, cat: selectedCat });
  };

  const clearFilter = () => {
    setQuery('');
    setSelectedCat('');
    setMinRating(0);
    setVerifiedOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters = query || selectedCat || minRating > 0 || verifiedOnly;

  return (
    <div className="min-h-screen bg-surface-50 pt-16">
      {/* Search Header */}
      <div className="bg-white border-b border-surface-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                id="search-input"
                placeholder="Cari bisnis, produk, layanan..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-base pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-6">
              Cari
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`hidden items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-700 border-surface-200 hover:border-primary-300'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-amber-400" />}
            </button>
          </form>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-slate-500">Filter aktif:</span>
              {query && (
                <span className="flex items-center gap-1 bg-primary-50 text-primary-700 text-xs px-2.5 py-1 rounded-full">
                  "{query}"
                  <button onClick={() => setQuery('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCat && (
                <span className="flex items-center gap-1 bg-primary-50 text-primary-700 text-xs px-2.5 py-1 rounded-full">
                  {categories.find((c) => c.id === selectedCat)?.label}
                  <button onClick={() => setSelectedCat('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full">
                  ≥{minRating}★
                  <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={clearFilter} className="text-xs text-red-500 hover:text-red-700 ml-1">Hapus semua</button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${
            showFilters ? 'block' : 'hidden lg:block'
          } w-64 flex-shrink-0`}>
            <div className="card p-5 sticky top-36">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900">Filter</h3>
                {hasActiveFilters && (
                  <button onClick={clearFilter} className="text-xs text-primary-600 hover:text-primary-800">Reset</button>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Kategori</h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCat('')}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                      !selectedCat ? 'bg-primary-50 text-primary-700 font-medium' : 'text-slate-600 hover:bg-surface-50'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id)}
                      className={`w-full text-left flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all ${
                        selectedCat === cat.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-slate-600 hover:bg-surface-50'
                      }`}
                    >
                      <Icon icon={categoryIcons[cat.id] || 'mdi:shape-outline'} className="w-4 h-4 shrink-0" />
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Min Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Rating Minimum</h4>
                <div className="space-y-1.5">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                        minRating === r ? 'bg-primary-50 text-primary-700 font-medium' : 'text-slate-600 hover:bg-surface-50'
                      }`}
                    >
                      {r === 0 ? 'Semua Rating' : `≥ ${r} Bintang`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified only */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Status</h4>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800">Verified Pro saja</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Sort & count bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                Menampilkan <span className="font-semibold text-slate-800">{filtered.length}</span> bisnis
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-surface-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  <option value="rating">Rating Tertinggi</option>
                  <option value="reviews">Terbanyak Diulas</option>
                  <option value="price">Harga Terendah</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Bisnis tidak ditemukan</h3>
                <p className="text-slate-500 mb-6">Coba ubah kata kunci atau hapus filter yang aktif</p>
                <button onClick={clearFilter} className="btn-primary">Reset Filter</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((merchant) => (
                  <MerchantCard key={merchant.id} merchant={merchant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
