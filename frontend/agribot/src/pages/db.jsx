import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import WeatherCard from "../components/WeatherCard";
import ChartCard from "../components/ChartCard";
import { SoilHealthCard, CropRecommendationCard } from "../components/Sta";
import "../styles/Dashboard.css";

export default function Dashboard() {
  // If you're using React Router, you can navigate programmatically
  // const navigate = useNavigate();

  // Handler for Soil Health Report button
  const handleViewReport = () => {
    console.log("View Soil Health Report clicked");
    // navigate('/soil-health'); // Uncomment if using React Router
    alert("Opening Soil Health Report...");
  };

  // Handler for Planting Guide button
  const handleGetGuide = (cropName) => {
    console.log(`Get Planting Guide for ${cropName}`);
    // navigate(`/planting-guide/${cropName}`); // Uncomment if using React Router
    alert(`Opening Planting Guide for ${cropName}...`);
  };

  // Handler for alternative crop selection
  const handleSelectCrop = (cropName) => {
    console.log(`Alternative crop selected: ${cropName}`);
    alert(`You selected ${cropName}. Would you like to see details?`);
    // You could update state here to show new crop recommendation
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
            crop="Tomato"
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
                <li onClick={() => console.log("Activity clicked")}>
                  Sensor sync • 10m ago
                </li>
                <li onClick={() => console.log("Activity clicked")}>
                  Model updated • 2d ago
                </li>
                <li onClick={() => console.log("Activity clicked")}>
                  Soil moisture increased • 4h ago
                </li>
                <li onClick={() => console.log("Activity clicked")}>
                  Crop recommendation refreshed • 1h ago
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </Layout>
  );
}