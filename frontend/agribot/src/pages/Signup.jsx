// import { useState } from "react";
// import { post } from "../utils/api";
// import "./Auth.css";

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     const { name, value, checked, type } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function validate() {
//     if (!form.name.trim()) return "Enter your name";
//     if (!form.email.trim()) return "Enter your email";
//     if (!form.password) return "Enter a password";
//     if (form.password.length < 6) return "Password must be at least 6 characters";
//     if (form.password !== form.confirmPassword)
//       return "Passwords do not match";
//     if (!form.agree) return "You must accept Terms & Conditions";
//     return null;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     const msg = validate();
//     if (msg) return setError(msg);

//     setLoading(true);

//     try {
//       alert("Signup successful! (Backend will connect later)");
//       // const res = await post("/auth/signup", form);
//     } catch (err) {
//       setError(err.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="auth-bg">
//       <div className="auth-wrapper">

//         <div className="auth-box">
//           <h2>Create Your Account</h2>
//           <p className="sub">Join AgriBot and simplify smart farming</p>

//           <form onSubmit={handleSubmit} className="auth-form">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={handleChange}
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//             />

//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={handleChange}
//             />

//             <label className="terms">
//               <input
//                 type="checkbox"
//                 name="agree"
//                 checked={form.agree}
//                 onChange={handleChange}
//               />
//               I agree to the <a href="#">Terms & Conditions</a>
//             </label>

//             {error && <div className="auth-error">{error}</div>}

//             <button type="submit" className="btn-green" disabled={loading}>
//               {loading ? "Creating..." : "Sign Up"}
//             </button>
//           </form>

//           <div className="divider">or</div>

//           <button className="google-signin">
//             <img
//               src="https://developers.google.com/identity/images/g-logo.png"
//               alt=""
//             />
//             Continue with Google
//           </button>

//           <p className="switch">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";

// export default function Signup() {
//   const [agree, setAgree] = useState(false);

//   useEffect(() => {
//     /* global google */
//     if (!window.google) return;

//     google.accounts.id.initialize({
//       client_id: "128067620182-oqkfh2lvho1nb6tk9cpkfnu77qr44drv.apps.googleusercontent.com",
//       callback: handleGoogleSignup,
//     });

//     google.accounts.id.renderButton(
//       document.getElementById("googleSignup"),
//       { theme: "outline", size: "large" }
//     );
//   }, []);

//   function handleGoogleSignup(response) {
//     const user = decodeJwt(response.credential);

//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", response.credential);

//     window.location.href = "/";
//   }

//   function decodeJwt(token) {
//     const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
//     return JSON.parse(atob(base64));
//   }

//   return (
//     <div style={page}>
//       <div style={card}>
//         <h2 style={{ textAlign: "center" }}>Create Account</h2>

//         <input placeholder="Full Name" style={input} />
//         <input placeholder="Email" style={input} />
//         <input type="password" placeholder="Password" style={input} />
//         <input type="password" placeholder="Confirm Password" style={input} />

//         <label style={{ fontSize: 14 }}>
//           <input
//             type="checkbox"
//             checked={agree}
//             onChange={() => setAgree(!agree)}
//           />{" "}
//           I agree to Terms & Conditions
//         </label>

//         <button style={btn} disabled={!agree}>
//           Sign Up
//         </button>

//         <div style={{ textAlign: "center", margin: "12px 0" }}>OR</div>

//         <div id="googleSignup" style={{ display: "flex", justifyContent: "center" }} />
//       </div>
//     </div>
//   );
// }

// /* styles */
// const page = {
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "#f4f7f4",
// };

// const card = {
//   width: 360,
//   padding: 20,
//   background: "#fff",
//   borderRadius: 10,
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// };

// const input = {
//   width: "100%",
//   padding: 10,
//   marginBottom: 10,
//   borderRadius: 6,
//   border: "1px solid #ccc",
// };

// const btn = {
//   width: "100%",
//   padding: 10,
//   marginTop: 10,
//   background: "#3a8f45",
//   color: "#fff",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
// };




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

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   const [error, setError] = useState("");

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }
//   function handleGoogleSuccess(response) {
//   console.log("Google response:", response);

//   localStorage.setItem("user", JSON.stringify(response));
//   window.location.href = "/";
// }


//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (!form.agree) {
//       setError("You must accept terms");
//       return;
//     }

//     setError("");
//     console.log("SIGNUP DATA:", form);
//     alert("Signup form works 🎉");
//   }
//   return (
//   <Layout>
//     <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
//       <div
//         style={{
//           width: 420,
//           padding: 24,
//           background: "#ffffff",
//           borderRadius: 12,
//           boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 6 }}>
//           Create Account
//         </h2>
//         <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
//           Join AgriBot to get started
//         </p>

//         <form onSubmit={handleSubmit}>
//           <input
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             style={inputStyle}
//           />

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             style={inputStyle}
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             style={inputStyle}
//           />

//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             style={inputStyle}
//           />

//           <label style={{ fontSize: 14 }}>
//             <input
//               type="checkbox"
//               name="agree"
//               checked={form.agree}
//               onChange={handleChange}
//             />{" "}
//             I agree to Terms & Conditions
//           </label>

//           {error && (
//             <div style={{ color: "#b00020", marginTop: 10 }}>
//               {error}
//             </div>
//           )}

//           <button style={btnStyle} type="submit">
//             Create Account
//           </button>
//         </form>
//       </div>
//     </div>
//   </Layout>
  
// );
// }


import { useState } from "react";
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

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.agree) {
      setError("You must accept terms");
      return;
    }

    setError("");

    // ✅ STEP 3 — SAVE USER (THIS IS THE IMPORTANT PART)
    const userData = {
      name: form.name,
      email: form.email,
      provider: "email",
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // optional token placeholder
    localStorage.setItem("token", "demo-token");

    // redirect
    window.location.href = "/";
  }

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <div
          style={{
            width: 420,
            padding: 24,
            background: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 6 }}>
            Create Account
          </h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
            Join AgriBot to get started
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={{ fontSize: 14 }}>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />{" "}
              I agree to Terms & Conditions
            </label>

            {error && (
              <div style={{ color: "#b00020", marginTop: 10 }}>
                {error}
              </div>
            )}

            <button style={btnStyle} type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
