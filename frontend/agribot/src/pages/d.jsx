// // src/pages/Dashboard.jsx
import Layout from "../layout/Layout";
import StatCard from "../components/StatCard";
import WeatherCard from "../components/WeatherCard";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  return (
    <Layout>
      <section className="top-cards">
        <WeatherCard temp="29°C" condition="Partly Cloudy" />
        <StatCard
          icon="🌾"
          title="Soil Health"
          value="Good"
          subtitle="Avg moisture 23%"
        />
        <StatCard
          icon="🧪"
          title="Recommended Crop"
          value="Tomato"
          subtitle="Based on current soil & weather"
        />
      </section>

      <section className="middle-area">
        <div className="left-col">
          <ChartCard />
        </div>
{/* 
        <aside className="right-col">
          <div className="card summary-card">
            <h4 className="card-title">Quick Summary</h4>
            <ul className="summary-list">
              <li>Temperature: 29°C</li>
              <li>Humidity: 62%</li>
              <li>Rainfall: 3mm (today)</li>
              <li>Alerts: None</li>
            </ul>
          </div>

          <div className="card small-card">
            <h4 className="card-title">Recent Activity</h4>
            <ul className="summary-list">
              <li>Sensor sync • 10m ago</li>
              <li>Model updated • 2d ago</li>
            </ul>
          </div>
        </aside> */}
        <aside className="right-col">

  <div className="card summary-card large-summary">
    <h4 className="card-title">Today’s Summary</h4>

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
    </Layout>
  );
}


// import { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import WeatherCard from "../components/WeatherCard";
// import StatCard from "../components/StatCard";
// import ChartCard from "../components/ChartCard";
// import { post } from "../utils/api";

// export default function Dashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/dashboard/summary")
//       .then(res => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//    // 🔐 IMPORTANT GUARD
//   if (!data) {
//     return (
//       <Layout>
//         <p style={{ padding: 20 }}>Loading dashboard data…</p>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <section className="top-cards">
//         <WeatherCard
//           temp={`${data.weather.temperature}°C`}
//           condition={data.weather.condition}
//           meta={`Humidity ${data.weather.humidity}% • Wind ${data.weather.wind} km/h`}
//         />

//         <StatCard
//           icon="🌾"
//           title="Soil Health"
//           value={data.soil.health}
//           subtitle={`Avg moisture ${data.soil.moisture}%`}
//         />

//         <StatCard
//           icon="🧪"
//           title="Recommended Crop"
//           value={data.crop.name}
//           subtitle={`Confidence ${data.crop.confidence}%`}
//         />
//       </section>

//       <section className="middle-area">
//         <ChartCard data={data.yield_trend} />
//       </section>
//     </Layout>
//   );
// }




// import { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import WeatherCard from "../components/WeatherCard";
// import StatCard from "../components/StatCard";
// import ChartCard from "../components/ChartCard";

// export default function Dashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/dashboard/summary")
//       .then(res => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   if (!data) {
//     return (
//       <Layout>
//         <p style={{ padding: 30 }}>Loading dashboard…</p>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="dashboard">

//         {/* 🌦 Weather */}
//         <section className="dashboard-hero">
//           <WeatherCard
//             temp={`${data.weather.temperature}°C`}
//             condition={data.weather.condition}
//             meta={`Humidity ${data.weather.humidity}% • Wind ${data.weather.wind} km/h`}
//           />
//         </section>

//         {/* 📊 Stats */}
//         <section className="dashboard-stats">
//           <StatCard
//             icon="🌾"
//             title="Soil Health"
//             value={data.soil.health}
//             subtitle={`Moisture ${data.soil.moisture}%`}
//           />

//           <StatCard
//             icon="🧪"
//             title="Recommended Crop"
//             value={data.crop.name}
//             subtitle={`Confidence ${data.crop.confidence}%`}
//           />
//         </section>

//         {/* 📈 Chart */}
//         <section className="dashboard-chart">
//           <ChartCard data={data.yield_trend} />
//         </section>

//       </div>
//     </Layout>
//   );
// }
