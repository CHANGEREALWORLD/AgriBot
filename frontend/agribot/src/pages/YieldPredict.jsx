// src/pages/YieldPredict.jsx
// import Layout from "../layout/Layout";
// import Card from "../components/Card";

// export default function YieldPredict() {
//   return (
//     <Layout>
//       <h2>Yield Prediction</h2>
//       <Card>
//         <p>Form to run prediction and show results.</p>
//       </Card>
//     </Layout>
//   );
// }



// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import { useState } from "react";
// import { post } from "../utils/api";

// export default function YieldPredict() {
//   const [form, setForm] = useState({
//     Moisture: "",
//     rainfall: "",
//     Average_Humidity: "",
//     Mean_Temp: "",
//     max_Temp: "",
//     Min_temp: "",
//     alkaline: "",
//     sandy: "",
//     chalky: "",
//     clay: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const data = await post("/yield/predict", {
//         Moisture: Number(form.Moisture),
//         rainfall: Number(form.rainfall),
//         Average_Humidity: Number(form.Average_Humidity),
//         Mean_Temp: Number(form.Mean_Temp),
//         max_Temp: Number(form.max_Temp),
//         Min_temp: Number(form.Min_temp),
//         alkaline: Number(form.alkaline),
//         sandy: Number(form.sandy),
//         chalky: Number(form.chalky),
//         clay: Number(form.clay),
//       });

//       setResult(data.predicted_millet_yield);
//     } catch (err) {
//       setError(err.message || "Prediction failed");
//     }

//     setLoading(false);
//   }

//   return (
//     <Layout>
//       <h2 style={{ marginBottom: "18px" }}>Yield Prediction</h2>

//       <div className="yield-grid">
//         <Card className="yield-form-card">
//           <h3 className="card-title">Enter Input Values</h3>

//           <form className="yield-form" onSubmit={handleSubmit}>
//             <input name="Moisture" placeholder="Moisture" value={form.Moisture} onChange={handleChange} />
//             <input name="rainfall" placeholder="Rainfall" value={form.rainfall} onChange={handleChange} />
//             <input name="Average_Humidity" placeholder="Average Humidity" value={form.Average_Humidity} onChange={handleChange} />
//             <input name="Mean_Temp" placeholder="Mean Temp" value={form.Mean_Temp} onChange={handleChange} />
//             <input name="max_Temp" placeholder="Max Temp" value={form.max_Temp} onChange={handleChange} />
//             <input name="Min_temp" placeholder="Min Temp" value={form.Min_temp} onChange={handleChange} />
//             <input name="alkaline" placeholder="Alkaline %" value={form.alkaline} onChange={handleChange} />
//             <input name="sandy" placeholder="Sandy %" value={form.sandy} onChange={handleChange} />
//             <input name="chalky" placeholder="Chalky %" value={form.chalky} onChange={handleChange} />
//             <input name="clay" placeholder="Clay %" value={form.clay} onChange={handleChange} />

//             {error && <p style={{ color: "crimson" }}>{error}</p>}

//             <button className="btn" disabled={loading}>
//               {loading ? "Predicting..." : "Predict Yield"}
//             </button>
//           </form>
//         </Card>

//         <Card className="yield-result-card">
//           <h3 className="card-title">Predicted Yield</h3>

//           {!result && <p className="placeholder-text">Prediction will appear here</p>}

//           {result !== null && (
//             <p className="result-value">{result} kg/hectare</p>
//           )}
//         </Card>
//       </div>
//     </Layout>
//   );
// }





// src/pages/YieldPredict.jsx
// import { useState } from "react";
// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import { post } from "../utils/api";

// const defaultForm = {
//   crop_type: "",
//   soil_type: "",
//   rainfall: "",
//   humidity: "",
//   temperature: "",
//   moisture: "",
//   nitrogen: "",
//   phosphorus: "",
//   potassium: "",
// };

// export default function YieldPredict() {
//   const [form, setForm] = useState(defaultForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   }

//   function validate() {
//     // ensure required fields filled and numeric where needed
//     if (!form.crop_type) return "Select crop type";
//     if (!form.soil_type) return "Select soil type";
//     const nums = ["rainfall","humidity","temperature","moisture","nitrogen","phosphorus","potassium"];
//     for (const k of nums) {
//       if (form[k] === "" || form[k] === null) return `Enter ${k}`;
//       if (isNaN(Number(form[k]))) return `${k} must be a number`;
//     }
//     return null;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setResult(null);
//     const vErr = validate();
//     if (vErr) { setError(vErr); return; }

//     setLoading(true);
//     try {
//       // build payload with correct types
//       const payload = {
//         crop_type: form.crop_type,
//         soil_type: form.soil_type,
//         rainfall: Number(form.rainfall),
//         humidity: Number(form.humidity),
//         temperature: Number(form.temperature),
//         moisture: Number(form.moisture),
//         nitrogen: Number(form.nitrogen),
//         phosphorus: Number(form.phosphorus),
//         potassium: Number(form.potassium),
//       };

//       const data = await post("/yield/predict", payload);

//       // support multiple possible response keys for robustness
//       const val =
//         data.predicted_yield_kg_per_ha ??
//         data.predicted_yield ??
//         data.predicted_millet_yield ??
//         data.predicted_yield_value ??
//         null;

//       if (val === null) {
//         setError("Unexpected API response.");
//       } else {
//         const rounded = Math.round(Number(val) * 100) / 100;
//         setResult(rounded);
//         setHistory((h) => [{ ts: new Date().toLocaleString(), payload, value: rounded }, ...h].slice(0, 6));
//       }
//     } catch (err) {
//       setError(err.message || "Prediction failed");
//       console.error("Predict error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function resetForm() {
//     setForm(defaultForm);
//     setError("");
//     setResult(null);
//   }

//   return (
//     <Layout>
//       <h2 style={{ marginBottom: 12 }}>Yield Prediction</h2>

//       <div className="yield-grid">
//         <Card className="yield-form-card">
//           <h3 className="card-title">Input Parameters</h3>

//           <form className="yield-form" onSubmit={handleSubmit}>
//             <div className="row">
//               <select name="crop_type" value={form.crop_type} onChange={handleChange}>
//                 <option value="">Select crop</option>
//                 <option value="wheat">Wheat</option>
//                 <option value="rice">Rice</option>
//                 <option value="maize">Maize</option>
//                 <option value="millet">Millet</option>
//                 <option value="sugarcane">Sugarcane</option>
//               </select>

//               <select name="soil_type" value={form.soil_type} onChange={handleChange}>
//                 <option value="">Select soil</option>
//                 <option value="clay">Clay</option>
//                 <option value="sandy">Sandy</option>
//                 <option value="loamy">Loamy</option>
//                 <option value="silty">Silty</option>
//                 <option value="chalky">Chalky</option>
//               </select>
//             </div>

//             <div className="row">
//               <input name="rainfall" value={form.rainfall} onChange={handleChange} placeholder="Rainfall (mm)" />
//               <input name="humidity" value={form.humidity} onChange={handleChange} placeholder="Humidity (%)" />
//             </div>

//             <div className="row">
//               <input name="temperature" value={form.temperature} onChange={handleChange} placeholder="Temperature (°C)" />
//               <input name="moisture" value={form.moisture} onChange={handleChange} placeholder="Soil moisture (%)" />
//             </div>

//             <div className="row">
//               <input name="nitrogen" value={form.nitrogen} onChange={handleChange} placeholder="Nitrogen (N)" />
//               <input name="phosphorus" value={form.phosphorus} onChange={handleChange} placeholder="Phosphorus (P)" />
//             </div>

//             <div className="row">
//               <input name="potassium" value={form.potassium} onChange={handleChange} placeholder="Potassium (K)" />
//             </div>

//             {error && <div className="error-box">{error}</div>}

//             <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
//               <button className="btn" type="submit" disabled={loading}>{loading ? "Predicting..." : "Predict"}</button>
//               <button type="button" className="btn secondary" onClick={resetForm} disabled={loading}>Reset</button>
//             </div>
//           </form>
//         </Card>

//         <Card className="yield-result-card">
//           <h3 className="card-title">Result</h3>

//           {!result && <p className="placeholder-text">Prediction output will appear here</p>}

//           {result !== null && (
//             <div style={{ textAlign: "center" }}>
//               <p className="result-value">{result} kg/ha</p>
//               <p style={{ color: "var(--muted)" }}>Predicted yield (kg per hectare)</p>
//             </div>
//           )}

//           <hr style={{ margin: "14px 0" }} />

//           <h4 style={{ marginBottom: 8 }}>Recent predictions</h4>
//           <div className="history-list">
//             {history.length === 0 && <div className="placeholder-text">No predictions yet</div>}
//             {history.map((h, i) => (
//               <div key={i} className="history-item">
//                 <div><strong>{h.value} kg/ha</strong></div>
//                 <div className="muted">{h.ts}</div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </Layout>
//   );
// }



import { useState } from "react";
import Layout from "../layout/Layout";
import Card from "../components/Card";
import { post } from "../utils/api";
import "../styles/YieldPredict.css";

const defaultForm = {
  crop_type: "",
  soil_type: "",
  rainfall: "",
  humidity: "",
  temperature: "",
  moisture: "",
  nitrogen: "",
  phosphorus: "",
  potassium: "",
};

export default function YieldPredict() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    // ensure required fields filled and numeric where needed
    if (!form.crop_type) return "Select crop type";
    if (!form.soil_type) return "Select soil type";
    const nums = ["rainfall","humidity","temperature","moisture","nitrogen","phosphorus","potassium"];
    for (const k of nums) {
      if (form[k] === "" || form[k] === null) return `Enter ${k}`;
      if (isNaN(Number(form[k]))) return `${k} must be a number`;
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    const vErr = validate();
    if (vErr) { setError(vErr); return; }

    setLoading(true);
    try {
      // build payload with correct types
      const payload = {
        crop_type: form.crop_type,
        soil_type: form.soil_type,
        rainfall: Number(form.rainfall),
        humidity: Number(form.humidity),
        temperature: Number(form.temperature),
        moisture: Number(form.moisture),
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
      };

      const data = await post("/yield/predict", payload);

      // support multiple possible response keys for robustness
      const val =
        data.predicted_yield_kg_per_ha ??
        data.predicted_yield ??
        data.predicted_millet_yield ??
        data.predicted_yield_value ??
        null;

      if (val === null) {
        setError("Unexpected API response.");
      } else {
        const rounded = Math.round(Number(val) * 100) / 100;
        setResult(rounded);
        setHistory((h) => [{ ts: new Date().toLocaleString(), payload, value: rounded }, ...h].slice(0, 6));
      }
    } catch (err) {
      setError(err.message || "Prediction failed");
      console.error("Predict error:", err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(defaultForm);
    setError("");
    setResult(null);
  }

  return (
    <Layout>
      <div className="yield-predict-page">
        <h2>Yield Prediction</h2>

        <div className="yield-grid">
          <Card className="yield-form-card">
            <h3 className="card-title">Input Parameters</h3>

            <form className="yield-form" onSubmit={handleSubmit}>
              <div className="row">
                <select name="crop_type" value={form.crop_type} onChange={handleChange}>
                  <option value="">Select crop</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="maize">Maize</option>
                  <option value="millet">Millet</option>
                  <option value="sugarcane">Sugarcane</option>
                </select>

                <select name="soil_type" value={form.soil_type} onChange={handleChange}>
                  <option value="">Select soil</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="silty">Silty</option>
                  <option value="chalky">Chalky</option>
                </select>
              </div>

              <div className="row">
                <input 
                  type="number"
                  name="rainfall" 
                  value={form.rainfall} 
                  onChange={handleChange} 
                  placeholder="Rainfall (mm)" 
                />
                <input 
                  type="number"
                  name="humidity" 
                  value={form.humidity} 
                  onChange={handleChange} 
                  placeholder="Humidity (%)" 
                />
              </div>

              <div className="row">
                <input 
                  type="number"
                  name="temperature" 
                  value={form.temperature} 
                  onChange={handleChange} 
                  placeholder="Temperature (°C)" 
                />
                <input 
                  type="number"
                  name="moisture" 
                  value={form.moisture} 
                  onChange={handleChange} 
                  placeholder="Soil moisture (%)" 
                />
              </div>

              <div className="row">
                <input 
                  type="number"
                  name="nitrogen" 
                  value={form.nitrogen} 
                  onChange={handleChange} 
                  placeholder="Nitrogen (N)" 
                />
                <input 
                  type="number"
                  name="phosphorus" 
                  value={form.phosphorus} 
                  onChange={handleChange} 
                  placeholder="Phosphorus (P)" 
                />
              </div>

              <div className="row">
                <input 
                  type="number"
                  name="potassium" 
                  value={form.potassium} 
                  onChange={handleChange} 
                  placeholder="Potassium (K)" 
                />
              </div>

              {error && <div className="error-box">{error}</div>}

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? "⏳ Predicting..." : "🔮 Predict"}
                </button>
                <button type="button" className="btn secondary" onClick={resetForm} disabled={loading}>
                  🔄 Reset
                </button>
              </div>
            </form>
          </Card>

          <Card className="yield-result-card">
            <h3 className="card-title">Result</h3>

            {!result && <p className="placeholder-text">Prediction output will appear here</p>}

            {result !== null && (
              <div style={{ textAlign: "center" }}>
                <p className="result-value">{result}</p>
                <p style={{ color: "#6b7280" }}>kg per hectare (kg/ha)</p>
              </div>
            )}

            <hr />

            <h4>Recent Predictions</h4>
            <div className="history-list">
              {history.length === 0 && <div className="placeholder-text">No predictions yet</div>}
              {history.map((h, i) => (
                <div key={i} className="history-item">
                  <div><strong>{h.value} kg/ha</strong></div>
                  <div className="muted">{h.ts}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}