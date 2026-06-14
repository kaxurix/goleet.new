import { useMemo, useState } from "react";
import { banners, bannerSubmissionQueue } from "../data/data";
import { BannerContext } from "./bannerContextObject";

export function BannerProvider({ children }) {
  const [liveBanners, setLiveBanners] = useState(banners);
  const [bannerRequests, setBannerRequests] = useState(bannerSubmissionQueue);

  const submitBannerRequest = (payload) => {
    const newRequest = {
      id: `banner-${Date.now()}`,
      ...payload,
      submittedAt: "Baru saja",
      status: "pending",
    };

    setBannerRequests((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  const approveBannerRequest = (id) => {
    setBannerRequests((prev) => {
      const target = prev.find((item) => item.id === id);

      if (target) {
        const approvedBanner = {
          id: `live-${target.id}`,
          title: target.title,
          subtitle: target.subtitle,
          cta: target.cta,
          bg: target.bg,
          image: target.image,
        };

        setLiveBanners((current) => [approvedBanner, ...current]);
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const rejectBannerRequest = (id) => {
    setBannerRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const value = useMemo(
    () => ({
      liveBanners,
      bannerRequests,
      submitBannerRequest,
      approveBannerRequest,
      rejectBannerRequest,
    }),
    [liveBanners, bannerRequests],
  );

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
}
