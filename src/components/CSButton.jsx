import { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

export default function CSButton() {
  const [tooltip, setTooltip] = useState(false);

  const waNumber = '6281234567890';
  const waMessage = encodeURIComponent('Halo Goleet.id! Saya ingin bertanya tentang layanan bisnis Anda.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <div className={`transition-all duration-300 ${tooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <div className="bg-white rounded-2xl shadow-xl border border-surface-100 p-4 w-56">
          <p className="text-xs font-semibold text-slate-800 mb-1">Butuh bantuan?</p>
          <p className="text-xs text-slate-500 leading-relaxed">Chat dengan tim CS Goleet.id — kami siap membantu Anda!</p>
          <div className="mt-3 flex gap-2">
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-semibold text-center transition-all"
            >
              Mulai Chat
            </a>
            <button
              onClick={() => setTooltip(false)}
              className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-all"
            >
              <X className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Button */}
      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-400 wa-pulse opacity-70" />
        <span className="absolute inset-0 rounded-full bg-green-400 wa-pulse opacity-40" style={{ animationDelay: '0.5s' }} />

        <a
          href={`https://wa.me/${waNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
          onClick={() => setTooltip(false)}
          className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Chat via WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </a>
      </div>
    </div>
  );
}
