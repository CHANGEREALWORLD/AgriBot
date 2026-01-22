import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          // Validate token with backend (optional)
          const isValid = await validateToken(token);
          if (isValid) {
            setUser(JSON.parse(storedUser));
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('/api/auth/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/login');
    }
  };

  // Don't show navbar if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Get display name - priority: fullName > username > email > "User"
  const getDisplayName = () => {
    if (!user) return "User";
    
    if (user.fullName) return user.fullName;
    if (user.username) return user.username;
    if (user.email) return user.email.split('@')[0];
    return "User";
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h3 className="app-title">AgriSmart Dashboard</h3>
        <nav className="navbar-nav">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/crops" className="nav-link">Crops</a>
          <a href="/weather" className="nav-link">Weather</a>
          <a href="/analytics" className="nav-link">Analytics</a>
        </nav>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <div className="user-avatar">
            {getDisplayName().charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <span className="user-name">{getDisplayName()}</span>
            {user.email && <span className="user-email">{user.email}</span>}
          </div>
        </div>

        <button 
          className="logout-btn" 
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
        >
          <svg className="logout-icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}