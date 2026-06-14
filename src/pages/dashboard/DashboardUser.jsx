import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Megaphone,
  Eye,
  MousePointer,
  TrendingUp,
  TrendingDown,
  X,
  Save,
  Plus,
  CheckCircle2,
  AlertCircle,
  PlaySquare,
  UploadCloud,
  CreditCard,
  Check,
  Image as ImageIcon,
  QrCode, // Tambahkan QrCode untuk popup pembayaran
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA ---
const initialUserData = {
  name: "Budi Santoso",
  email: "budi.santoso@example.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta Selatan, Indonesia",
  bio: "Pengusaha kuliner lokal yang sedang merintis.",
};

const initialAds = [
  {
    id: 1,
    title: "Promo Diskon Kopi 50%",
    status: "active",
    views: 1250,
    clicks: 320,
    budget: "Rp 500.000",
    spent: "Rp 150.000",
    imageUrl:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=300&h=150&fit=crop",
  },
  {
    id: 2,
    title: "Grand Opening Cabang Baru",
    status: "paused",
    views: 840,
    clicks: 110,
    budget: "Rp 1.000.000",
    spent: "Rp 1.000.000",
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=150&fit=crop",
  },
];

// --- SUB-COMPONENTS ---

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendValue,
  color = "primary",
}) {
  const colorMap = {
    primary: "bg-primary-50 text-primary-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };
  const isPositive = trend === "up";
  return (
    <div className="p-5 bg-white border shadow-sm card card-hover rounded-3xl border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}
        >
          <Icon size={22} />
        </div>
        {trendValue && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
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

// --- MODALS ---

function EditProfileModal({ isOpen, onClose, userData, onSave }) {
  const [formData, setFormData] = useState(userData);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden duration-200 bg-white shadow-xl rounded-3xl animate-in fade-in zoom-in">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Edit Profil</h3>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-4 text-sm">
          <div>
            <label className="block text-slate-700 font-medium mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentPlanModal({ isOpen, onClose, onProceed }) {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [step, setStep] = useState("select"); // 'select' | 'payment'

  // Reset step ketika modal dibuka kembali
  useEffect(() => {
    if (isOpen) setStep("select");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden duration-200 bg-white shadow-xl rounded-3xl animate-in fade-in zoom-in">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {step === "select" ? "Pilih Paket Iklan" : "Pembayaran QRIS"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {step === "select"
                ? "Selesaikan pembayaran sebelum membuat banner iklan baru."
                : "Silakan scan QR code di bawah ini untuk menyelesaikan pembayaran."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {step === "select" ? (
          <>
            <div className="p-5 space-y-4">
              {/* Paket 1 */}
              <div
                onClick={() => setSelectedPlan("basic")}
                className={`cursor-pointer border-2 rounded-2xl p-4 transition-all flex items-center gap-4 ${selectedPlan === "basic" ? "border-primary-500 bg-primary-50/50" : "border-slate-100 hover:border-slate-200"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedPlan === "basic" ? "border-primary-500 bg-primary-500" : "border-slate-300"}`}
                >
                  {selectedPlan === "basic" && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">
                    Paket Basic Banner
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Estimasi 5.000 tayangan / bulan
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-primary-600">
                    Rp 150rb
                  </p>
                </div>
              </div>

              {/* Paket 2 */}
              <div
                onClick={() => setSelectedPlan("pro")}
                className={`cursor-pointer border-2 rounded-2xl p-4 transition-all flex items-center gap-4 ${selectedPlan === "pro" ? "border-primary-500 bg-primary-50/50" : "border-slate-100 hover:border-slate-200"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedPlan === "pro" ? "border-primary-500 bg-primary-500" : "border-slate-300"}`}
                >
                  {selectedPlan === "pro" && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800">
                      Paket Pro Banner
                    </h4>
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      Terpopuler
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Estimasi 20.000 tayangan / bulan + Penempatan prioritas
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-primary-600">
                    Rp 500rb
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setStep("payment")}
                className="px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 flex items-center gap-2 transition-colors shadow-sm shadow-primary-200"
              >
                <CreditCard size={18} /> Lanjut Bayar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center p-8">
              <div className="relative flex items-center justify-center w-48 h-48 mb-4 overflow-hidden bg-white border-2 shadow-sm border-slate-200 rounded-2xl">
                {/* Dummy QR Code (Bisa diganti dengan tag <img src="qr.png" /> nantinya) */}
                <QrCode size={120} className="text-slate-800" strokeWidth={1} />

                {/* Garis scanning animasi sederhana */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary-500/50 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] animate-[scan_2s_ease-in-out_infinite]" />
              </div>

              <div className="text-center">
                <p className="mb-1 text-sm text-slate-500">Total Pembayaran</p>
                <p className="mb-4 text-2xl font-black text-primary-600">
                  {selectedPlan === "pro" ? "Rp 500.000" : "Rp 150.000"}
                </p>
                <p className="px-3 py-2 text-xs border rounded-lg text-slate-400 bg-slate-50 border-slate-100">
                  Mendukung pembayaran via BCA, Mandiri, Gopay, OVO, Dana.
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-3 p-5 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setStep("select")}
                className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  onProceed(selectedPlan);
                  onClose();
                }}
                className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 flex items-center gap-2 transition-colors shadow-sm shadow-green-200"
              >
                <CheckCircle2 size={18} /> Saya Sudah Bayar
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tambahkan style untuk animasi scanning pada QR code */}
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(192px); }
        }
      `}</style>
    </div>
  );
}

function EditBannerAdModal({ isOpen, onClose, adData, onSave }) {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // FIX: Sinkronkan state lokal dengan prop `adData` setiap kali modal dibuka/adData berubah
  useEffect(() => {
    if (isOpen && adData) {
      setFormData(adData);
      setImagePreview(adData.imageUrl || null);
    }
  }, [isOpen, adData]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData({ ...formData, imageUrl: previewUrl });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto transition-all bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md my-8 overflow-hidden duration-200 bg-white shadow-xl rounded-3xl animate-in fade-in zoom-in">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            {adData?.id ? "Edit Banner Iklan" : "Desain Banner Iklan"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5 text-sm">
          {/* Upload Banner Section */}
          <div>
            <label className="block text-slate-700 font-medium mb-1.5 flex items-center gap-2">
              <ImageIcon size={16} className="text-primary-600" />
              Gambar Banner <span className="text-red-500">*</span>
            </label>
            <div className="relative flex flex-col items-center justify-center w-full overflow-hidden transition-colors border-2 border-dashed h-36 rounded-2xl border-slate-300 bg-slate-50 hover:bg-slate-100 group">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Banner Preview"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
                    <span className="flex items-center gap-2 font-medium text-white">
                      <UploadCloud size={18} /> Ganti Gambar
                    </span>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center">
                  <UploadCloud
                    size={28}
                    className="mx-auto mb-2 text-slate-400"
                  />
                  <p className="font-medium text-slate-600">
                    Klik untuk upload banner
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Rekomendasi ukuran: 1200x628px (JPG/PNG)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1.5">
              Judul Kampanye
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Contoh: Diskon Kemerdekaan"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1.5">
              Status Iklan
            </label>
            <select
              value={formData.status || "active"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            >
              <option value="active">Aktif (Tayang)</option>
              <option value="paused">Dijeda</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 flex items-center gap-2 transition-colors shadow-sm shadow-primary-200"
            disabled={!imagePreview || !formData.title}
          >
            <Save size={18} /> Simpan Banner
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN DASHBOARD ---

export default function UserDashboard() {
  const { user } = useAuth();

  // States
  const [userData, setUserData] = useState(initialUserData);
  const [adsData, setAdsData] = useState(initialAds);

  const navigate = useNavigate();

  // Modal States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [pendingBudget, setPendingBudget] = useState("");

  // Handlers
  const handleSaveProfile = (newData) => setUserData(newData);

  const handleInitiateNewAd = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (selectedPlan) => {
    const budget = selectedPlan === "pro" ? "Rp 500.000" : "Rp 150.000";
    setPendingBudget(budget);
    setEditingAd({ title: "", status: "active", imageUrl: "" });
  };

  const handleSaveAd = (savedAd) => {
    if (savedAd.id) {
      // Update iklan yang sudah ada
      setAdsData(adsData.map((ad) => (ad.id === savedAd.id ? savedAd : ad)));
    } else {
      // Buat iklan baru
      setAdsData([
        ...adsData,
        {
          ...savedAd,
          id: Date.now(),
          views: 0,
          clicks: 0,
          budget: pendingBudget,
          spent: "Rp 0",
        },
      ]);
    }
  };

  return (
    <DashboardLayout variant="user">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Halo, {userData.name.split(" ")[0]}! 👋
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Kelola profil dan pantau performa iklan banner Anda hari ini.
            </p>
          </div>
          <button
            onClick={() => navigate("/banner-ads")}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl flex-shrink-0 transition-all shadow-sm shadow-primary-200 font-semibold text-sm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Buat Iklan Banner</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
          <StatCard
            icon={Megaphone}
            label="Banner Aktif"
            value={adsData.filter((a) => a.status === "active").length}
            color="primary"
          />
          <StatCard
            icon={Eye}
            label="Total Tayangan"
            value="2.090"
            trend="up"
            trendValue="+15%"
            color="green"
          />
          <StatCard
            icon={MousePointer}
            label="Total Klik"
            value="430"
            trend="up"
            trendValue="+5%"
            color="amber"
          />
          <StatCard
            icon={PlaySquare}
            label="Click-Through Rate"
            value="20.5%"
            trend="up"
            trendValue="+1.2%"
            color="purple"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left col - User Profile Card */}
          <div className="space-y-6 lg:col-span-1">
            <div className="relative p-6 overflow-hidden bg-white border shadow-sm card rounded-3xl border-slate-100">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-500 to-indigo-500" />

              <div className="relative flex flex-col items-center mt-8">
                <div className="w-24 h-24 bg-white rounded-full p-1.5 shadow-md">
                  <div className="flex items-center justify-center w-full h-full overflow-hidden rounded-full bg-slate-100 text-slate-400">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User size={40} />
                    )}
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {userData.name}
                </h2>
                <span className="px-3 py-1 mt-2 text-xs font-semibold rounded-full bg-primary-50 text-primary-700">
                  User Terverifikasi
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 pb-3 text-sm border-b text-slate-600 border-slate-50">
                  <Mail size={16} className="text-slate-400" />
                  <span className="truncate">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 pb-3 text-sm border-b text-slate-600 border-slate-50">
                  <Phone size={16} className="text-slate-400" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-3 pb-3 text-sm border-b text-slate-600 border-slate-50">
                  <MapPin size={16} className="text-slate-400" />
                  <span>{userData.location}</span>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <Edit3 size={16} /> Edit Profil
              </button>
            </div>
          </div>

          {/* Right col - Ads Management */}
          <div className="space-y-6 lg:col-span-2">
            <div className="p-6 bg-white border shadow-sm card rounded-3xl border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Manajemen Banner Iklan
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pantau dan edit banner yang sedang berjalan
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {adsData.map((ad) => (
                  <div
                    key={ad.id}
                    className="p-4 transition-all border group border-slate-100 rounded-2xl hover:border-primary-200 hover:shadow-md hover:shadow-primary-100/50 bg-slate-50/50"
                  >
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      {/* Thumbnail Image */}
                      <div className="flex-shrink-0 w-24 h-16 overflow-hidden border rounded-lg bg-slate-200 border-slate-200">
                        {ad.imageUrl ? (
                          <img
                            src={ad.imageUrl}
                            alt={ad.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <ImageIcon className="text-slate-400" size={20} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-bold truncate text-slate-800">
                            {ad.title}
                          </h4>
                          {ad.status === "active" ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
                              <CheckCircle2 size={10} /> Aktif
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                              <AlertCircle size={10} /> Dijeda
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center mt-2 text-xs gap-x-4 gap-y-2 text-slate-500">
                          <span className="flex items-center gap-1">
                            <Eye size={14} className="text-slate-400" />{" "}
                            {ad.views} Views
                          </span>
                          <span className="flex items-center gap-1">
                            <MousePointer
                              size={14}
                              className="text-slate-400"
                            />{" "}
                            {ad.clicks} Clicks
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium text-slate-400">
                              Dana:
                            </span>{" "}
                            {ad.spent} / {ad.budget}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center w-full gap-2 mt-2 sm:ml-auto sm:w-auto sm:mt-0">
                        <button
                          onClick={() => setEditingAd(ad)}
                          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold transition-all bg-white border sm:w-auto border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {adsData.length === 0 && (
                  <div className="py-10 text-center border-2 border-dashed bg-slate-50 rounded-2xl border-slate-200">
                    <ImageIcon className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-medium text-slate-500">
                      Belum ada banner iklan yang dibuat.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render Modals */}
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      <PaymentPlanModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onProceed={handlePaymentSuccess}
      />

      <EditBannerAdModal
        isOpen={!!editingAd}
        onClose={() => setEditingAd(null)}
        adData={editingAd}
        onSave={handleSaveAd}
      />
    </DashboardLayout>
  );
}
