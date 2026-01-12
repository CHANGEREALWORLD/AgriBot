// src/pages/Login.jsx
// import Layout from "../layout/Layout";
// import Card from "../components/Card";

// export default function Login() {
//   return (
//     <Layout>
//       <div className="login-wrap">
//         <Card className="login-card">
//           <h3>Login</h3>
//           <form className="login-form" onSubmit={(e)=>e.preventDefault()}>
//             <input placeholder="Email" />
//             <input placeholder="Password" type="password" />
//             <button className="btn">Sign in</button>
//           </form>
//         </Card>
//       </div>
//     </Layout>
//   );
// }



// import { useState } from "react";
// import Layout from "../layout/Layout";

// const inputStyle = {
//   width: "100%",
//   padding: 12,
//   marginBottom: 12,
//   borderRadius: 8,
//   border: "1px solid #ccc",
//   fontSize: 14,
// };

// const btnStyle = {
//   width: "100%",
//   padding: 12,
//   marginTop: 16,
//   background: "#3a8f45",
//   color: "#fff",
//   border: "none",
//   borderRadius: 8,
//   fontSize: 15,
//   cursor: "pointer",
// };

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       setError("Email and password required");
//       return;
//     }

//     setError("");
//     alert("Login works 🎉 (backend later)");
//   }

//   return (
//     <Layout>
//       <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
//         <div
//           style={{
//             width: 420,
//             padding: 24,
//             background: "#fff",
//             borderRadius: 12,
//             boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h2 style={{ textAlign: "center" }}>Login</h2>

//           <form onSubmit={handleSubmit}>
//             <input
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             {error && (
//               <div style={{ color: "#b00020", marginBottom: 8 }}>
//                 {error}
//               </div>
//             )}

//             <button style={btnStyle} type="submit">
//               Login
//             </button>
//           </form>

//           <p style={{ marginTop: 12, textAlign: "center", fontSize: 14 }}>
//             Don’t have an account? <a href="/signup">Signup</a>
//           </p>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Layout from "../layout/Layout";


// const inputStyle = {
//   width: "100%",
//   padding: 12,
//   marginBottom: 12,
//   borderRadius: 8,
//   border: "1px solid #ccc",
//   fontSize: 14,
// };

// const btnStyle = {
//   width: "100%",
//   padding: 12,
//   marginTop: 16,
//   background: "#3a8f45",
//   color: "#fff",
//   border: "none",
//   borderRadius: 8,
//   fontSize: 15,
//   cursor: "pointer",
// };

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     /* global google */
//     if (!window.google) return;

//     google.accounts.id.initialize({
//       client_id: "128067620182-oqkfh2lvho1nb6tk9cpkfnu77qr44drv.apps.googleusercontent.com",
//       callback: handleGoogleLogin,
//     });

//     google.accounts.id.renderButton(
//       document.getElementById("googleLogin"),
//       { theme: "outline", size: "large", width: 360 }
//     );
//   }, []);

//   function handleGoogleLogin(response) {
//     const user = decodeJwt(response.credential);
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", response.credential);
//     window.location.href = "/";
//   }

//   function decodeJwt(token) {
//     const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
//     return JSON.parse(atob(base64));
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.email || !form.password) {
//       setError("Email and password required");
//       return;
//     }
//     setError("");
//     alert("Email login works (backend later)");
//   }

//   return (
//     <Layout>
//       <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
//         <div
//           style={{
//             width: 420,
//             padding: 24,
//             background: "#fff",
//             borderRadius: 12,
//             boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h2 style={{ textAlign: "center" }}>Login</h2>

//           <form onSubmit={handleSubmit}>
//             <input
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             {error && (
//               <div style={{ color: "#b00020", marginBottom: 8 }}>{error}</div>
//             )}

//             <button style={btnStyle} type="submit">
//               Login
//             </button>
//           </form>

//           <div style={{ textAlign: "center", margin: "16px 0" }}>OR</div>

//           <div id="googleLogin" style={{ display: "flex", justifyContent: "center" }} />

//           <p style={{ marginTop: 12, textAlign: "center", fontSize: 14 }}>
//             Don’t have an account? <a href="/signup">Signup</a>
//           </p>
//           {/* <p style={{ textAlign: "right", fontSize: 13 }}>
//   <a href="/forgot-password">Forgot password?</a>
// </p> */}
// <p style={{ textAlign: "right", fontSize: 13 }}>
//   <Link to="/forgot-password">Forgot password?</Link>
// </p>


//         </div>
//       </div>
//     </Layout>
//   );
// }


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
};

const btnStyle = {
  width: "100%",
  padding: 12,
  marginTop: 16,
  background: "#3a8f45",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 15,
  cursor: "pointer",
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    /* global google */
    if (!window.google) return;

    function decodeJwt(token) {
      const base64 = token.split(".")[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      return JSON.parse(atob(base64));
    }

    function handleGoogleLogin(response) {
      const user = decodeJwt(response.credential);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.credential);
      window.location.href = "/";
    }

    google.accounts.id.initialize({
      client_id:
        "128067620182-oqkfh2lvho1nb6tk9cpkfnu77qr44drv.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleLogin"),
      { theme: "outline", size: "large", width: 360 }
    );
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password required");
      return;
    }
    setError("");
    alert("Email login works (backend later)");
  }

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <div
          style={{
            width: 420,
            padding: 24,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
            />

            {error && (
              <div style={{ color: "#b00020", marginBottom: 8 }}>
                {error}
              </div>
            )}

            <button style={btnStyle} type="submit">
              Login
            </button>
          </form>

          <div style={{ textAlign: "center", margin: "16px 0" }}>OR</div>

          <div
            id="googleLogin"
            style={{ display: "flex", justifyContent: "center" }}
          />

          <p style={{ marginTop: 12, textAlign: "center", fontSize: 14 }}>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </p>

          <p style={{ textAlign: "center", fontSize: 14 }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
