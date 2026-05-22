import { useState } from 'react';
import {
  Eye, MessageCircle, Star, TrendingUp, TrendingDown, Sparkles,
  Crown, ExternalLink, Reply, ChevronRight, BarChart2, Edit3, Share2
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { reviews, merchants } from '../../data/data';
import StarRating from '../../components/StarRating';

const sentimentData = [
  { name: 'Positif', value: 80, color: '#22c55e' },
  { name: 'Netral', value: 15, color: '#94a3b8' },
  { name: 'Negatif', value: 5, color: '#ef4444' },
];

function StatCard({ icon: Icon, label, value, trend, trendValue, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  const isPositive = trend === 'up';
  return (
    <div className="card p-5 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={22} />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

function AIInsightBox() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-ai-gradient p-6 shadow-glow-blue">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-300 ai-sparkle" />
          <span className="text-white font-bold text-sm">AI Business Insight</span>
          <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Live</span>
        </div>
        <p className="text-white/90 text-sm leading-relaxed mb-4">
          Bisnis Anda tampil luar biasa bulan ini! 80% ulasan bernada positif — tertinggi di kategori Teknologi. 
          <strong className="text-white"> Rekomendasi:</strong> Tambahkan foto terbaru dan perluas jam operasional di hari Minggu untuk meningkatkan konversi hingga ~15%.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Skor Sentimen', value: '80%', icon: '😊' },
            { label: 'Response Rate', value: '94%', icon: '⚡' },
            { label: 'Rank Kategori', value: '#1', icon: '🏆' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white/10 rounded-2xl p-3 text-center">
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-white font-black text-base">{value}</div>
              <div className="text-white/60 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SentimentChart() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900">Analisis Sentimen</h3>
          <p className="text-xs text-slate-500 mt-0.5">Berdasarkan 134 ulasan terkini</p>
        </div>
        <BarChart2 size={18} className="text-slate-400" />
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={4}
            dataKey="value"
          >
            {sentimentData.map((entry, index) => (
              <Cell key={index} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
          />
          <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: '12px', color: '#64748b' }}>{value}</span>} />
        </PieChart>
      </ResponsiveContainer>

      {/* Progress bars */}
      <div className="mt-4 space-y-3">
        {sentimentData.map(({ name, value, color }) => (
          <div key={name} className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-14 flex-shrink-0">{name}</span>
            <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${value}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700 w-10 text-right">{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentReviewsCard({ merchantReviews }) {
  const [replied, setReplied] = useState([]);
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900">Ulasan Terbaru</h3>
        <button className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1">
          Lihat Semua <ChevronRight size={12} />
        </button>
      </div>
      <div className="space-y-4">
        {merchantReviews.slice(0, 4).map((review) => (
          <div key={review.id} className="flex gap-3 pb-4 border-b border-surface-100 last:border-0 last:pb-0">
            <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 text-sm">{review.author}</span>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{review.text}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-400">{review.date}</span>
                {replied.includes(review.id) ? (
                  <span className="text-xs text-green-600 font-medium">✓ Sudah dibalas</span>
                ) : (
                  <button
                    onClick={() => setReplied([...replied, review.id])}
                    className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 font-medium transition-colors"
                  >
                    <Reply size={12} /> Balas
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: 'Edit Profil', icon: Edit3, color: 'text-primary-600 bg-primary-50 hover:bg-primary-100' },
    { label: 'Bagikan Link', icon: Share2, color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' },
    { label: 'Lihat di Goleet', icon: ExternalLink, color: 'text-green-600 bg-green-50 hover:bg-green-100' },
    { label: 'Upgrade Plan', icon: Crown, color: 'text-amber-600 bg-amber-50 hover:bg-amber-100' },
  ];
  return (
    <div className="card p-6">
      <h3 className="font-bold text-slate-900 mb-4">Aksi Cepat</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${color}`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MerchantDashboard() {
  const { user } = useAuth();
  const merchant = merchants[0];
  const merchantReviews = reviews.filter((r) => r.merchantId === '1');

  return (
    <DashboardLayout variant="merchant">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Selamat datang kembali, {user?.name?.split(' ')[0] || 'Agus'}! 👋
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Inilah ringkasan performa bisnis Anda hari ini.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-xl flex-shrink-0">
            <Crown size={15} className="text-amber-500" />
            <span className="text-xs font-bold">SaaS Premium</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Eye} label="Lihat Profil (30 hari)" value="2.847" trend="up" trendValue="+12%" color="primary" />
          <StatCard icon={MessageCircle} label="Klik WhatsApp" value="184" trend="up" trendValue="+8%" color="green" />
          <StatCard icon={Star} label="Total Ulasan" value={merchant.reviewCount} trend="up" trendValue="+6 baru" color="amber" />
          <StatCard icon={TrendingUp} label="Skor Kepuasan" value="4.8/5" trend="up" trendValue="+0.2" color="purple" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left col - AI + recent reviews */}
          <div className="lg:col-span-2 space-y-6">
            <AIInsightBox />
            <RecentReviewsCard merchantReviews={merchantReviews} />
          </div>

          {/* Right col - chart + quick actions */}
          <div className="space-y-6">
            <SentimentChart />
            <QuickActions />

            {/* Merchant info card */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={merchant.image}
                  alt={merchant.name}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{merchant.name}</p>
                  <p className="text-xs text-slate-500">{merchant.categoryLabel}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="font-semibold text-green-600">Aktif ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Paket</span>
                  <span className="font-semibold text-amber-600">Premium ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Terverifikasi</span>
                  <span className="font-semibold text-primary-600">Ya ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Masa aktif</span>
                  <span className="font-semibold">28 Mei 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
