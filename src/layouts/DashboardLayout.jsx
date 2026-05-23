import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Star, BarChart2, Settings, LogOut,
  Menu, X, Bell, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const merchantNavItems = [
  { label: 'Overview',   sectionId: 'merchant-overview',  icon: LayoutDashboard },
  { label: 'Ulasan',     sectionId: 'merchant-reviews',   icon: Star },
  { label: 'Analitik',  sectionId: 'merchant-analytics', icon: BarChart2 },
  { label: 'Pengaturan',sectionId: 'merchant-settings',  icon: Settings },
];

const adminNavItems = [
  { label: 'Overview',   sectionId: 'admin-overview',    icon: LayoutDashboard },
  { label: 'Analitik',  sectionId: 'admin-analytics',   icon: BarChart2 },
  { label: 'Verifikasi', sectionId: 'admin-verify',      icon: Star },
  { label: 'Pengaturan',sectionId: 'admin-settings',    icon: Settings },
];

export default function DashboardLayout({ variant = 'merchant', children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = variant === 'admin';
  const navItems = isAdmin ? adminNavItems : merchantNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarBg = isAdmin
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-surface-200';
  const sidebarText = isAdmin ? 'text-slate-300' : 'text-slate-600';
  const logoText = isAdmin ? 'text-white' : 'gradient-text';
  const activeCls = isAdmin
    ? 'bg-white/10 text-white'
    : 'bg-primary-50 text-primary-700';
  const inactiveCls = isAdmin
    ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
    : 'text-slate-500 hover:bg-surface-50 hover:text-slate-700';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 h-16 border-b ${isAdmin ? 'border-slate-800' : 'border-surface-200'} flex-shrink-0`}>
        {!collapsed && (
          <span className={`font-extrabold text-lg tracking-tight ${logoText}`}>
            Goleet<span className={isAdmin ? 'text-slate-500' : 'text-primary-400'}>.id</span>
          </span>
        )}
        {collapsed && (
          <span className={`font-extrabold text-base ${logoText}`}>G</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, sectionId, icon: Icon }) => (
          <button
            key={sectionId}
            onClick={() => {
              setMobileOpen(false);
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${inactiveCls} ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon className="flex-shrink-0" size={18} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* User & Logout */}
      <div className={`px-3 py-4 border-t ${isAdmin ? 'border-slate-800' : 'border-surface-200'} flex-shrink-0`}>
        {!collapsed && user && (
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 ${isAdmin ? 'bg-white/5' : 'bg-surface-50'}`}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold truncate ${isAdmin ? 'text-white' : 'text-slate-800'}`}>{user.name}</p>
              <p className={`text-xs truncate ${isAdmin ? 'text-slate-400' : 'text-slate-400'}`}>{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isAdmin ? 'text-slate-400 hover:bg-white/5 hover:text-red-400' : 'text-slate-500 hover:bg-red-50 hover:text-red-600'
          } ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={16} />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 border-r transition-all duration-300 ${sidebarBg} ${collapsed ? 'w-16' : 'w-60'}`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r lg:hidden transition-transform duration-300 ${sidebarBg} ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className={`flex-shrink-0 h-16 flex items-center justify-between px-4 sm:px-6 border-b ${isAdmin ? 'bg-slate-900 border-slate-800' : 'bg-white border-surface-200'} shadow-sm`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${isAdmin ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-surface-100'}`}
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`hidden lg:flex p-2 rounded-lg ${isAdmin ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-surface-100'} transition-all`}
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className={`relative p-2 rounded-lg ${isAdmin ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-surface-100'} transition-all`}>
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {user && (
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-200"
                />
                <span className={`hidden sm:block text-sm font-semibold ${isAdmin ? 'text-white' : 'text-slate-700'}`}>
                  {user.name.split(' ')[0]}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
