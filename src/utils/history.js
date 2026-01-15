import { getCurrentUserId } from "./user";

export function saveHistory(baseKey, entry, limit = 5) {
  const userId = getCurrentUserId();
  if (!userId) return;

  const key = `${baseKey}_${userId}`;

  const raw = localStorage.getItem(key);
  const list = raw ? JSON.parse(raw) : [];

  const updated = [
    { ...entry, time: new Date().toLocaleString() },
    ...list,
  ].slice(0, limit);

  localStorage.setItem(key, JSON.stringify(updated));
}

export function loadHistory(baseKey) {
  const userId = getCurrentUserId();
  if (!userId) return [];

  const key = `${baseKey}_${userId}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

