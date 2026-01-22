// src/pages/CropRecommend.jsx
// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import { post } from "../utils/api";


// export default function CropRecommend() {
//   return (
//     <Layout>
//       <h2>Crop Recommendation</h2>
//       <Card>
//         <p>Inputs: soil pH, moisture, temperature — Model suggestions here.</p>
//       </Card>
//     </Layout>
//   );
// }

// async function handleSubmit(e) {
//   e.preventDefault();
//   setResult(null);

//   try {
//     const payload = {
//       soil_type: form.soil_type,
//       nitrogen: Number(form.nitrogen),
//       phosphorus: Number(form.phosphorus),
//       potassium: Number(form.potassium),
//       rainfall: Number(form.rainfall),
//       temperature: Number(form.temperature),
//     };

//     console.log("Sending crop payload:", payload);

//     const res = await post("/crop/recommend", payload);

//     setResult(res.recommended_crop);
//   } catch (err) {
//     console.error("Crop recommend error:", err);
//     alert(err.message || "Failed to recommend crop");
//   }
// }


// import { useState } from "react";
// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import { post } from "../utils/api";

// export default function CropRecommend() {
//   const [form, setForm] = useState({
//     soil_type: "",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     rainfall: "",
//     temperature: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setResult(null);
//     setLoading(true);

//     try {
//       const payload = {
//         soil_type: form.soil_type,
//         nitrogen: Number(form.nitrogen),
//         phosphorus: Number(form.phosphorus),
//         potassium: Number(form.potassium),
//         rainfall: Number(form.rainfall),
//         temperature: Number(form.temperature),
//       };

//       console.log("Crop payload:", payload);

//       const res = await post("/crop/recommend", payload);
//       setResult(res.recommended_crop);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Failed to recommend crop");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Crop Recommendation</h2>

//       <div style={{ maxWidth: 500 }}>
//         <Card>
//           <h3 className="card-title">Enter Soil & Climate Data</h3>

//           <form onSubmit={handleSubmit}>
//             <select
//               name="soil_type"
//               value={form.soil_type}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Soil Type</option>
//               <option value="sandy">Sandy</option>
//               <option value="loamy">Loamy</option>
//               <option value="clay">Clay</option>
//               <option value="silty">Silty</option>
//             </select>

//             <input
//               name="nitrogen"
//               placeholder="Nitrogen (N)"
//               value={form.nitrogen}
//               onChange={handleChange}
//               required
//             />

//             <input
//               name="phosphorus"
//               placeholder="Phosphorus (P)"
//               value={form.phosphorus}
//               onChange={handleChange}
//               required
//             />

//             <input
//               name="potassium"
//               placeholder="Potassium (K)"
//               value={form.potassium}
//               onChange={handleChange}
//               required
//             />

//             <input
//               name="rainfall"
//               placeholder="Rainfall (mm)"
//               value={form.rainfall}
//               onChange={handleChange}
//               required
//             />

//             <input
//               name="temperature"
//               placeholder="Temperature (°C)"
//               value={form.temperature}
//               onChange={handleChange}
//               required
//             />

//             {error && (
//               <div style={{ color: "#c0392b", marginTop: 8 }}>
//                 {error}
//               </div>
//             )}

//             <button type="submit" className="btn" disabled={loading}>
//               {loading ? "Predicting..." : "Recommend Crop"}
//             </button>
//           </form>
//         </Card>

//         {result && (
//           <Card style={{ marginTop: 20 }}>
//             <h3>Recommended Crop</h3>
//             <p style={{ fontSize: 20, fontWeight: 600 }}>{result}</p>
//           </Card>
//         )}
//       </div>
//     </Layout>
//   );
// }



// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// export default function CropRecommend() {
//   const [form, setForm] = useState({
//     soil_type: "sandy",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     rainfall: "",
//     temperature: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function recommend() {
//     setError("");
//     setResult(null);

//     try {
//       const payload = {
//         soil_type: form.soil_type,
//         nitrogen: Number(form.nitrogen),
//         phosphorus: Number(form.phosphorus),
//         potassium: Number(form.potassium),
//         rainfall: Number(form.rainfall),
//         temperature: Number(form.temperature),
//       };

//       const res = await post("/crop/recommend", payload);
//       setResult(res);
//     } catch (err) {
//       setError("Failed to fetch recommendation");
//       console.error(err);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Crop Recommendation</h2>

//       <div className="card">
//         <select name="soil_type" value={form.soil_type} onChange={handleChange}>
//           <option value="sandy">Sandy</option>
//           <option value="loamy">Loamy</option>
//           <option value="clay">Clay</option>
//           <option value="silty">Silty</option>
//         </select>

//         <input name="nitrogen" placeholder="Nitrogen" onChange={handleChange} />
//         <input name="phosphorus" placeholder="Phosphorus" onChange={handleChange} />
//         <input name="potassium" placeholder="Potassium" onChange={handleChange} />
//         <input name="rainfall" placeholder="Rainfall (mm)" onChange={handleChange} />
//         <input name="temperature" placeholder="Temperature (°C)" onChange={handleChange} />

//         <button onClick={recommend}>Recommend Crop</button>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {result && (
//           <div style={{ marginTop: 20 }}>
//             <h3>{result.recommended_crop}</h3>
//             <p>{result.reason}</p>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// export default function CropRecommend() {
//   const [form, setForm] = useState({
//     soil_type: "sandy",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     rainfall: "",
//     temperature: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function recommend() {
//     setError("");
//     setResult(null);

//     try {
//       const payload = {
//         soil_type: form.soil_type,
//         nitrogen: Number(form.nitrogen),
//         phosphorus: Number(form.phosphorus),
//         potassium: Number(form.potassium),
//         rainfall: Number(form.rainfall),
//         temperature: Number(form.temperature),
//       };

//       const res = await post("/crop/recommend", payload);
//       setResult(res);
//     } catch (err) {
//       setError("Failed to fetch recommendation");
//       console.error(err);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Crop Recommendation</h2>

//       <div className="card">
//         <select name="soil_type" value={form.soil_type} onChange={handleChange}>
//           <option value="sandy">Sandy</option>
//           <option value="loamy">Loamy</option>
//           <option value="clay">Clay</option>
//           <option value="silty">Silty</option>
//         </select>

//         <input name="nitrogen" placeholder="Nitrogen" onChange={handleChange} />
//         <input name="phosphorus" placeholder="Phosphorus" onChange={handleChange} />
//         <input name="potassium" placeholder="Potassium" onChange={handleChange} />
//         <input name="rainfall" placeholder="Rainfall (mm)" onChange={handleChange} />
//         <input name="temperature" placeholder="Temperature (°C)" onChange={handleChange} />

//         <button onClick={recommend}>Recommend Crop</button>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {result && (
//           <div style={{ marginTop: 20 }}>
//             <h3>{result.recommended_crop}</h3>
//             <p>{result.reason}</p>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// export default function CropRecommend() {
//   const [form, setForm] = useState({
//     soil_type: "sandy",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     rainfall: "",
//     temperature: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function recommend() {
//     setError("");
//     setResult(null);

//     // basic validation
//     for (const key of ["nitrogen","phosphorus","potassium","rainfall","temperature"]) {
//       if (form[key] === "" || isNaN(form[key])) {
//         setError("Please fill all numeric fields correctly.");
//         return;
//       }
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         soil_type: form.soil_type,
//         nitrogen: Number(form.nitrogen),
//         phosphorus: Number(form.phosphorus),
//         potassium: Number(form.potassium),
//         rainfall: Number(form.rainfall),
//         temperature: Number(form.temperature),
//       };

//       const res = await post("/crop/recommend", payload);
//       setResult(res);
//     } catch (err) {
//       setError("Failed to fetch recommendation");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2 style={{ marginBottom: 16 }}>Crop Recommendation</h2>

//       <div
//         style={{
//           background: "#fff",
//           padding: 20,
//           borderRadius: 12,
//           maxWidth: 520,
//           boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
//         }}
//       >
//         <h4>Enter Soil & Climate Data</h4>

//         <select
//           name="soil_type"
//           value={form.soil_type}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10 }}
//         >
//           <option value="sandy">Sandy</option>
//           <option value="loamy">Loamy</option>
//           <option value="clay">Clay</option>
//           <option value="silty">Silty</option>
//         </select>

//         <input name="nitrogen" placeholder="Nitrogen (N)" onChange={handleChange} />
//         <input name="phosphorus" placeholder="Phosphorus (P)" onChange={handleChange} />
//         <input name="potassium" placeholder="Potassium (K)" onChange={handleChange} />
//         <input name="rainfall" placeholder="Rainfall (mm)" onChange={handleChange} />
//         <input name="temperature" placeholder="Temperature (°C)" onChange={handleChange} />

//         <button
//           onClick={recommend}
//           disabled={loading}
//           style={{
//             marginTop: 12,
//             padding: "10px 16px",
//             background: "#2e7d32",
//             color: "#fff",
//             border: "none",
//             borderRadius: 8,
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "Analyzing..." : "Recommend Crop"}
//         </button>

//         {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
//       </div>

//       {/* RESULT */}
//       {result && (
//         <div
//           style={{
//             marginTop: 24,
//             background: "#fff",
//             padding: 20,
//             borderRadius: 12,
//             maxWidth: 520,
//             boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h3 style={{ color: "#2e7d32" }}>{result.recommended_crop}</h3>

//           {result.confidence && (
//             <>
//               <p><strong>Confidence: {result.confidence}%</strong></p>
//               <div style={{ height: 8, background: "#eee", borderRadius: 6 }}>
//                 <div
//                   style={{
//                     width: `${result.confidence}%`,
//                     height: "100%",
//                     background: "#2e7d32",
//                     borderRadius: 6,
//                   }}
//                 />
//               </div>
//             </>
//           )}

//           <div style={{ marginTop: 10 }}>
//             <strong>Why this crop?</strong>
//             <ul>
//               {result.reason
//                 .split("|")
//                 .map((r, i) => <li key={i}>{r.trim()}</li>)}
//             </ul>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }




// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";
// At the top of CropRecommend.jsx
// import ".src/styles/CropRecommend.css";
// In CropRecommend.jsx
// import "../styles/CropRecommend.css";

// export default function CropRecommend() {
//   const [form, setForm] = useState({
//     soil_type: "sandy",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     rainfall: "",
//     temperature: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function recommend() {
//     setError("");
//     setResult(null);
//     setLoading(true);

//     try {
//       const payload = {
//         soil_type: form.soil_type,
//         nitrogen: Number(form.nitrogen),
//         phosphorus: Number(form.phosphorus),
//         potassium: Number(form.potassium),
//         rainfall: Number(form.rainfall),
//         temperature: Number(form.temperature),
//       };

//       const res = await post("/crop/recommend", payload);
//       setResult(res);
//     } catch (err) {
//       setError("Failed to fetch recommendation");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Crop Recommendation</h2>

//       <div className="card" style={{ maxWidth: 520 }}>
//         <select name="soil_type" value={form.soil_type} onChange={handleChange}>
//           <option value="sandy">Sandy</option>
//           <option value="loamy">Loamy</option>
//           <option value="clay">Clay</option>
//           <option value="silty">Silty</option>
//         </select>

//         <input name="nitrogen" placeholder="Nitrogen (N)" onChange={handleChange} />
//         <input name="phosphorus" placeholder="Phosphorus (P)" onChange={handleChange} />
//         <input name="potassium" placeholder="Potassium (K)" onChange={handleChange} />
//         <input name="rainfall" placeholder="Rainfall (mm)" onChange={handleChange} />
//         <input name="temperature" placeholder="Temperature (°C)" onChange={handleChange} />

//         <button onClick={recommend} disabled={loading}>
//           {loading ? "Analyzing..." : "Recommend Crop"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card" style={{ marginTop: 20, maxWidth: 520 }}>
//           <h3>🌾 Recommended Crop</h3>
//           <h2 style={{ marginTop: 6 }}>{result.recommended_crop}</h2>

//           {/* Confidence */}
//           <div style={{ marginTop: 14 }}>
//             <strong>Confidence: {result.confidence}%</strong>
//             <div
//               style={{
//                 height: 10,
//                 background: "#eee",
//                 borderRadius: 6,
//                 marginTop: 6,
//               }}
//             >
//               <div
//                 style={{
//                   width: `${result.confidence}%`,
//                   height: "100%",
//                   background: "#3a8f45",
//                   borderRadius: 6,
//                 }}
//               />
//             </div>
//           </div>

//           {/* Reasons */}
//           <div style={{ marginTop: 16 }}>
//             <strong>Why this crop?</strong>
//             <ul style={{ marginTop: 8 }}>
//               {result.reason_points.map((r, i) => (
//                 <li key={i}>{r}</li>
//               ))}
//             </ul>
//           </div>
          
//           {/* Input Summary */}
//           <div style={{ marginTop: 18 }}>
//             <strong>Input Summary</strong>
//             <ul style={{ marginTop: 8, color: "#555" }}>
//               <li>Soil type: {form.soil_type}</li>
//               <li>Rainfall: {form.rainfall} mm</li>
//               <li>Temperature: {form.temperature} °C</li>
//               <li>Nitrogen (N): {form.nitrogen}</li>
//               <li>Phosphorus (P): {form.phosphorus}</li>
//               <li>Potassium (K): {form.potassium}</li>
//              </ul>
//              </div>


//         </div>
//       )}
//     </Layout>
//   );
// }

import { useState } from "react";
import Layout from "../layout/Layout";
import { post } from "../utils/api";
import "../styles/CropRecommend.css";

export default function CropRecommend() {
  const [form, setForm] = useState({
    soil_type: "sandy",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    rainfall: "",
    temperature: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function recommend() {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const payload = {
        soil_type: form.soil_type,
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
        rainfall: Number(form.rainfall),
        temperature: Number(form.temperature),
      };

      const res = await post("/crop/recommend", payload);
      setResult(res);
    } catch (err) {
      setError("Failed to fetch recommendation");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="crop-recommend-page">
        <h2>Crop Recommendation</h2>

        <div className="crop-form-card">
          <div className="form-group">
            <label htmlFor="soil_type">Soil Type</label>
            <select 
              id="soil_type"
              name="soil_type" 
              value={form.soil_type} 
              onChange={handleChange}
            >
              <option value="sandy">Sandy Soil</option>
              <option value="loamy">Loamy Soil</option>
              <option value="clay">Clay Soil</option>
              <option value="silty">Silty Soil</option>
            </select>
          </div>

          <div className="npk-grid">
            <div className="form-group">
              <label htmlFor="nitrogen">Nitrogen (N)</label>
              <input 
                id="nitrogen"
                type="number"
                name="nitrogen" 
                placeholder="e.g., 50" 
                value={form.nitrogen}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="phosphorus">Phosphorus (P)</label>
              <input 
                id="phosphorus"
                type="number"
                name="phosphorus" 
                placeholder="e.g., 40" 
                value={form.phosphorus}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="potassium">Potassium (K)</label>
              <input 
                id="potassium"
                type="number"
                name="potassium" 
                placeholder="e.g., 30" 
                value={form.potassium}
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="rainfall">Rainfall (mm)</label>
            <input 
              id="rainfall"
              type="number"
              name="rainfall" 
              placeholder="e.g., 200" 
              value={form.rainfall}
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="temperature">Temperature (°C)</label>
            <input 
              id="temperature"
              type="number"
              name="temperature" 
              placeholder="e.g., 25" 
              value={form.temperature}
              onChange={handleChange} 
            />
          </div>

          <button className="recommend-btn" onClick={recommend} disabled={loading}>
            {loading ? "🔄 Analyzing..." : "🔍 Recommend Crop"}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>

        {result && (
          <div className="result-card">
            <div className="result-header">
              <h3>🌾 Recommended Crop</h3>
              <h2 className="result-crop-name">{result.recommended_crop}</h2>
            </div>

            {/* Confidence */}
            <div className="confidence-section">
              <div className="confidence-label">
                <strong>Confidence Score</strong>
                <span className="confidence-value">{result.confidence}%</span>
              </div>
              <div className="confidence-bar-bg">
                <div
                  className="confidence-bar-fill"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Reasons */}
            <div className="reasons-section">
              <strong>Why this crop?</strong>
              <ul className="reasons-list">
                {result.reason_points.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            
            {/* Input Summary */}
            <div className="input-summary-section">
              <strong>Input Summary</strong>
              <ul className="summary-list">
                <li>
                  Soil Type: <strong>{form.soil_type}</strong>
                </li>
                <li>
                  Rainfall: <strong>{form.rainfall} mm</strong>
                </li>
                <li>
                  Temperature: <strong>{form.temperature} °C</strong>
                </li>
                <li>
                  Nitrogen: <strong>{form.nitrogen}</strong>
                </li>
                <li>
                  Phosphorus: <strong>{form.phosphorus}</strong>
                </li>
                <li>
                  Potassium: <strong>{form.potassium}</strong>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}