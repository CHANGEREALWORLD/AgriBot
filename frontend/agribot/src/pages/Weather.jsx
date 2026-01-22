// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// function alertColor(text) {
//   if (text.includes("ideal")) return "#2e7d32";
//   if (text.includes("below") || text.includes("above")) return "#f57c00";
//   return "#c62828";
// }

// export default function Weather() {
//   const [form, setForm] = useState({
//     crop: "rice",
//     temperature: "",
//     rainfall: "",
//     humidity: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function analyzeWeather() {
//     setError("");
//     setResult(null);

//     if (!form.temperature || !form.rainfall || !form.humidity) {
//       setError("Please fill all weather values");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await post("/weather/analyze", {
//         crop: form.crop,
//         temperature: Number(form.temperature),
//         rainfall: Number(form.rainfall),
//         humidity: Number(form.humidity),
//       });
//       setResult(res);
//     } catch (e) {
//       setError("Weather analysis failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Weather & Crop Suitability</h2>

//       <div className="card">
//         <label>Crop</label>
//         <select name="crop" value={form.crop} onChange={handleChange}>
//           <option value="rice">Rice</option>
//           <option value="wheat">Wheat</option>
//           <option value="maize">Maize</option>
//           <option value="millet">Millet</option>
//         </select>

//         <input
//           name="temperature"
//           placeholder="Temperature (°C)"
//           onChange={handleChange}
//         />
//         <input
//           name="rainfall"
//           placeholder="Rainfall (mm)"
//           onChange={handleChange}
//         />
//         <input
//           name="humidity"
//           placeholder="Humidity (%)"
//           onChange={handleChange}
//         />

//         <button onClick={analyzeWeather} disabled={loading}>
//           {loading ? "Analyzing..." : "Analyze Weather"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card" style={{ marginTop: 24 }}>
//           <h3>
//             Suitability:{" "}
//             <span
//               style={{
//                 color: result.suitable ? "#2e7d32" : "#c62828",
//               }}
//             >
//               {result.suitable ? "Suitable" : "Not Suitable"}
//             </span>
//           </h3>

//           <div style={{ margin: "10px 0" }}>
//             <strong>Confidence: {result.confidence}%</strong>
//             <div
//               style={{
//                 height: 8,
//                 background: "#eee",
//                 borderRadius: 6,
//                 marginTop: 4,
//               }}
//             >
//               <div
//                 style={{
//                   width: `${result.confidence}%`,
//                   height: "100%",
//                   background: "#2e7d32",
//                   borderRadius: 6,
//                 }}
//               />
//             </div>
//           </div>

//           <h4>Weather Insights</h4>
//           <ul>
//             {result.alerts.map((a, i) => (
//               <li key={i} style={{ color: alertColor(a) }}>
//                 {a}
//               </li>
//             ))}
//           </ul>

//           <div
//             style={{
//               marginTop: 16,
//               padding: 12,
//               background: "#f7f7f7",
//               borderRadius: 8,
//               fontSize: 14,
//             }}
//           >
//             <strong>Input Summary</strong>
//             <p>Crop: {form.crop}</p>
//             <p>Temperature: {form.temperature} °C</p>
//             <p>Rainfall: {form.rainfall} mm</p>
//             <p>Humidity: {form.humidity} %</p>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }


// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";
// import "../styles/Weather.css";

// function alertColor(text) {
//   if (text.includes("ideal")) return "ideal";
//   if (text.includes("below") || text.includes("above")) return "warning";
//   return "danger";
// }

// function getConfidenceClass(confidence) {
//   if (confidence >= 75) return "high";
//   if (confidence >= 50) return "medium";
//   return "low";
// }

// export default function Weather() {
//   const [form, setForm] = useState({
//     crop: "rice",
//     temperature: "",
//     rainfall: "",
//     humidity: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function analyzeWeather() {
//     setError("");
//     setResult(null);

//     if (!form.temperature || !form.rainfall || !form.humidity) {
//       setError("Please fill all weather values");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await post("/weather/analyze", {
//         crop: form.crop,
//         temperature: Number(form.temperature),
//         rainfall: Number(form.rainfall),
//         humidity: Number(form.humidity),
//       });
//       setResult(res);
//     } catch (e) {
//       setError("Weather analysis failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <div className="weather-container">
//         <h2>🌤️ Weather & Crop Suitability</h2>

//         <div className="card">
//           <label>Select Crop</label>
//           <select name="crop" value={form.crop} onChange={handleChange}>
//             <option value="rice">🌾 Rice</option>
//             <option value="wheat">🌾 Wheat</option>
//             <option value="maize">🌽 Maize</option>
//             <option value="millet">🌾 Millet</option>
//           </select>

//           <label>Temperature</label>
//           <input
//             type="number"
//             name="temperature"
//             placeholder="Enter temperature (°C)"
//             value={form.temperature}
//             onChange={handleChange}
//           />

//           <label>Rainfall</label>
//           <input
//             type="number"
//             name="rainfall"
//             placeholder="Enter rainfall (mm)"
//             value={form.rainfall}
//             onChange={handleChange}
//           />

//           <label>Humidity</label>
//           <input
//             type="number"
//             name="humidity"
//             placeholder="Enter humidity (%)"
//             value={form.humidity}
//             onChange={handleChange}
//           />

//           <button onClick={analyzeWeather} disabled={loading}>
//             {loading ? "Analyzing..." : "🔍 Analyze Weather"}
//           </button>

//           {error && <p className="error-message">{error}</p>}
//         </div>

//         {result && (
//           <div className="card weather-result-card">
//             {/* Suitability Header */}
//             <div className="suitability-header">
//               Suitability:
//               <span
//                 className={`suitability-badge ${
//                   result.suitable ? "suitable" : "not-suitable"
//                 }`}
//               >
//                 {result.suitable ? "✓ Suitable" : "✗ Not Suitable"}
//               </span>
//             </div>

//             {/* Confidence Bar */}
//             <div className="confidence-section">
//               <strong>Confidence Score: {result.confidence}%</strong>
//               <div className="confidence-bar-bg">
//                 <div
//                   className={`confidence-bar-fill ${getConfidenceClass(
//                     result.confidence
//                   )}`}
//                   style={{ width: `${result.confidence}%` }}
//                 />
//               </div>
//             </div>

//             {/* Weather Insights */}
//             <h4>
//               <span className="weather-icon">📊</span>
//               Weather Insights
//             </h4>
//             <ul className="weather-alerts-list">
//               {result.alerts.map((a, i) => (
//                 <li key={i} className={alertColor(a)}>
//                   {a}
//                 </li>
//               ))}
//             </ul>

//             {/* Input Summary */}
//             <div className="input-summary-box">
//               <strong>📋 Input Summary</strong>
//               <p>
//                 <strong>Crop:</strong>
//                 <span>{form.crop.charAt(0).toUpperCase() + form.crop.slice(1)}</span>
//               </p>
//               <p>
//                 <strong>Temperature:</strong>
//                 <span>{form.temperature} °C</span>
//               </p>
//               <p>
//                 <strong>Rainfall:</strong>
//                 <span>{form.rainfall} mm</span>
//               </p>
//               <p>
//                 <strong>Humidity:</strong>
//                 <span>{form.humidity} %</span>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }



import { useState } from "react";
import Layout from "../layout/Layout";
import { post } from "../utils/api";
import "../styles/Weather.css";

function getAlertClass(text) {
  if (text.toLowerCase().includes("ideal") || text.toLowerCase().includes("perfect") || text.toLowerCase().includes("good")) {
    return "ideal";
  }
  if (text.toLowerCase().includes("below") || text.toLowerCase().includes("above") || text.toLowerCase().includes("moderate")) {
    return "warning";
  }
  return "danger";
}

function getConfidenceClass(confidence) {
  if (confidence >= 75) return "high";
  if (confidence >= 50) return "medium";
  return "low";
}

export default function Weather() {
  const [form, setForm] = useState({
    crop: "rice",
    temperature: "",
    rainfall: "",
    humidity: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function analyzeWeather() {
    setError("");
    setResult(null);

    if (!form.temperature || !form.rainfall || !form.humidity) {
      setError("Please fill all weather values");
      return;
    }

    // Validate numeric values
    const temp = Number(form.temperature);
    const rain = Number(form.rainfall);
    const hum = Number(form.humidity);

    if (isNaN(temp) || isNaN(rain) || isNaN(hum)) {
      setError("Please enter valid numeric values");
      return;
    }

    if (hum < 0 || hum > 100) {
      setError("Humidity must be between 0 and 100");
      return;
    }

    setLoading(true);
    try {
      const res = await post("/weather/analyze", {
        crop: form.crop,
        temperature: temp,
        rainfall: rain,
        humidity: hum,
      });
      setResult(res);
    } catch (e) {
      setError("Weather analysis failed. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      crop: "rice",
      temperature: "",
      rainfall: "",
      humidity: "",
    });
    setResult(null);
    setError("");
  }

  return (
    <Layout>
      <div className="weather-container">
        <h2>Weather & Crop Suitability Analysis</h2>

        <div className="card">
          <div className="form-group">
            <label htmlFor="crop">Crop Type</label>
            <select 
              id="crop"
              name="crop" 
              value={form.crop} 
              onChange={handleChange}
            >
              <option value="rice">Rice</option>
              <option value="wheat">Wheat</option>
              <option value="maize">Maize</option>
              <option value="millet">Millet</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="temperature">Temperature (°C)</label>
            <input
              id="temperature"
              type="number"
              name="temperature"
              placeholder="e.g., 28"
              value={form.temperature}
              onChange={handleChange}
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rainfall">Rainfall (mm)</label>
            <input
              id="rainfall"
              type="number"
              name="rainfall"
              placeholder="e.g., 150"
              value={form.rainfall}
              onChange={handleChange}
              step="0.1"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="humidity">Humidity (%)</label>
            <input
              id="humidity"
              type="number"
              name="humidity"
              placeholder="e.g., 75"
              value={form.humidity}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="100"
            />
          </div>

          <div className="button-group">
            <button 
              className="btn-primary" 
              onClick={analyzeWeather} 
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Weather"}
            </button>
            
            {(form.temperature || form.rainfall || form.humidity || result) && (
              <button 
                className="btn-secondary" 
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </button>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        {result && (
          <div className="card weather-result-card">
            <div className="result-header">
              <div className="suitability-section">
                <h3>Crop Suitability</h3>
                <div
                  className={`suitability-badge ${
                    result.suitable ? "suitable" : "not-suitable"
                  }`}
                >
                  {result.suitable ? (
                    <>
                      <span className="badge-icon">✓</span>
                      <span>Suitable</span>
                    </>
                  ) : (
                    <>
                      <span className="badge-icon">✗</span>
                      <span>Not Suitable</span>
                    </>
                  )}
                </div>
              </div>

              <div className="confidence-section">
                <div className="confidence-label">
                  <strong>Confidence Level</strong>
                  <span className="confidence-value">{result.confidence}%</span>
                </div>
                <div className="confidence-bar-bg">
                  <div
                    className={`confidence-bar-fill ${getConfidenceClass(
                      result.confidence
                    )}`}
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="weather-insights">
              <h4>Weather Insights & Recommendations</h4>
              {result.alerts && result.alerts.length > 0 ? (
                <ul className="weather-alerts-list">
                  {result.alerts.map((alert, i) => (
                    <li key={i} className={getAlertClass(alert)}>
                      {alert}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No weather insights available.</p>
              )}
            </div>

            <div className="input-summary-box">
              <h4>Analysis Parameters</h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Crop</span>
                  <span className="summary-value">
                    {form.crop.charAt(0).toUpperCase() + form.crop.slice(1)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Temperature</span>
                  <span className="summary-value">{form.temperature}°C</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Rainfall</span>
                  <span className="summary-value">{form.rainfall} mm</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Humidity</span>
                  <span className="summary-value">{form.humidity}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}