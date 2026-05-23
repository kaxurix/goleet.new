import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Camera, Globe, MessageCircle, ExternalLink } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { label: 'Beranda', to: '/' },
    { label: 'Cari Bisnis', to: '/search' },
    { label: 'Kategori', to: '/search' },
    { label: 'Event Lokal', to: '/' },
  ];

  const businessLinks = [
    { label: 'Klaim Bisnis', to: '/claim' },
    { label: 'Dashboard Merchant', to: '/dashboard/merchant' },
    { label: 'Paket & Harga', to: '/claim' },
    { label: 'Panduan Verifikasi', to: '/claim' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Goleet<span className="text-primary-400">.id</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Platform direktori bisnis lokal dan B2B SaaS untuk UMKM di Purbalingga & sekitarnya. Temukan, hubungi, dan tumbuh bersama.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Camera, label: 'Instagram', href: '#' },
                { icon: Globe, label: 'Facebook', href: '#' },
                { icon: MessageCircle, label: 'WhatsApp', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Navigasi</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Untuk Bisnis</h4>
            <ul className="space-y-3">
              {businessLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">Jl. HR. Bunyamin No. 993, Purwokerto, Purbalingga 53122</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:hello@goleet.id" className="text-sm text-slate-400 hover:text-white transition-colors">
                  hello@goleet.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Goleet.id — Platform UMKM Lokal Purbalingga. Semua hak dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privasi</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Ketentuan Layanan</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
