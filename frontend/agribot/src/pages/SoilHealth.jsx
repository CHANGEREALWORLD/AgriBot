// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// export default function SoilHealth() {
//   const [form, setForm] = useState({
//     soil_type: "loamy",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     moisture: "",
//     ph: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function analyze() {
//     setError("");
//     setResult(null);

//     try {
//       const payload = {
//         soil_type: form.soil_type,
//         nitrogen: Number(form.nitrogen),
//         phosphorus: Number(form.phosphorus),
//         potassium: Number(form.potassium),
//         moisture: Number(form.moisture),
//         ph: Number(form.ph),
//       };

//       const res = await post("/soil/analyze", payload);
//       setResult(res);
//     } catch (err) {
//       setError("Failed to analyze soil");
//     }
//   }

//   return (
//     <Layout>
//       <h2>Soil Health Analysis</h2>

//       <div className="card">
//         <select name="soil_type" value={form.soil_type} onChange={handleChange}>
//           <option value="sandy">Sandy</option>
//           <option value="loamy">Loamy</option>
//           <option value="clay">Clay</option>
//           <option value="silty">Silty</option>
//         </select>

//         <input name="nitrogen" placeholder="Nitrogen (N)" onChange={handleChange} />
//         <input name="phosphorus" placeholder="Phosphorus (P)" onChange={handleChange} />
//         <input name="potassium" placeholder="Potassium (K)" onChange={handleChange} />
//         <input name="moisture" placeholder="Moisture (%)" onChange={handleChange} />
//         <input name="ph" placeholder="pH value" onChange={handleChange} />

//         <button onClick={analyze}>Analyze Soil</button>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {result && (
//           <div style={{ marginTop: 20 }}>
//             <h3>Soil Health: {result.health}</h3>

//             <div style={{ margin: "10px 0" }}>
//               <strong>Confidence: {result.confidence}%</strong>
//               <div style={{
//                 height: 8,
//                 background: "#eee",
//                 borderRadius: 6,
//                 marginTop: 4
//               }}>
//                 <div style={{
//                   width: `${result.confidence}%`,
//                   height: "100%",
//                   background: "#2e7d32",
//                   borderRadius: 6
//                 }} />
//               </div>
//             </div>

//             <h4>Why this result?</h4>
//             <ul>
//               {result.reasons.map((r, i) => (
//                 <li key={i}>{r}</li>
//               ))}
//             </ul>

//             {result.suggestions.length > 0 && (
//               <>
//                 <h4>Suggestions</h4>
//                 <ul>
//                   {result.suggestions.map((s, i) => (
//                     <li key={i}>{s}</li>
//                   ))}
//                 </ul>
//               </>
//             )}
            
            
//           </div>
//         )}
//         <h4>Input Summary</h4>
//         <ul style={{ color: "#555" }}>
//         <li>Soil type: {form.soil_type}</li>
//         <li>Nitrogen (N): {form.nitrogen}</li>
//         <li>Phosphorus (P): {form.phosphorus}</li>
//         <li>Potassium (K): {form.potassium}</li>
//         <li>Moisture: {form.moisture}%</li>
//         <li>pH value: {form.ph}</li>
//         </ul>

//       </div>
//     </Layout>
//   );
// }



import { useState } from "react";
import Layout from "../layout/Layout";
import { post } from "../utils/api";
import "../styles/SoilHealth.css";

export default function SoilHealth() {
  const [form, setForm] = useState({
    soil_type: "loamy",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    moisture: "",
    ph: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function analyze() {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const payload = {
        soil_type: form.soil_type,
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
        moisture: Number(form.moisture),
        ph: Number(form.ph),
      };

      const res = await post("/soil/analyze", payload);
      setResult(res);
    } catch (err) {
      setError("Failed to analyze soil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="soil-health-page">
        <h2>Soil Health Analysis</h2>

        <div className="soil-health-grid">
          {/* FORM CARD */}
          <div className="soil-form-card">
            <h3>Input Parameters</h3>

            <div className="soil-form-group">
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
              <div className="soil-form-group">
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

              <div className="soil-form-group">
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

              <div className="soil-form-group">
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

            <div className="moisture-ph-grid">
              <div className="soil-form-group">
                <label htmlFor="moisture">Moisture (%)</label>
                <input 
                  id="moisture"
                  type="number"
                  name="moisture" 
                  placeholder="e.g., 25"
                  value={form.moisture}
                  onChange={handleChange} 
                />
              </div>

              <div className="soil-form-group">
                <label htmlFor="ph">pH Value</label>
                <input 
                  id="ph"
                  type="number"
                  step="0.1"
                  name="ph" 
                  placeholder="e.g., 6.5"
                  value={form.ph}
                  onChange={handleChange} 
                />
              </div>
            </div>

            <button 
              className="analyze-btn" 
              onClick={analyze}
              disabled={loading}
            >
              {loading ? "🔄 Analyzing..." : "🔬 Analyze Soil"}
            </button>

            {error && <div className="soil-error-message">{error}</div>}

            {/* INPUT SUMMARY - Always visible */}
            <div className="input-summary-section" style={{ marginTop: 24 }}>
              <h4>Input Summary</h4>
              <ul className="input-summary-list">
                <li>
                  Soil Type: <strong>{form.soil_type || '-'}</strong>
                </li>
                <li>
                  Nitrogen: <strong>{form.nitrogen || '-'}</strong>
                </li>
                <li>
                  Phosphorus: <strong>{form.phosphorus || '-'}</strong>
                </li>
                <li>
                  Potassium: <strong>{form.potassium || '-'}</strong>
                </li>
                <li>
                  Moisture: <strong>{form.moisture ? `${form.moisture}%` : '-'}</strong>
                </li>
                <li>
                  pH Value: <strong>{form.ph || '-'}</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* RESULT CARD */}
          <div className="soil-result-card">
            {!result ? (
              <div className="result-placeholder">
                <p>Analysis results will appear here</p>
              </div>
            ) : (
              <>
                {/* Health Status */}
                <div className="health-status">
                  <h3>Soil Health Status</h3>
                  <div className={`health-value ${result.health.toLowerCase()}`}>
                    {result.health}
                  </div>
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
                  <h4>Why this result?</h4>
                  <ul className="reasons-list">
                    {result.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                {result.suggestions && result.suggestions.length > 0 && (
                  <div className="suggestions-section">
                    <h4>Recommendations</h4>
                    <ul className="suggestions-list">
                      {result.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

