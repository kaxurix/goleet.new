import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Camera,
  Globe,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDashboardRoute } from "../hooks/useDashboardRoute";

export default function Footer() {
  const { isLoggedIn } = useAuth();
  const dashboardRoute = useDashboardRoute();
  const quickLinks = [
    { label: "Beranda", to: "/" },
    { label: "Cari Bisnis", to: "/search" },
    { label: "Kategori", to: "/search" },
    { label: "Event Lokal", to: "/" },
  ];

  const businessLinks = [
    { label: "Klaim Bisnis", to: "/claim" },
    { label: "Dashboard", to: isLoggedIn ? dashboardRoute : "/auth" },
    { label: "Paket & Harga", to: "/pricing" },
    { label: "Panduan Verifikasi", to: "/claim" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Goleet<span className="text-primary-400">.id</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              Platform direktori bisnis lokal dan B2B SaaS untuk UMKM di
              Purbalingga & sekitarnya. Temukan, hubungi, dan tumbuh bersama.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Camera, label: "Instagram", href: "#" },
                { icon: Globe, label: "Facebook", href: "#" },
                { icon: MessageCircle, label: "WhatsApp", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center transition-all duration-200 w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary-600 group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white uppercase">
              Navigasi
            </h4>
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
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white uppercase">
              Untuk Bisnis
            </h4>
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
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white uppercase">
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">
                  Kampus Blater, Jalan Mayor Jenderal Sungkono KM 5, Kalimanah,
                  Purbalingga, Jawa Tengah
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="flex-shrink-0 w-4 h-4 text-primary-400" />
                <a
                  href="tel:+6281804208860"
                  className="text-sm transition-colors text-slate-400 hover:text-white"
                >
                  +62 818-0420-8860
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="flex-shrink-0 w-4 h-4 text-primary-400" />
                <a
                  href="mailto:hello@goleet.id"
                  className="text-sm transition-colors text-slate-400 hover:text-white"
                >
                  hello@goleet.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t border-slate-800 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Goleet.id — Platform UMKM Lokal Purbalingga. Semua hak
            dilindungi.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs transition-colors text-slate-500 hover:text-slate-300"
            >
              Privasi
            </a>
            <a
              href="#"
              className="text-xs transition-colors text-slate-500 hover:text-slate-300"
            >
              Ketentuan Layanan
            </a>
            <a
              href="#"
              className="text-xs transition-colors text-slate-500 hover:text-slate-300"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
