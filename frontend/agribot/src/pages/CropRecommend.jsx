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