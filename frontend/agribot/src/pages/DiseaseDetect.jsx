import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { post } from "../utils/api";
import { saveHistory, loadHistory } from "../utils/history";
import "../styles/DiseaseDetect.css";

function formatLabel(text) {
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function confidenceColor(value) {
  if (value >= 70) return "#2e7d32"; // green
  if (value >= 50) return "#f9a825"; // orange
  return "#c62828"; // red
}

const SYMPTOMS = [
  "leaf_spots",
  "yellowing",
  "wilting",
  "dry_edges",
  "white_powder",
  "stunted_growth",
  "root_decay",
  "brown_patches",
  "stem_darkening",
];

export default function DiseaseDetect() {
  // State management
  const [crop, setCrop] = useState("");
  const [severity, setSeverity] = useState("mild");
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load history on component mount
  useEffect(() => {
    setHistory(loadHistory("disease"));
  }, []);

  function toggleSymptom(s) {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function detectDisease() {
    setError("");
    setResult(null);

    if (!crop || symptoms.length === 0) {
      setError("Please enter crop name and select at least one symptom");
      return;
    }

    setLoading(true);
    try {
      const res = await post("/disease/detect", {
        crop_name: crop,
        symptoms,
        severity,
      });
      setResult(res);
      
      // Save to history
      saveHistory("disease", {
        crop,
        severity,
        symptoms,
        disease: res.predicted_disease,
        confidence: res.confidence,
        imageUsed: Boolean(image),
      });
      setHistory(loadHistory("disease"));
    } catch (e) {
      setError("Failed to detect disease. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="disease-detect-container">
        <h2>🌱 Disease Detection</h2>

        <div className="card">
          <label>Crop Name</label>
          <input
            type="text"
            placeholder="Enter crop name (e.g., Tomato, Wheat, Rice)"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          />

          <div style={{ marginTop: 14 }}>
            <label>Upload Leaf Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: "block", marginTop: 6 }}
            />

            {preview && (
              <img
                src={preview}
                alt="Leaf preview"
                className="image-preview"
              />
            )}
          </div>

          <label>Severity Level</label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>

          <h4>Select Symptoms</h4>
          <div className="symptoms-grid">
            {SYMPTOMS.map((s) => (
              <label key={s}>
                <input
                  type="checkbox"
                  checked={symptoms.includes(s)}
                  onChange={() => toggleSymptom(s)}
                />
                <span>{formatLabel(s)}</span>
              </label>
            ))}
          </div>

          <button onClick={detectDisease} disabled={loading}>
            {loading ? "Analyzing..." : "🔍 Detect Disease"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>

        {result && (
          <div className="card result-card">
            {/* Disease Title */}
            <h2>{result.predicted_disease}</h2>

            {/* Confidence Bar */}
            <div className="confidence-container">
              <strong>Confidence: {result.confidence}%</strong>
              <div className="confidence-bar-bg">
                <div
                  className="confidence-bar-fill"
                  style={{
                    width: `${result.confidence}%`,
                    background: confidenceColor(result.confidence),
                  }}
                />
              </div>
            </div>

            {/* Reasons */}
            <h4>Why this disease?</h4>
            <ul>
              {result.reason_points.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            {/* Treatment */}
            {result.treatment && result.treatment.length > 0 && (
              <>
                <h4>💊 Treatment</h4>
                <ul>
                  {result.treatment.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Prevention */}
            {result.prevention && result.prevention.length > 0 && (
              <>
                <h4>🛡️ Prevention</h4>
                <ul>
                  {result.prevention.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Input Summary */}
            <div className="input-summary">
              <strong>Input Summary</strong>
              <p><strong>Crop:</strong> {crop}</p>
              <p><strong>Severity:</strong> {formatLabel(severity)}</p>
              <p><strong>Symptoms:</strong> {symptoms.map(formatLabel).join(", ")}</p>
              {image && <p><strong>Image:</strong> Uploaded ✓</p>}
            </div>

            {/* Disclaimer */}
            {result.disclaimer && (
              <div className="disclaimer">
                ⚠️ {result.disclaimer}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

