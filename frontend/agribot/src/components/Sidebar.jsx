// src/components/Sidebar.jsx
// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <div className="sidebar-brand">
//         <div className="logo-mark">🌱</div>
//         <div className="brand-text">AgriBot</div>
//       </div>

//       <nav className="sidebar-nav">
//         <NavLink to="/" className="nav-item" end>
//           Dashboard
//         </NavLink>
//         <NavLink to="/crop" className="nav-item">
//           Crop Recommend
//         </NavLink>
//         <NavLink to="/yield" className="nav-item">
//           Yield Predict
//         </NavLink>
//         <NavLink to="/Soil" className="nav-item">
//           Soil Input
//         </NavLink>
//         <NavLink to="/login" className="nav-item">
//           Login
//         </NavLink>
//       </nav>

//       <div className="sidebar-footer">
//         <small>v0.1 • Agribot</small>
//       </div>
//     </aside>
//   );
// }



import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="logo-mark">🌱</div>
        <div className="brand-text">AgriBot</div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/crop" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🌾</span>
          <span>Crop Recommendation</span>
        </NavLink>

        <NavLink to="/yield" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">📈</span>
          <span>Yield Prediction</span>
        </NavLink>

        <NavLink to="/soil_input" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🧪</span>
          <span>Soil Analysis</span>
        </NavLink>

        <NavLink to="/disease" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🦠</span>
          <span>Disease Detection</span>
        </NavLink>

        <NavLink to="/Weather" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🌦</span>
          <span>Weather</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">👤</span>
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* Footer */}
      { <div className="sidebar-footer">
        {/* <small>v0.1 • AgriBot</small> */}
      </div> }
    </aside>
  );
}
