// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       {/* Brand */}
//       <div className="sidebar-brand">
//         <div className="logo-mark">🌱</div>
//         <div className="brand-text">AgriBot</div>
//       </div>

//       {/* Navigation */}
//       <nav className="sidebar-nav">
//         <NavLink to="/" end className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
//           <span className="icon">📊</span>
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink to="/crop" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
//           <span className="icon">🌾</span>
//           <span>Crop Recommendation</span>
//         </NavLink>

//         <NavLink to="/yield" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
//           <span className="icon">📈</span>
//           <span>Yield Prediction</span>
//         </NavLink>

//         <NavLink to="/soil_input" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
//           <span className="icon">🧪</span>
//           <span>Soil Analysis</span>
//         </NavLink>

//         <NavLink to="/disease" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
//           <span className="icon">🦠</span>
//           <span>Disease Detection</span>
//         </NavLink>

//         <NavLink to="/Weather" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
//           <span className="icon">🌦</span>
//           <span>Weather</span>
//         </NavLink>

//         <NavLink to="/profile" className={({ isActive})=> isActive ? "nav-item active" : "nav-item"}>
//           <span className="icon">👤</span>
//           <span>Profile</span>
//         </NavLink>
//       </nav>

//       {/* Footer */}
//       { <div className="sidebar-footer">
  
//       </div> }
//     </aside>
//   );
// }



import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-mark">🌱</div>
        <div className="brand-text">AgriBot</div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/crop" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🌾</span>
          <span>Crop Recommendation</span>
        </NavLink>

        <NavLink to="/yield" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">📈</span>
          <span>Yield Prediction</span>
        </NavLink>

        <NavLink to="/soil_input" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🧪</span>
          <span>Soil Analysis</span>
        </NavLink>

        <NavLink to="/disease" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🦠</span>
          <span>Disease Detection</span>
        </NavLink>

        <NavLink to="/weather" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🌦</span>
          <span>Weather</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">👤</span>
          <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
}
