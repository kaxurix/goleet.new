import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 'sm', showCount = false, count = 0 }) {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= Math.round(rating) ? 'star-filled fill-amber-400' : 'star-empty fill-slate-200 text-slate-200'}`}
          />
        ))}
      </div>
      <span className={`font-semibold text-slate-800 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && count > 0 && (
        <span className={`text-slate-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          ({count.toLocaleString('id-ID')} ulasan)
        </span>
      )}
    </div>
  );
}
