import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, LayoutDashboard, LogIn, LogOut, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/data';

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const navLinks = [
    { label: 'Beranda', to: '/' },
    { label: 'Cari Bisnis', to: '/search' },
    { label: 'Daftarkan Bisnis', to: '/claim' },
  ];

  const bgClass = isLanding
    ? scrolled
      ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-surface-100'
      : 'bg-transparent'
    : 'bg-white border-b border-surface-100 shadow-sm';

  const textClass = isLanding && !scrolled ? 'text-white' : 'text-slate-700';
  const logoClass = isLanding && !scrolled ? 'text-white' : 'gradient-text';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className={`font-extrabold text-2xl tracking-tight ${logoClass}`}>
              Goleet<span className={isLanding && !scrolled ? 'text-white/70' : 'text-primary-400'}>.id</span>
            </span>
          </Link>

          {/* Search bar — hidden on landing hero, shown on other pages */}
          {!isLanding && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari bisnis, layanan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-200 bg-surface-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                />
              </div>
            </form>
          )}

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? isLanding && !scrolled ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-700'
                    : `${textClass} hover:bg-white/10`
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-5 bg-current opacity-20 mx-2" />

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to={user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/merchant'}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isLanding && !scrolled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className={`p-2 rounded-lg transition-all ${textClass} hover:bg-white/10`}
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isLanding && !scrolled
                    ? 'bg-white text-primary-700 hover:bg-white/90'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg ${textClass} hover:bg-white/10 transition-all`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden bg-white border-t border-surface-100 shadow-lg transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-1">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari bisnis, layanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </form>

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.to
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-700 hover:bg-surface-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-surface-100">
            {isLoggedIn ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/merchant'}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-primary-700 bg-primary-50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button onClick={logout} className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 mt-1">
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </>
            ) : (
              <Link to="/auth" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all">
                <LogIn className="w-4 h-4" />
                Masuk / Daftar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
