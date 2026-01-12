export function getCurrentUserId() {
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  const user = JSON.parse(raw);
  return user.sub || user.email; // sub preferred
}

