// // src/components/ChartCard.jsx
// import Card from "./Card";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// export default function ChartCard() {
//   const data = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "Predicted Yield (kg)",
//         data: [120, 135, 150, 140, 160, 180, 200],
//         fill: true,
//         tension: 0.4
//       }
//     ]
//   };

//   const options = {
//     plugins: { legend: { display: false } },
//     maintainAspectRatio: false,
//     scales: {
//       y: { beginAtZero: true }
//     }
//   };

//   return (
//     <Card className="chart-card">
//       <h4 className="card-title">Weekly Yield Prediction</h4>
//       <div style={{ height: 220 }}>
//         <Line data={data} options={options} />
//       </div>
//     </Card>
//   );
// }

// src/components/ChartCard.jsx
import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/ChartCard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function ChartCard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Predicted Yield (kg)",
        data: [120, 135, 150, 140, 160, 180, 200],
        fill: true,
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        borderColor: "#4caf50",
        borderWidth: 3,
        pointBackgroundColor: "#4caf50",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "#45a049",
        pointHoverBorderWidth: 3,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: "500"
          },
          color: "#2c3e50"
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(44, 62, 80, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        borderColor: "#4caf50",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Yield: ${context.parsed.y} kg`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false
        },
        ticks: {
          color: "#7f8c8d",
          font: {
            size: 11
          },
          callback: function(value) {
            return value + " kg";
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: "#7f8c8d",
          font: {
            size: 11,
            weight: "500"
          }
        }
      }
    },
    interaction: {
      mode: "index",
      intersect: false
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart"
    }
  };

  return (
    <Card className={`chart-card ${loading ? "loading" : ""}`}>
      <h4 className="card-title">Weekly Yield Prediction</h4>
      <div style={{ height: 220 }}>
        {!loading && <Line data={data} options={options} />}
      </div>
    </Card>
  );
}