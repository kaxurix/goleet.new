import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, TrendingUp } from 'lucide-react';
import StarRating from './StarRating';
import { VerifiedBadge } from './Badge';

export default function MerchantCard({ merchant }) {
  const { id, name, category, categoryLabel, address, distance, rating, reviewCount, priceStart, image, tags, verified, aiSummary } = merchant;

  return (
    <Link
      to={`/merchant/${id}`}
      id={`merchant-card-${id}`}
      className="card card-hover group block overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges top-left */}
        {verified && (
          <div className="absolute top-3 left-3">
            <VerifiedBadge />
          </div>
        )}

        {/* Distance top-right */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
            <MapPin className="w-3 h-3" />
            {distance}
          </span>
        </div>

        {/* Price bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            Mulai Rp {priceStart.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category tag */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
            {categoryLabel}
          </span>
          <StarRating rating={rating} size="sm" />
        </div>

        {/* Name */}
        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary-700 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Address */}
        <p className="text-xs text-slate-500 flex items-center gap-1 mb-3 line-clamp-1">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {address}
        </p>

        {/* AI Summary */}
        {aiSummary && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3 bg-surface-50 rounded-lg p-2.5 border-l-2 border-primary-200">
            <span className="text-primary-600 font-semibold">✦ AI: </span>
            {aiSummary.substring(0, 100)}...
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-surface-100 text-slate-600 px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Review count & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100">
          <span className="text-xs text-slate-400">
            {reviewCount.toLocaleString('id-ID')} ulasan
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
            <MessageCircle className="w-3 h-3" />
            Chat & Nego
          </span>
        </div>
      </div>
    </Link>
  );
}
