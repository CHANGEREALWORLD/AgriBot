// src/utils/authApi.js
// const BASE_URL = "http://127.0.0.1:8000";
 const BASE_URL = "https://agribot-5u3t.onrender.com"

function getToken() {
  return localStorage.getItem("token");
}

export async function authGet(path) {
  const token = getToken();
  const res = await fetch(BASE_URL + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.detail || "Auth request failed");
  return data;
}

export async function putAuth(path, body) {
  const token = getToken();
  const res = await fetch(BASE_URL + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.detail || "Auth request failed");
  return data;
}
