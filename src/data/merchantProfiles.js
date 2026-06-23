import { merchants } from "./data";

const MERCHANT_PROFILES_STORAGE_KEY = "goleet-merchant-profiles";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getStoredMerchantProfiles() {
  if (!canUseStorage()) {
    return {};
  }

  try {
    const rawProfiles = window.localStorage.getItem(
      MERCHANT_PROFILES_STORAGE_KEY,
    );

    if (!rawProfiles) {
      return {};
    }

    const parsedProfiles = JSON.parse(rawProfiles);
    return parsedProfiles && typeof parsedProfiles === "object"
      ? parsedProfiles
      : {};
  } catch {
    return {};
  }
}

export function getMerchantProfile(storageKey) {
  if (!storageKey) {
    return merchants[0];
  }

  const storedProfiles = getStoredMerchantProfiles();
  return storedProfiles[storageKey] || merchants[0];
}

export function saveMerchantProfile(storageKey, profile) {
  if (!storageKey) {
    return;
  }

  const storedProfiles = getStoredMerchantProfiles();
  const updatedProfiles = {
    ...storedProfiles,
    [storageKey]: profile,
  };

  if (canUseStorage()) {
    window.localStorage.setItem(
      MERCHANT_PROFILES_STORAGE_KEY,
      JSON.stringify(updatedProfiles),
    );
  }
}
