import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

export default function CSButton() {
  const [tooltip, setTooltip] = useState(false);

  const waNumber = "6281234567890";
  const waMessage = encodeURIComponent(
    "Halo Goleet.id! Saya ingin bertanya tentang layanan bisnis Anda.",
  );

  return (
    <div className="fixed z-50 flex flex-col items-end gap-3 bottom-6 right-6">
      {/* Tooltip */}
      <div
        className={`transition-all duration-300 ${tooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        <div className="w-56 p-4 bg-white border shadow-xl rounded-2xl border-surface-100">
          <p className="mb-1 text-xs font-semibold text-slate-800">
            Butuh bantuan?
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            Chat dengan tim CS Goleet.id — kami siap membantu Anda!
          </p>
          <div className="flex gap-2 mt-3">
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-xs font-semibold text-center text-white transition-all bg-green-500 rounded-xl hover:bg-green-600"
            >
              Mulai Chat
            </a>
            <button
              onClick={() => setTooltip(false)}
              className="p-2 transition-all rounded-xl bg-surface-100 hover:bg-surface-200"
            >
              <X className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Button */}
      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 bg-green-400 rounded-full wa-pulse opacity-70" />
        <span
          className="absolute inset-0 bg-green-400 rounded-full wa-pulse opacity-40"
          style={{ animationDelay: "0.5s" }}
        />

        <button
          onClick={() => setTooltip(true)}
          className="relative flex items-center justify-center transition-all duration-300 bg-green-500 rounded-full shadow-lg w-14 h-14 hover:bg-green-600 hover:shadow-xl hover:scale-110 active:scale-95"
          aria-label="Chat via WhatsApp"
        >
          <MessageCircle className="text-white w-7 h-7 fill-white" />
        </button>
      </div>
    </div>
  );
}
