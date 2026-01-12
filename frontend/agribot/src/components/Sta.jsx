// src/components/StatCard.jsx
import Card from "./Card";
import "../styles/StatCard.css";

// Soil Health Card
export function SoilHealthCard({ 
  status = "Good", 
  moisture = 23,
  ph = 6.5,
  nitrogen = "Medium",
  organic = "High"
}) {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case "excellent": return "#2e7d32";
      case "good": return "#4caf50";
      case "fair": return "#f9a825";
      case "poor": return "#f44336";
      default: return "#4caf50";
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <Card className="info-card soil-card">
      {/* Icon */}
      <div className="card-icon" style={{ background: "rgba(76, 175, 80, 0.1)" }}>
        🌾
      </div>

      {/* Status */}
      <h2 className="card-main-title" style={{ color: statusColor }}>
        {status}
      </h2>
      <p className="card-subtitle">SOIL HEALTH</p>

      {/* Metrics */}
      <div className="card-metrics">
        <div className="metric-item">
          <div className="metric-label">💧 Moisture</div>
          <div className="metric-value">{moisture}%</div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill" 
              style={{ 
                width: `${moisture}%`,
                background: moisture > 20 ? "#4caf50" : "#f9a825"
              }}
            />
          </div>
        </div>

        <div className="metric-item">
          <div className="metric-label">🧪 pH Level</div>
          <div className="metric-value">{ph}</div>
          <div className="metric-status">
            {ph >= 6 && ph <= 7 ? "✓ Optimal" : "⚠ Adjust"}
          </div>
        </div>

        <div className="metric-row">
          <div className="metric-badge">
            <span>🍃 N: {nitrogen}</span>
          </div>
          <div className="metric-badge">
            <span>🌱 Organic: {organic}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="card-action-btn">View Full Report</button>
    </Card>
  );
}

// Crop Recommendation Card
export function CropRecommendationCard({ 
  crop = "Tomato",
  confidence = 87,
  reason = "Based on current soil & weather",
  alternativeCrops = ["Pepper", "Eggplant"]
}) {
  return (
    <Card className="info-card crop-card">
      {/* Icon */}
      <div className="card-icon" style={{ background: "rgba(244, 67, 54, 0.1)" }}>
        🍅
      </div>

      {/* Crop Name */}
      <h2 className="card-main-title">{crop}</h2>
      <p className="card-subtitle">RECOMMENDED CROP</p>

      {/* Confidence Score */}
      <div className="confidence-section">
        <div className="confidence-header">
          <span>Confidence Score</span>
          <span className="confidence-value">{confidence}%</span>
        </div>
        <div className="confidence-bar">
          <div 
            className="confidence-bar-fill" 
            style={{ 
              width: `${confidence}%`,
              background: confidence > 80 ? "#4caf50" : confidence > 60 ? "#f9a825" : "#f44336"
            }}
          />
        </div>
      </div>

      {/* Reason */}
      <div className="card-info-box">
        <div className="info-icon">💡</div>
        <p className="info-text">{reason}</p>
      </div>

      {/* Alternative Crops */}
      {alternativeCrops.length > 0 && (
        <div className="alternatives-section">
          <div className="alternatives-label">Alternative options:</div>
          <div className="alternatives-list">
            {alternativeCrops.map((altCrop, index) => (
              <span key={index} className="alternative-badge">
                {altCrop}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button className="card-action-btn secondary">Get Planting Guide</button>
    </Card>
  );
}