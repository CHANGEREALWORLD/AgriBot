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








