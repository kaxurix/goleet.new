import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Tag,
  MessageCircle,
  Star,
  Sparkles,
  ChevronLeft,
  Share2,
  Heart,
} from "lucide-react";
import StarRating from "../components/StarRating";
import { VerifiedBadge, PremiumBadge } from "../components/Badge";
import { useAuth } from "../context/AuthContext";
import { merchants, reviews } from "../data/data";

function AIReviewWidget({ summary }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-ai-gradient p-6 sm:p-8 my-8 shadow-glow-blue animate-pulse-glow">
      {/* Background decorative orbs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-300 ai-sparkle" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">
              AI Review Summarizer
            </h3>
            <p className="text-white/60 text-xs">
              Dianalisis dari {Math.floor(Math.random() * 50 + 80)} ulasan
              pelanggan
            </p>
          </div>
          <span className="ml-auto bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Beta
          </span>
        </div>

        {!visible ? (
          <div className="space-y-3">
            <div className="h-4 shimmer rounded-full w-full" />
            <div className="h-4 shimmer rounded-full w-5/6" />
            <div className="h-4 shimmer rounded-full w-4/6" />
          </div>
        ) : (
          <p className="text-white/90 leading-relaxed text-sm sm:text-base animate-fade-in">
            {summary}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            {
              label: "😊 Positif",
              pct: "82%",
              color: "bg-green-500/30 text-green-200",
            },
            {
              label: "😐 Netral",
              pct: "13%",
              color: "bg-white/20 text-white/70",
            },
            {
              label: "😞 Negatif",
              pct: "5%",
              color: "bg-red-400/30 text-red-200",
            },
          ].map(({ label, pct, color }) => (
            <span
              key={label}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl ${color}`}
            >
              {label} — {pct}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="card p-5 card-hover">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={review.avatar}
          alt={review.author}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-surface-100"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-slate-800 text-sm">
              {review.author}
            </span>
            <span className="text-xs text-slate-400 flex-shrink-0">
              {review.date}
            </span>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
      <div className="mt-3 flex items-center gap-2">
        <button className="text-xs text-slate-400 hover:text-primary-600 transition-colors">
          👍 Helpful ({review.helpful})
        </button>
      </div>
    </div>
  );
}

export default function MerchantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [activeTab, setActiveTab] = useState("info");
  const [liked, setLiked] = useState(false);

  // Review Form State
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [allReviews, setAllReviews] = useState(reviews);

  const merchant = merchants.find((m) => m.id === id) || merchants[0];
  const merchantReviews = allReviews.filter((r) => r.merchantId === merchant.id);

  const tabs = [
    { id: "info", label: "Informasi" },
    { id: "reviews", label: `Ulasan (${merchantReviews.length})` },
    { id: "photos", label: "Foto" },
  ];

  const waMessage = encodeURIComponent(
    `Halo ${merchant.name}! Saya menemukan bisnis Anda di Goleet.id dan ingin bertanya lebih lanjut.`,
  );

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      navigate("/auth");
      return;
    }

    if (newReviewRating === 0) {
      alert("Silakan pilih rating terlebih dahulu!");
      return;
    }
    if (!newReviewText.trim()) {
      alert("Silakan tulis ulasan Anda!");
      return;
    }

    const reviewDate = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    const newReview = {
      id: `review-${Date.now()}`,
      merchantId: merchant.id,
      author: user.name,
      avatar: user.avatar || "https://i.pravatar.cc/40?img=12",
      rating: newReviewRating,
      date: reviewDate,
      text: newReviewText.trim(),
      helpful: 0,
    };

    setAllReviews((prev) => [newReview, ...prev]);
    setNewReviewText("");
    setNewReviewRating(0);
  };

  return (
    <div className="min-h-screen bg-surface-50 pt-16">
      {/* Cover Image */}
      <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden bg-surface-200">
        <img
          src={merchant.coverImage}
          alt={merchant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <Link
          to="/search"
          className="absolute top-6 left-4 sm:left-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-black/60 transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Link>

        {/* Actions top-right */}
        <div className="absolute top-6 right-4 sm:right-6 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all"
          >
            <Heart
              className={`w-5 h-5 ${liked ? "text-red-400 fill-red-400" : "text-white"}`}
            />
          </button>
          <button className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Merchant info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-2">
              {merchant.verified && <VerifiedBadge />}
              {merchant.premium && <PremiumBadge />}
              <span className="badge-neutral">{merchant.categoryLabel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {merchant.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 sm:pb-8">
        {/* Quick Info Card */}
        <div className="card p-5 sm:p-6 -mt-4 relative z-10 mb-6">
          <div className="flex flex-wrap gap-4 items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <StarRating
                  rating={merchant.rating}
                  size="md"
                  showCount
                  count={merchant.reviewCount}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-primary-500" />
                {merchant.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4 text-green-500" />
                {merchant.openHours}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Mulai dari</p>
              <p className="text-xl font-black text-primary-700">
                Rp {merchant.priceStart.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-surface-100">
            {merchant.tags.map((tag) => (
              <span key={tag} className="badge-neutral text-xs">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-100 p-1 rounded-2xl mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div className="animate-fade-in">
            <div className="card p-6 mb-6">
              <h2 className="font-bold text-slate-900 mb-3">Tentang Bisnis</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {merchant.description}
              </p>
            </div>
            <AIReviewWidget summary={merchant.aiSummary} />

            {/* Desktop CTA */}
            <a
              href={`https://wa.me/${merchant.phone}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              id="wa-cta-desktop"
              className="hidden sm:flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-base"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Chat & Nego via WhatsApp
            </a>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6 animate-fade-in">
            {/* Review Form (Google Maps Style) */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">
                Beri nilai dan ulasan
              </h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-slate-600">
                    Rating Anda:
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className={`transition-colors ${newReviewRating >= star ? "text-amber-400" : "text-slate-300 hover:text-amber-200"}`}
                      >
                        <Star
                          className={`w-8 h-8 ${newReviewRating >= star ? "fill-current" : ""}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <textarea
                    rows={4}
                    placeholder="Ceritakan pengalaman Anda dengan bisnis ini..."
                    className="w-full border border-surface-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-surface-50 resize-none transition-all"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="btn-primary px-6 py-2">
                    Kirim Ulasan
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-surface-200 pb-2">
                Semua Ulasan
              </h3>
              {merchantReviews.length > 0 ? (
                merchantReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">💬</div>
                  <p className="text-slate-500">
                    Belum ada ulasan. Jadilah yang pertama!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "photos" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fade-in">
            {merchant.photos.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-2xl overflow-hidden bg-surface-100"
              >
                <img
                  src={photo}
                  alt={`${merchant.name} foto ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white border-t border-surface-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href={`https://wa.me/${merchant.phone}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          id="wa-cta-mobile"
          className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          Chat & Nego via WhatsApp
        </a>
      </div>
    </div>
  );
}
