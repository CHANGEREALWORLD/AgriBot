// const BASE_URL = "http://127.0.0.1:8000";
//  const BASE_URL = "https://agribot-5u3t.onrender.com"

// export async function post(path, body) {
//   const isFormData = body instanceof FormData;

//   const res = await fetch(BASE_URL + path, {
//     method: "POST",
//     headers: isFormData
//       ? {} // browser sets multipart boundary automatically
//       : { "Content-Type": "application/json" },
//     body: isFormData ? body : JSON.stringify(body),
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


const BASE_URL = "https://agribot-5u3t.onrender.com";

export async function post(path, body) {
  const isFormData = body instanceof FormData;

  const res = await fetch(BASE_URL + path, {
    method: "POST",
    credentials: "include",
    headers: isFormData
      ? {}
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
    const msg =
      data.detail ||
      data.error ||
      data.message ||
      text ||
      "Unknown API error";
    throw new Error(msg);
  }

  return data;
}


