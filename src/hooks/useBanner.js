import { useContext } from "react";
import { BannerContext } from "../context/bannerContextObject";

export function useBanner() {
  const ctx = useContext(BannerContext);
  if (!ctx) {
    throw new Error("useBanner must be used inside BannerProvider");
  }
  return ctx;
}
