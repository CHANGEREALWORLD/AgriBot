import Layout from "../layout/Layout";
import WeatherCard from "../components/WeatherCard";
import ChartCard from "../components/ChartCard";
import { SoilHealthCard, CropRecommendationCard } from "../components/Sta";
import "../styles/Dashboard.css";

export default function Dashboard() {
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
          />

          <CropRecommendationCard 
            crop="Tomato"
            confidence={87}
            reason="Based on current soil & weather"
            alternativeCrops={["Pepper", "Eggplant", "Cucumber"]}
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
                <li>Sensor sync • 10m ago</li>
                <li>Model updated • 2d ago</li>
                <li>Soil moisture increased • 4h ago</li>
                <li>Crop recommendation refreshed • 1h ago</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </Layout>
  );
}