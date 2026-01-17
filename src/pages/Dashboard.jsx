import { useState } from "react";
import Layout from "../layout/Layout";
import WeatherCard from "../components/WeatherCard";
import ChartCard from "../components/ChartCard";
import { SoilHealthCard, CropRecommendationCard } from "../components/StatCard";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Handler for Soil Health Report button
  const handleViewReport = () => {
    console.log("✅ View Full Report button clicked!");
    setModalContent(`
      📊 SOIL HEALTH FULL REPORT
      
      Status: Good
      Moisture Level: 23%
      pH Level: 6.5
      Nitrogen: Medium
      Organic Matter: High
      
      Recommendations:
      • Maintain current moisture levels
      • Consider adding organic compost
      • Monitor pH levels weekly
    `);
    setShowModal(true);
  };

  // Handler for Planting Guide button
  const handleGetGuide = (cropName) => {
    console.log(`✅ Get Planting Guide clicked for: ${cropName}`);
    setModalContent(`
      🌱 PLANTING GUIDE: ${cropName.toUpperCase()}
      
      Best Planting Time: March-May
      Soil Preparation:
      • pH: 6.0-6.8
      • Well-drained soil
      • Add compost 2 weeks before planting
      
      Watering Schedule:
      • Water deeply 2-3 times per week
      • Increase during fruiting stage
      
      Expected Harvest: 60-80 days
      
      Tips:
      • Plant after last frost
      • Space plants 24-36 inches apart
      • Support with stakes or cages
    `);
    setShowModal(true);
  };

  // Handler for alternative crop selection
  const handleSelectCrop = (cropName) => {
    console.log(`✅ Alternative crop selected: ${cropName}`);
    setSelectedCrop(cropName);
    setModalContent(`
      🔄 CROP CHANGED
      
      You selected: ${cropName}
      
      This crop is also suitable based on your current soil and weather conditions.
      
      Would you like to see the planting guide for ${cropName}?
    `);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Top Cards Section */}
        <section className="top-cards">
          <WeatherCard 
            temp="29°C"
            condition="Partly Cloudy"
            humidity={62}
            wind={6}
          />

          <SoilHealthCard 
            status="Good"
            moisture={23}
            ph={6.5}
            nitrogen="Medium"
            organic="High"
            onViewReport={handleViewReport}
          />

          <CropRecommendationCard 
            crop={selectedCrop}
            confidence={87}
            reason="Based on current soil & weather"
            alternativeCrops={["Pepper", "Eggplant", "Cucumber"]}
            onGetGuide={handleGetGuide}
            onSelectCrop={handleSelectCrop}
          />
        </section>

        {/* Middle Area with Chart and Summary */}
        <section className="middle-area">
          <div className="left-col">
            <ChartCard />
          </div>

          <aside className="right-col">
            {/* Today's Summary Card */}
            <div className="card summary-card large-summary">
              <h4 className="card-title">Today's Summary</h4>

              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Temp</span>
                  <span className="value">29°C</span>
                </div>

                <div className="summary-item">
                  <span className="label">Humidity</span>
                  <span className="value">62%</span>
                </div>

                <div className="summary-item">
                  <span className="label">Rainfall</span>
                  <span className="value">3mm</span>
                </div>

                <div className="summary-item">
                  <span className="label">Soil Health</span>
                  <span className="value">Good</span>
                </div>

                <div className="summary-item">
                  <span className="label">Wind</span>
                  <span className="value">6 km/h</span>
                </div>

                <div className="summary-item">
                  <span className="label">Sunlight</span>
                  <span className="value">8 hrs</span>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="card activity-card">
              <h4 className="card-title">Recent Activity</h4>

              <ul className="activity-list">
                <li onClick={() => alert("Sensor sync details")}>
                  Sensor sync • 10m ago
                </li>
                <li onClick={() => alert("Model update details")}>
                  Model updated • 2d ago
                </li>
                <li onClick={() => alert("Soil moisture details")}>
                  Soil moisture increased • 4h ago
                </li>
                <li onClick={() => alert("Crop recommendation details")}>
                  Crop recommendation refreshed • 1h ago
                </li>
              </ul>
            </div>
          </aside>
        </section>

        {/* Modal for displaying information */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
              <pre className="modal-text">{modalContent}</pre>
              <button className="modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}