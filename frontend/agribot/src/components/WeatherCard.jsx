// src/components/WeatherCard.jsx
// import Card from "./Card";

// export default function WeatherCard({ temp = "28°C", condition = "Sunny" }) {
//   return (
//     <Card className="weather-card">
//       <div className="weather-top">
//         <div className="weather-temp">{temp}</div>
//         <div className="weather-cond">{condition}</div>
//       </div>
//       <div className="weather-bottom">
//         <div>Humidity: 62%</div>
//         <div>Wind: 6 km/h</div>
//       </div>
//     </Card>
//   );
// }


// import { useState, useEffect } from "react";
// import Card from "./Card";
// import "../styles/WeatherCard.css";

// // Weather icon mapping
// const weatherIcons = {
//   sunny: "☀️",
//   clear: "☀️",
//   cloudy: "☁️",
//   "partly cloudy": "⛅",
//   rainy: "🌧️",
//   rain: "🌧️",
//   stormy: "⛈️",
//   storm: "⛈️",
//   snowy: "❄️",
//   snow: "❄️",
//   windy: "💨",
//   foggy: "🌫️",
//   default: "🌤️"
// };

// // Get theme class based on condition
// const getWeatherTheme = (condition) => {
//   const lower = condition.toLowerCase();
//   if (lower.includes("sun") || lower.includes("clear")) return "sunny";
//   if (lower.includes("rain")) return "rainy";
//   if (lower.includes("cloud")) return "cloudy";
//   if (lower.includes("storm")) return "stormy";
//   return "";
// };

// // Get weather icon
// const getWeatherIcon = (condition) => {
//   const lower = condition.toLowerCase();
//   for (const [key, icon] of Object.entries(weatherIcons)) {
//     if (lower.includes(key)) return icon;
//   }
//   return weatherIcons.default;
// };

// export default function WeatherCard({ 
//   temp = "28°C", 
//   condition = "Sunny",
//   humidity = 62,
//   wind = 6,
//   location = null,
//   forecast = null,
//   loading = false
// }) {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000); // Update every minute

//     return () => clearInterval(timer);
//   }, []);

//   const weatherIcon = getWeatherIcon(condition);
//   const themeClass = getWeatherTheme(condition);

//   return (
//     <Card className={`weather-card ${themeClass} ${loading ? "loading" : ""}`}>
//       {/* Main Weather Display */}
//       <div className="weather-top">
//         <div>
//           <div className="weather-temp">{temp}</div>
//           {location && (
//             <div style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
//               📍 {location}
//             </div>
//           )}
//         </div>
//         <div className="weather-cond">
//           <span className="weather-icon">{weatherIcon}</span>
//           <span>{condition}</span>
//         </div>
//       </div>

//       {/* Weather Details */}
//       <div className="weather-bottom">
//         <div className="weather-detail">
//           <span className="weather-detail-icon">💧</span>
//           <div>
//             <div className="weather-detail-label">Humidity</div>
//             <div className="weather-detail-value">{humidity}%</div>
//           </div>
//         </div>
//         <div className="weather-detail">
//           <span className="weather-detail-icon">💨</span>
//           <div>
//             <div className="weather-detail-label">Wind</div>
//             <div className="weather-detail-value">{wind} km/h</div>
//           </div>
//         </div>
//       </div>

//       {/* Optional Forecast */}
//       {forecast && forecast.length > 0 && (
//         <div className="weather-forecast">
//           {forecast.map((day, index) => (
//             <div key={index} className="forecast-item">
//               <div className="forecast-day">{day.day}</div>
//               <div className="forecast-icon">{getWeatherIcon(day.condition)}</div>
//               <div className="forecast-temp">{day.temp}</div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Last Updated */}
//       <div style={{ 
//         marginTop: "16px", 
//         fontSize: "11px", 
//         opacity: 0.7, 
//         textAlign: "center" 
//       }}>
//         Last updated: {currentTime.toLocaleTimeString([], { 
//           hour: '2-digit', 
//           minute: '2-digit' 
//         })}
//       </div>
//     </Card>
//   );
// }


import { useState, useEffect } from "react";
import Card from "./Card";
 import "../styles/WeatherCard.css";

// Weather icon mapping
const weatherIcons = {
  sunny: "☀️",
  clear: "☀️",
  cloudy: "☁️",
  "partly cloudy": "⛅",
  rainy: "🌧️",
  rain: "🌧️",
  stormy: "⛈️",
  storm: "⛈️",
  snowy: "❄️",
  snow: "❄️",
  windy: "💨",
  foggy: "🌫️",
  default: "🌤️"
};

// Get theme class based on condition
const getWeatherTheme = (condition) => {
  const lower = condition.toLowerCase();
  if (lower.includes("sun") || lower === "clear") return "sunny";
  if (lower.includes("rain")) return "rainy";
  if (lower.includes("partly") && lower.includes("cloud")) return "partly-cloudy";
  if (lower.includes("cloud")) return "cloudy";
  if (lower.includes("storm")) return "stormy";
  return "cloudy";
};

// Get weather icon
const getWeatherIcon = (condition) => {
  const lower = condition.toLowerCase();
  for (const [key, icon] of Object.entries(weatherIcons)) {
    if (lower.includes(key)) return icon;
  }
  return weatherIcons.default;
};

export default function WeatherCard({ 
  temp = "29°C", 
  condition = "Partly Cloudy",
  humidity = 62,
  wind = 6,
  location = null,
  loading = false
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const weatherIcon = getWeatherIcon(condition);
  const themeClass = getWeatherTheme(condition);

  return (
    <Card className={`weather-card ${themeClass} ${loading ? "loading" : ""}`}>
      {/* Main Weather Display */}
      <div className="weather-top">
        <div>
          <div className="weather-temp">{temp}</div>
          {location && (
            <div className="weather-location">
              📍 {location}
            </div>
          )}
        </div>
        <div className="weather-cond">
          <span className="weather-icon">{weatherIcon}</span>
          <span>{condition}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="weather-divider"></div>

      {/* Weather Details */}
      <div className="weather-bottom">
        <div className="weather-detail">
          <div>
            <span className="weather-detail-icon">💧</span>
            <span className="weather-detail-label"> HUMIDITY</span>
          </div>
          <div className="weather-detail-value">{humidity}%</div>
        </div>
        <div className="weather-detail">
          <div>
            <span className="weather-detail-icon">💨</span>
            <span className="weather-detail-label"> WIND</span>
          </div>
          <div className="weather-detail-value">{wind} km/h</div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="weather-updated">
        Last updated: {currentTime.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </Card>
  );
}