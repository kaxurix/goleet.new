import { createContext, useContext, useState } from "react";
import { merchantUser, adminUser, regularUser } from "../data/data";
import {
  getAllAuthUsers,
  saveRegisteredUser,
  updateStoredAuthUser,
} from "../data/authUsers";

const AuthContext = createContext(null);
const AUTH_SESSION_STORAGE_KEY = "goleet-auth-session";

const roleDefaults = {
  merchant: merchantUser,
  admin: adminUser,
  user: regularUser,
};

function buildAuthenticatedUser(account) {
  const role = account.role || "user";
  const fallbackUser = roleDefaults[role] || regularUser;

  return {
    ...fallbackUser,
    id: account.id || fallbackUser.id,
    name: account.nama || account.name || fallbackUser.name,
    email: account.email || fallbackUser.email,
    role,
    telp: account.telp,
    location: account.location,
  };
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getStoredSession() {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    const parsedSession = JSON.parse(rawSession);
    return parsedSession && typeof parsedSession === "object"
      ? parsedSession
      : null;
  } catch {
    return null;
  }
}

function persistSession(user, hasClaimedBusiness) {
  if (!canUseStorage()) {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify({
      user,
      hasClaimedBusiness,
    }),
  );
}

export function AuthProvider({ children }) {
  const storedSession = getStoredSession();
  const [user, setUser] = useState(storedSession?.user || null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(storedSession?.user));
  const [hasClaimedBusiness, setHasClaimedBusinessState] = useState(
    storedSession?.hasClaimedBusiness || false,
  );

  const applySession = (nextUser, nextHasClaimedBusiness = false) => {
    setUser(nextUser);
    setIsLoggedIn(Boolean(nextUser));
    setHasClaimedBusinessState(nextHasClaimedBusiness);
    persistSession(nextUser, nextHasClaimedBusiness);
  };

  const setHasClaimedBusiness = (value) => {
    const nextValue =
      typeof value === "function" ? value(hasClaimedBusiness) : value;

    setHasClaimedBusinessState(nextValue);
    persistSession(user, nextValue);
  };

  const loginAsMerchant = () => {
    applySession(merchantUser, false);
  };

  const loginAsAdmin = () => {
    applySession(adminUser, false);
  };

  const loginAsUser = () => {
    applySession(regularUser, false);
  };

  const login = (email, password) => {
    const normalizedEmail = normalizeEmail(email);
    const matchedUser = getAllAuthUsers().find(
      (account) =>
        account.email.toLowerCase() === normalizedEmail &&
        account.password === password,
    );

    if (!matchedUser) {
      return null;
    }

    applySession(buildAuthenticatedUser(matchedUser), false);
    return matchedUser;
  };

  const register = ({ email, password, name, role, phone }) => {
    const accountToStore = {
      nama: name.trim(),
      role,
      email: normalizeEmail(email),
      password,
      telp: phone.trim(),
      location: "",
    };

    const storageResult = saveRegisteredUser(accountToStore);

    if (!storageResult.ok) {
      return storageResult;
    }

    const registeredUser = buildAuthenticatedUser(storageResult.user);

    applySession(registeredUser, false);
    return {
      ok: true,
      user: registeredUser,
    };
  };

  const updateProfile = (updates) => {
    if (!user?.email) {
      return {
        ok: false,
        error: "Sesi user tidak ditemukan.",
      };
    }

    const payload = {};

    if (typeof updates.name === "string") {
      payload.nama = updates.name.trim();
    }

    if (typeof updates.telp === "string") {
      payload.telp = updates.telp.trim();
    }

    if (typeof updates.location === "string") {
      payload.location = updates.location.trim();
    }

    const updateResult = updateStoredAuthUser(user.email, payload);

    if (!updateResult.ok) {
      return updateResult;
    }

    const updatedSessionUser = buildAuthenticatedUser(updateResult.user);
    applySession(updatedSessionUser, hasClaimedBusiness);

    return {
      ok: true,
      user: updatedSessionUser,
    };
  };

  const promoteToRegisteredMerchant = () => {
    if (!user?.email) {
      return {
        ok: false,
        error: "Sesi user tidak ditemukan.",
      };
    }

    const updateResult = updateStoredAuthUser(user.email, {
      role: "registered-merchant",
    });

    if (!updateResult.ok) {
      return updateResult;
    }

    const upgradedUser = buildAuthenticatedUser(updateResult.user);
    applySession(upgradedUser, true);

    return {
      ok: true,
      user: upgradedUser,
    };
  };

  const logout = () => {
    applySession(null, false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        hasClaimedBusiness,
        login,
        register,
        updateProfile,
        promoteToRegisteredMerchant,
        logout,
        loginAsMerchant,
        loginAsAdmin,
        loginAsUser,
        setHasClaimedBusiness,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
