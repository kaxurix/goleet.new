import { users as seedUsers } from "./user";

const AUTH_USERS_STORAGE_KEY = "goleet-auth-users";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getStoredUsers() {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const rawUsers = window.localStorage.getItem(AUTH_USERS_STORAGE_KEY);
    if (!rawUsers) {
      return [];
    }

    const parsedUsers = JSON.parse(rawUsers);
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch {
    return [];
  }
}

export function getAllAuthUsers() {
  const usersByEmail = new Map(
    seedUsers.map((user) => [user.email.toLowerCase(), user]),
  );

  for (const storedUser of getStoredUsers()) {
    if (!storedUser?.email) {
      continue;
    }

    const normalizedEmail = storedUser.email.toLowerCase();
    usersByEmail.set(normalizedEmail, storedUser);
  }

  return Array.from(usersByEmail.values());
}

export function saveRegisteredUser(user) {
  const normalizedEmail = user.email.toLowerCase();
  const existingUsers = getStoredUsers();
  const hasDuplicate = getAllAuthUsers().some(
    (existingUser) => existingUser.email.toLowerCase() === normalizedEmail,
  );

  if (hasDuplicate) {
    return {
      ok: false,
      error: "Email sudah terdaftar. Silakan gunakan email lain.",
    };
  }

  const updatedUsers = [...existingUsers, user];

  if (canUseStorage()) {
    window.localStorage.setItem(
      AUTH_USERS_STORAGE_KEY,
      JSON.stringify(updatedUsers),
    );
  }

  return {
    ok: true,
    user,
  };
}

export function updateStoredAuthUser(email, updates) {
  const normalizedEmail = email.toLowerCase();
  const existingUser = getAllAuthUsers().find(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (!existingUser) {
    return {
      ok: false,
      error: "User tidak ditemukan.",
    };
  }

  const updatedUser = {
    ...existingUser,
    ...updates,
    email: normalizedEmail,
  };

  const otherStoredUsers = getStoredUsers().filter(
    (user) => user.email?.toLowerCase() !== normalizedEmail,
  );
  const updatedStoredUsers = [...otherStoredUsers, updatedUser];

  if (canUseStorage()) {
    window.localStorage.setItem(
      AUTH_USERS_STORAGE_KEY,
      JSON.stringify(updatedStoredUsers),
    );
  }

  return {
    ok: true,
    user: updatedUser,
  };
}
