import { useState } from 'react';
import {
  Users, Building2, DollarSign, TrendingUp, CheckCircle2, XCircle,
  Clock, AlertCircle, Activity, Shield, Megaphone
} from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminStats, verificationQueue, recentActivity } from '../../data/data';
import { StatusBadge } from '../../components/Badge';
import { useBanner } from '../../hooks/useBanner';

function AdminStatCard({ icon: Icon, label, value, sub, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-primary-600 text-white',
    green: 'bg-green-500 text-white',
    amber: 'bg-amber-500 text-white',
    purple: 'bg-purple-600 text-white',
  };
  return (
    <div className="card p-5 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${colorMap[color]}`}>
          <Icon size={22} />
        </div>
        <TrendingUp size={16} className="text-green-500" />
      </div>
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="text-sm text-slate-600 font-medium mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function RevenueChart() {
  const data = adminStats.monthlyRevenueChart.map((d) => ({
    ...d,
    revenue: d.revenue / 1000000,
  }));

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900">Pendapatan Bulanan (MRR)</h3>
          <p className="text-xs text-slate-500 mt-0.5">SaaS subscription revenue dalam juta rupiah</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
          <TrendingUp size={12} />
          +8.6% MoM
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}jt`} />
          <Tooltip
            formatter={(value) => [`Rp ${(value).toFixed(1)} juta`, 'Revenue']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#2563eb' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function VerificationTable() {
  const [queue, setQueue] = useState(verificationQueue);

  const approve = (id) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const reject = (id) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-surface-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">Antrian Verifikasi</h3>
          <p className="text-xs text-slate-500 mt-0.5">{queue.length} bisnis menunggu review</p>
        </div>
        <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
          <AlertCircle size={12} />
          {queue.length} Pending
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-100">
              {['Nama Bisnis', 'Pemilik', 'Kategori', 'KTP', 'Foto', 'Tanggal', 'Aksi'].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {queue.map((item) => (
              <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-5 py-4">
                  <span className="font-semibold text-slate-800 text-sm">{item.businessName}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600">{item.ownerName}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="badge-neutral text-xs">{item.category}</span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={item.ktpStatus} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={item.photoStatus} />
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs text-slate-400">{item.submittedAt}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approve(item.id)}
                      id={`approve-${item.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition-all"
                    >
                      <CheckCircle2 size={12} />
                      Setujui
                    </button>
                    <button
                      onClick={() => reject(item.id)}
                      id={`reject-${item.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-all"
                    >
                      <XCircle size={12} />
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {queue.length === 0 && (
          <div className="text-center py-16">
            <CheckCircle2 size={40} className="text-green-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Semua sudah diproses!</p>
            <p className="text-sm text-slate-400 mt-1">Tidak ada antrian verifikasi saat ini.</p>
          </div>
        )}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-surface-100">
        {queue.map((item) => (
          <div key={item.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.businessName}</p>
                <p className="text-xs text-slate-500">{item.ownerName} · {item.category}</p>
              </div>
              <span className="text-xs text-slate-400">{item.submittedAt}</span>
            </div>
            <div className="flex gap-2 mb-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">KTP:</span>
                <StatusBadge status={item.ktpStatus} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">Foto:</span>
                <StatusBadge status={item.photoStatus} />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => approve(item.id)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-semibold">
                <CheckCircle2 size={12} /> Setujui
              </button>
              <button onClick={() => reject(item.id)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
                <XCircle size={12} /> Tolak
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BannerVerificationTable() {
  const { bannerRequests, approveBannerRequest, rejectBannerRequest } = useBanner();

  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-surface-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">Verifikasi Banner</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {bannerRequests.length} materi banner menunggu approval admin
          </p>
        </div>
        <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
          <Megaphone size={12} />
          {bannerRequests.length} Pending
        </span>
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-100">
              {['Preview', 'Campaign', 'Advertiser', 'Pembayaran', 'Deskripsi', 'Tanggal', 'Aksi'].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {bannerRequests.map((item) => (
              <tr key={item.id} className="align-top hover:bg-surface-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="relative w-40 h-24 overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.bg} opacity-75`} />
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                  <span className="inline-flex mt-2 badge-neutral text-xs">{item.cta}</span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">{item.advertiserName}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.advertiserEmail}</p>
                  <p className="text-xs text-slate-400">{item.advertiserPhone}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-xs text-slate-500 mb-2">{item.paymentMethod}</p>
                  <StatusBadge status={item.paymentStatus} />
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                    {item.description}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs text-slate-400">{item.submittedAt}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveBannerRequest(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition-all"
                    >
                      <CheckCircle2 size={12} />
                      Setujui
                    </button>
                    <button
                      onClick={() => rejectBannerRequest(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-all"
                    >
                      <XCircle size={12} />
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bannerRequests.length === 0 && (
          <div className="text-center py-16">
            <CheckCircle2 size={40} className="text-green-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Semua banner sudah diproses</p>
            <p className="text-sm text-slate-400 mt-1">
              Tidak ada materi banner yang menunggu verifikasi saat ini.
            </p>
          </div>
        )}
      </div>

      <div className="lg:hidden divide-y divide-surface-100">
        {bannerRequests.length === 0 && (
          <div className="text-center py-12 px-6">
            <CheckCircle2 size={36} className="text-green-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Antrian banner kosong</p>
            <p className="text-sm text-slate-400 mt-1">
              Semua materi banner sudah direview.
            </p>
          </div>
        )}

        {bannerRequests.map((item) => (
          <div key={item.id} className="p-4">
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${item.bg} opacity-75`} />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-bold leading-tight">{item.title}</p>
                <p className="text-xs text-white/80 mt-1">{item.subtitle}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-slate-700">{item.advertiserName}</p>
              <p className="text-xs text-slate-500">{item.advertiserEmail}</p>
              <p className="text-xs text-slate-500">{item.paymentMethod}</p>
              <StatusBadge status={item.paymentStatus} />
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => approveBannerRequest(item.id)}
                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-semibold"
              >
                <CheckCircle2 size={12} /> Setujui
              </button>
              <button
                onClick={() => rejectBannerRequest(item.id)}
                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-semibold"
              >
                <XCircle size={12} /> Tolak
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900">Aktivitas Terkini</h3>
        <Activity size={16} className="text-slate-400" />
      </div>
      <div className="space-y-4">
        {recentActivity.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-surface-100 flex items-center justify-center flex-shrink-0 text-base">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 leading-snug">{item.message}</p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <Clock size={10} /> {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout variant="admin">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={18} className="text-primary-600" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">Super Admin</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1 text-sm">Platform Goleet.id — Ringkasan Keseluruhan</p>
          </div>
          <div className="bg-primary-50 border border-primary-200 text-primary-700 px-3 py-2 rounded-xl flex-shrink-0 text-xs font-bold">
            Platform v2.6
          </div>
        </div>

        {/* Stats */}
        <div id="admin-overview" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AdminStatCard
            icon={Users}
            label="Total Pengguna"
            value={adminStats.totalUsers.toLocaleString('id-ID')}
            sub={`+${adminStats.newUsersThisMonth} bulan ini`}
            color="blue"
          />
          <AdminStatCard
            icon={Building2}
            label="Bisnis Diklaim"
            value={adminStats.claimedBusinesses.toLocaleString('id-ID')}
            sub={`dari ${adminStats.totalMerchants.toLocaleString('id-ID')} total`}
            color="green"
          />
          <AdminStatCard
            icon={DollarSign}
            label="Pendapatan Bulanan"
            value={`Rp ${(adminStats.monthlyRevenue / 1000000).toFixed(1)}jt`}
            sub={`${adminStats.activeSubscriptions} subscriber aktif`}
            color="amber"
          />
          <AdminStatCard
            icon={AlertCircle}
            label="Menunggu Verifikasi"
            value={adminStats.pendingVerification}
            sub="bisnis pending review"
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div id="admin-analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        {/* Verification Queue */}
        <div id="admin-verify">
          <VerificationTable />
        </div>

        <div id="admin-banner-verify" className="mt-8">
          <BannerVerificationTable />
        </div>

        {/* Settings placeholder */}
        <div id="admin-settings" className="mt-8 card p-6">
          <h3 className="font-bold text-slate-900 mb-2">Pengaturan Platform</h3>
          <p className="text-sm text-slate-500">Konfigurasi platform Goleet.id — segera hadir.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
