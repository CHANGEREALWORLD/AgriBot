// // src/components/Navbar.jsx
// import { logout } from "../layout/Layout";

// export default function Navbar() {
//   return (
//     <header className="navbar">
//       <div className="navbar-left">
//         <h3 className="app-title">Dashboard</h3>
//       </div>
//       <div className="navbar-right">
//         <div className="user-chip">laxmi</div>
//       </div>
      
//     </header>
//   );
  
// }




// import { logout } from "../utils/auth";

// export default function Navbar() {
//   return (
//     <header className="navbar">
//       <div className="navbar-left">
//         <h3 className="app-title">Dashboard</h3>
//       </div>

//       <div className="navbar-right">
//         <div className="user-chip">laxmi</div>

//         <button
//           onClick={logout}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "#fff",
//             cursor: "pointer",
//             fontSize: 14,
//             marginLeft: 12,
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }




// import { logout } from "../utils/auth";

// export default function Navbar() {
//   return (
//     <header className="navbar">
//       <div className="navbar-left">
//         <h3 className="app-title">Dashboard</h3>
//       </div>

//       <div className="navbar-right">
//         <span className="user-chip">laxmi</span>

//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }



// import { logout } from "../utils/auth";
// import "../styles/Navbar.css";

// export default function Navbar({ username = "User" }) {
//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       logout();
//     }
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-left">
//         <h3 className="app-title">AgriSmart Dashboard</h3>
//       </div>

//       <div className="navbar-right">
//         <span className="user-chip">{username}</span>

//         <button 
//           className="logout-btn" 
//           onClick={handleLogout}
//           aria-label="Logout"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }  (main code hai)



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../utils/auth";
// import "../styles/Navbar.css";

// export default function Navbar({ username = "User" }) {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       logout();
//     }
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-left">
//         <h3 className="app-title">AgriSmart Dashboard</h3>
//       </div>

//       <div className="navbar-right user-menu">
//         <button
//           className="user-chip"
//           onClick={() => setOpen(!open)}
//         >
//           {username}
//         </button>

//         {open && (
//           <div className="dropdown">
//             <button onClick={() => navigate("/profile")}>
//               Profile
//             </button>
//             <button onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }


import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "../styles/Navbar.css";

export default function Navbar({ username = "User" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h3 className="app-title">AgriSmart Dashboard</h3>
      </div>

      <div className="navbar-right">
        <button
          className="user-chip"
          onClick={() => navigate("/Profile")}
          aria-label="Go to profile"
        >
          {username}
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}








