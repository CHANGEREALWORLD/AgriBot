// src/utils/api.js
// simple fetch wrapper - replace BASE_URL with your backend

// const BASE_URL = "http://localhost:8000";

// export async function get(path) {
//   const res = await fetch(BASE_URL + path);
//   if (!res.ok) throw new Error("API error");
//   return res.json();
// }


// src/utils/api.js
// const BASE_URL = "http://127.0.0.1:8000"; // change if your backend uses another host/port

// export async function post(path, body) {
//   const res = await fetch(BASE_URL + path, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   const text = await res.text();
//   let data;
//   try { data = text ? JSON.parse(text) : {}; } catch(e) { throw new Error("Invalid JSON from API"); }

//   if (!res.ok) {
//     // Try to attach backend error message
//     const msg = data.detail || data.error || text || res.statusText;
//     throw new Error(msg);
//   }
//   return data;
// }


// src/utils/api.js

// const BASE_URL = "http://127.0.0.1:8000"; 
// // If your backend runs somewhere else, update this line.

// export async function post(path, body) {
//   const res = await fetch(BASE_URL + path, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   const text = await res.text();

//   let data = {};
//   try {
//     data = text ? JSON.parse(text) : {};
//   } catch (e) {
//     throw new Error("Backend returned invalid JSON");
//   }

//   if (!res.ok) {
//     const msg = data.detail || data.error || text || "Unknown API error";
//     throw new Error(msg);
//   }

//   return data;
// }


// const BASE_URL = "http://127.0.0.1:8000";

// export async function post(path, body) {
//   const res = await fetch(BASE_URL + path, {
//     method: "POST",
//     headers: { "Content-Type": "application/json"},
//     body: JSON.stringify(body),
//   });

//   const text = await res.text();
//   let data = {};

//   try {
//     data = text ? JSON.parse(text) : {};
//   } catch {
//     throw new Error("Backend returned invalid JSON");
//   }

//   if (!res.ok) {
//     const msg = data.detail || data.error || text || "Unknown API error";
//     throw new Error(msg);
//   }

//   return data;
// }




const BASE_URL = "http://127.0.0.1:8000";

export async function post(path, body) {
  const isFormData = body instanceof FormData;

  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: isFormData
      ? {} // browser sets multipart boundary automatically
      : { "Content-Type": "application/json" },
    body: isFormData ? body : JSON.stringify(body),
  });

  const text = await res.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Backend returned invalid JSON");
  }

  if (!res.ok) {
    const msg = data.detail || data.error || text || "Unknown API error";
    throw new Error(msg);
  }

  return data;
}

