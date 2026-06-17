import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  MessageCircle,
  Star,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Crown,
  ExternalLink,
  Reply,
  Plus,
  ChevronRight,
  BarChart2,
  Edit3,
  Share2,
  X,
  Save,
  Image as ImageIcon,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  Store,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { reviews, merchants } from "../../data/data";
import StarRating from "../../components/StarRating";

const sentimentData = [
  { name: "Positif", value: 80, color: "#22c55e" },
  { name: "Netral", value: 15, color: "#94a3b8" },
  { name: "Negatif", value: 5, color: "#ef4444" },
];

/* ==========================================
   COMPONENT: EditProfileModal
   ========================================== */
function EditProfileModal({ isOpen, onClose, merchant, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    openHours: "",
    priceStart: "",
    image: "", // Menampung URL gambar bisnis/sampul
  });

  // State tambahan untuk pratinjau gambar baru yang dipilih
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (merchant && isOpen) {
      setFormData({
        name: merchant.name || "",
        description: merchant.description || "",
        address: merchant.address || "",
        phone: merchant.phone || "",
        openHours: merchant.openHours || "",
        priceStart: merchant.priceStart || "",
        image: merchant.image || "",
      });
      setImagePreview(merchant.image || "");
      setSelectedFile(null);
    }
  }, [merchant, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Membuat URL lokal sementara untuk pratinjau gambar (preview)
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gabungkan data form dengan gambar baru (jika ada perubahan) atau gambar lama
    onSave({
      ...formData,
      image: imagePreview, 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Edit Profil Bisnis</h2>
            <p className="text-sm text-slate-500 mt-1">
              Perbarui informasi toko Anda agar pelanggan tetap update.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-surface-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body / Form */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Cover Image Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Foto Sampul Bisnis
              </label>
              
              {/* Input File Tersembunyi */}
              <input
                type="file"
                id="cover-image-input"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              
              {/* Trigger Area Klik */}
              <label
                htmlFor="cover-image-input"
                className="relative h-36 border-2 border-dashed border-surface-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:bg-surface-50 hover:border-primary-300 transition-colors cursor-pointer overflow-hidden"
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview Sampul"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1 backdrop-blur-xs">
                      <ImageIcon size={20} />
                      <span>Ubah Foto Sampul</span>
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon size={28} className="mb-2 text-slate-400" />
                    <span className="text-sm font-medium">
                      Klik untuk mengubah foto sampul
                    </span>
                  </>
                )}
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nama Bisnis */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Bisnis
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    placeholder="Nama bisnis Anda"
                  />
                </div>
              </div>

              {/* Jam Operasional */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Jam Operasional
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="openHours"
                    value={formData.openHours}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                    placeholder="Contoh: 09:00 - 22:00"
                  />
                </div>
              </div>

              {/* Harga Mulai */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Harga Mulai Dari
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="number"
                    name="priceStart"
                    value={formData.priceStart}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                    placeholder="Contoh: 15000"
                  />
                </div>
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor WhatsApp
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                    placeholder="628..."
                  />
                </div>
              </div>

              {/* Alamat Lengkap */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Alamat Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <MapPin size={16} className="text-slate-400" />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none"
                    placeholder="Alamat bisnis Anda..."
                  ></textarea>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deskripsi Bisnis
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none"
                  placeholder="Ceritakan tentang bisnis Anda..."
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-surface-100 flex items-center justify-end gap-3 bg-surface-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-surface-200 rounded-xl hover:bg-surface-100 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Save size={16} />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
} 

/* ==========================================
   COMPONENT: StatCard
   ========================================== */
function StatCard({ icon: Icon, label, value, trend, trendValue, color = "primary" }) {
  const colorMap = {
    primary: "bg-primary-50 text-primary-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };
  const isPositive = trend === "up";
  return (
    <div className="p-5 card card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={22} />
        </div>
        {trendValue && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            }`}
          >
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

/* ==========================================
   COMPONENT: AIInsightBox
   ========================================== */
function AIInsightBox() {
  return (
    <div className="relative p-6 overflow-hidden rounded-3xl bg-ai-gradient shadow-glow-blue">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-300 ai-sparkle" />
          <span className="text-sm font-bold text-white">AI Business Insight</span>
          <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
            Live
          </span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-white/90">
          Bisnis Anda tampil luar biasa bulan ini! 80% ulasan bernada positif — tertinggi
          di kategori Teknologi.{" "}
          <strong className="text-white"> Rekomendasi:</strong> Tambahkan foto terbaru
          dan perluas jam operasional di hari Minggu untuk meningkatkan konversi hingga ~15%.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Skor Sentimen", value: "80%", icon: "😊" },
            { label: "Response Rate", value: "94%", icon: "⚡" },
            { label: "Rank Kategori", value: "#1", icon: "🏆" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="p-3 text-center bg-white/10 rounded-2xl">
              <div className="mb-1 text-lg">{icon}</div>
              <div className="text-base font-black text-white">{value}</div>
              <div className="text-white/60 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   COMPONENT: SentimentChart
   ========================================== */
function SentimentChart() {
  return (
    <div className="p-6 card">
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
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ fontSize: "12px", color: "#64748b" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Progress bars */}
      <div className="mt-4 space-y-3">
        {sentimentData.map(({ name, value, color }) => (
          <div key={name} className="flex items-center gap-3">
            <span className="flex-shrink-0 text-xs text-slate-500 w-14">{name}</span>
            <div className="flex-1 h-2 overflow-hidden rounded-full bg-surface-100">
              <div
                className="h-full transition-all duration-700 rounded-full"
                style={{ width: `${value}%`, backgroundColor: color }}
              />
            </div>
            <span className="w-10 text-xs font-bold text-right text-slate-700">
              {value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   COMPONENT: RecentReviewsCard
   ========================================== */
function RecentReviewsCard({ merchantReviews }) {
  const [replied, setReplied] = useState([]);
  return (
    <div className="p-6 card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900">Ulasan Terbaru</h3>
        <button className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:underline">
          Lihat Semua <ChevronRight size={12} />
        </button>
      </div>
      <div className="space-y-4">
        {merchantReviews.slice(0, 4).map((review) => (
          <div
            key={review.id}
            className="flex gap-3 pb-4 border-b border-surface-100 last:border-0 last:pb-0"
          >
            <img
              src={review.avatar}
              alt={review.author}
              className="flex-shrink-0 object-cover rounded-full w-9 h-9"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  {review.author}
                </span>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="mt-1 text-xs text-slate-500 line-clamp-2">{review.text}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-400">{review.date}</span>
                {replied.includes(review.id) ? (
                  <span className="text-xs font-medium text-green-600">
                    ✓ Sudah dibalas
                  </span>
                ) : (
                  <button
                    onClick={() => setReplied([...replied, review.id])}
                    className="flex items-center gap-1 text-xs font-medium transition-colors text-primary-600 hover:text-primary-800"
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

/* ==========================================
   COMPONENT: QuickActions
   ========================================== */
function QuickActions({ onEditProfile }) {
  const actions = [
    {
      label: "Edit Profil",
      icon: Edit3,
      color: "text-primary-600 bg-primary-50 hover:bg-primary-100",
      onClick: onEditProfile,
    },
    {
      label: "Bagikan Link",
      icon: Share2,
      color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
      onClick: () => console.log("Bagikan Link diklik"),
    },
    {
      label: "Lihat di Goleet",
      icon: ExternalLink,
      color: "text-green-600 bg-green-50 hover:bg-green-100",
      onClick: () => console.log("Lihat Goleet diklik"),
    },
    {
      label: "Upgrade Plan",
      icon: Crown,
      color: "text-amber-600 bg-amber-50 hover:bg-amber-100",
      onClick: () => console.log("Upgrade Plan diklik"),
    },
  ];
  return (
    <div className="p-6 card">
      <h3 className="mb-4 font-bold text-slate-900">Aksi Cepat</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, icon: Icon, color, onClick }) => (
          <button
            key={label}
            onClick={onClick}
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

/* ==========================================
   MAIN DASHBOARD COMPONENT
   ========================================== */
export default function MerchantDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Local state initialized with dummy data so the saved info can change dynamically
  const [currentMerchant, setCurrentMerchant] = useState(merchants[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const merchantReviews = reviews.filter((r) => r.merchantId === "1");

  const handleSaveProfile = (updatedData) => {
    setCurrentMerchant((prev) => ({
      ...prev,
      ...updatedData,
    }));
    console.log("Data Berhasil Disimpan:", updatedData);
  };

  return (
    <DashboardLayout variant="merchant">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Selamat datang kembali, {user?.name?.split(" ")[0] || "Agus"}! 👋
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Inilah ringkasan performa bisnis Anda hari ini.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center flex-shrink-0 gap-2 px-3 py-2 border bg-amber-50 border-amber-200 text-amber-700 rounded-xl">
              <Crown size={15} className="text-amber-500" />
              <span className="text-xs font-bold">SaaS Premium</span>
            </div>
            <button
              onClick={() => navigate("/banner-ads")}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl flex-shrink-0 transition-all shadow-sm shadow-primary-200 font-semibold text-sm"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Buat Iklan Banner</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div id="merchant-overview" className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
          <StatCard
            icon={Eye}
            label="Lihat Profil (30 hari)"
            value="2.847"
            trend="up"
            trendValue="+12%"
            color="primary"
          />
          <StatCard
            icon={MessageCircle}
            label="Klik WhatsApp"
            value="184"
            trend="up"
            trendValue="+8%"
            color="green"
          />
          <StatCard
            icon={Star}
            label="Total Ulasan"
            value={currentMerchant.reviewCount || 0}
            trend="up"
            trendValue="+6 baru"
            color="amber"
          />
          <StatCard
            icon={TrendingUp}
            label="Skor Kepuasan"
            value="4.8/5"
            trend="up"
            trendValue="+0.2"
            color="purple"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left col - AI + recent reviews */}
          <div id="merchant-reviews" className="space-y-6 lg:col-span-2">
            <AIInsightBox />
            <RecentReviewsCard merchantReviews={merchantReviews} />
          </div>

          {/* Right col - chart + quick actions */}
          <div id="merchant-analytics" className="space-y-6">
            <SentimentChart />
            <QuickActions onEditProfile={() => setIsModalOpen(true)} />

            {/* Merchant info card */}
            <div className="p-5 card">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={currentMerchant.image}
                  alt={currentMerchant.name}
                  className="object-cover w-12 h-12 rounded-2xl"
                />
                <div>
                  <p className="text-sm font-bold Sec text-slate-900">
                    {currentMerchant.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {currentMerchant.categoryLabel || "Kategori Bisnis"}
                  </p>
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
                {currentMerchant.openHours && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jam Buka</span>
                    <span className="font-semibold text-slate-700">
                      {currentMerchant.openHours}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Masa aktif</span>
                  <span className="font-semibold text-slate-700">28 Mei 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings placeholder */}
        <div id="merchant-settings" className="p-6 mt-8 card">
          <h3 className="mb-2 font-bold text-slate-900">Pengaturan Akun</h3>
          <p className="text-sm text-slate-500">
            Kelola informasi bisnis dan preferensi akun Anda — segera hadir.
          </p>
        </div>
      </div>

      {/* Edit Profile Modal Injection */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        merchant={currentMerchant}
        onSave={handleSaveProfile}
      />
    </DashboardLayout>
  );
}