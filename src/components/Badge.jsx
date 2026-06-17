import { BadgeCheck, Crown, Tag } from "lucide-react";

export function VerifiedBadge({ size = "sm" }) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span className={`badge-verified ${textSize}`}>
      <BadgeCheck className={iconSize} />
      Promosi
    </span>
  );
}

export function PremiumBadge({ size = "sm" }) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span className={`badge-premium ${textSize}`}>
      <Crown className={iconSize} />
      Premium
    </span>
  );
}

export function CategoryBadge({ label, color }) {
  return (
    <span className={`badge-neutral text-xs ${color || ""}`}>{label}</span>
  );
}

export function StatusBadge({ status }) {
  const config = {
    verified: {
      label: "Terverifikasi",
      className: "bg-green-100 text-green-700",
    },
    pending: { label: "Menunggu", className: "bg-amber-100 text-amber-700" },
    rejected: { label: "Ditolak", className: "bg-red-100 text-red-700" },
  };
  const { label, className } = config[status] || config.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
