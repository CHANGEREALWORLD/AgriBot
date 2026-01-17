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