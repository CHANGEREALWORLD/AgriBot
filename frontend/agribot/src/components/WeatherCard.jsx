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