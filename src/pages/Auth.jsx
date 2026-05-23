import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ChevronRight, Eye, EyeOff, Sparkles, ArrowLeft, Shield, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [tab, setTab] = useState('login');
  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState('merchant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(email, password, tab === 'login' ? 'merchant' : role);
    setLoading(false);
    navigate('/dashboard/merchant');
  };

  const features = [
    { icon: Shield, text: '10.000+ Bisnis Terdaftar' },
    { icon: TrendingUp, text: 'Dashboard Analytics Bisnis' },
    { icon: Sparkles, text: 'AI Review Summarizer' },
    { icon: Zap, text: 'Chat & Nego via WhatsApp' },
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* ── Left Panel — STATIC, never moves ── */}
      <div className="hidden lg:block w-1/2 bg-hero-gradient relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />

        {/* Content — absolutely positioned so it never shifts */}
        <div className="absolute inset-0 flex flex-col p-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Goleet<span className="text-white/60">.id</span>
              </span>
            </Link>
          </div>

          {/* Main content — centered */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="w-14 h-14 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 border border-white/20">
              <Sparkles className="w-8 h-8 text-amber-300" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">
              Platform Bisnis Lokal<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                Terpercaya di Purbalingga
              </span>
            </h2>
            <p className="text-blue-100 mb-10 leading-relaxed text-base">
              Bergabunglah dengan ribuan pemilik bisnis yang sudah mengembangkan usaha mereka bersama Goleet.id.
            </p>
            <ul className="space-y-4">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="text-white/90 text-sm font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0">
            <p className="text-white/30 text-xs">© 2026 Goleet.id — All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-start justify-center pt-16 px-6 sm:px-12 pb-12 bg-surface-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>

          {/* Tab switcher */}
          <div className="flex gap-1 bg-surface-200 p-1 rounded-2xl mb-8">
            {['login', 'register'].map((t) => (
              <button
                key={t}
                id={`auth-tab-${t}`}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  tab === t ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'login' ? 'Masuk' : 'Daftar'}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900">
              {tab === 'login' ? 'Selamat Datang Kembali 👋' : 'Buat Akun Baru'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {tab === 'login' ? 'Masuk untuk mengelola bisnis Anda' : 'Daftar gratis, mulai dalam 2 menit'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama — hanya di register */}
            {tab === 'register' && (
              <div>
                <label className="label-base" htmlFor="auth-name">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Nama lengkap Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-base pl-10"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="label-base" htmlFor="auth-email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="auth-email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-base pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label-base" htmlFor="auth-password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="auth-password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Min. 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-base pl-10 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role selector — hanya di register */}
            {tab === 'register' && (
              <div>
                <label className="label-base" htmlFor="auth-role">Daftar sebagai</label>
                <select
                  id="auth-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-base"
                >
                  <option value="merchant">Pemilik Bisnis / Merchant</option>
                  <option value="user">Pengguna Umum</option>
                </select>
              </div>
            )}

            {/* Lupa password — hanya di login */}
            {tab === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary-600 hover:text-primary-800">
                  Lupa password?
                </button>
              </div>
            )}

            <button
              type="submit"
              id="auth-submit-btn"
              disabled={loading}
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-70 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>{tab === 'login' ? 'Masuk' : 'Buat Akun'} <ChevronRight className="w-4 h-4" /></>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-surface-200" />
              <span className="text-xs text-slate-400">atau</span>
              <div className="flex-1 h-px bg-surface-200" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              id="auth-google-btn"
              className="w-full py-3.5 border border-surface-200 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-surface-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Lanjutkan dengan Google
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {tab === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button
              onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
              className="text-primary-600 font-semibold hover:underline"
            >
              {tab === 'login' ? 'Daftar sekarang' : 'Masuk'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
