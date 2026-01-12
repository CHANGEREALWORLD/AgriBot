import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Card from "../components/Card";
import "../styles/Profile.css";

export default function Profile() {
  // ================= READ STORAGE =================
  const rawUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const parsedUser = rawUser ? JSON.parse(rawUser) : null;

  const userEmail = parsedUser?.email || "";
  const profileKey = userEmail ? `profileData_${userEmail}` : null;

  // ================= DEFAULT FARM DATA =================
  const defaultProfileData = {
    farmSize: "",
    soilType: "",
    primaryCrop: "",
    irrigationType: "",
    experienceYears: ""
  };

  const rawProfile =
    profileKey && localStorage.getItem(profileKey)
      ? JSON.parse(localStorage.getItem(profileKey))
      : defaultProfileData;

  // ================= ALL HOOKS =================
  const [user, setUser] = useState(parsedUser);
  const [editingAccount, setEditingAccount] = useState(false);
  const [profile, setProfile] = useState(rawProfile);
  const [editFarm, setEditFarm] = useState(false);
  const [farmForm, setFarmForm] = useState(rawProfile);
  const [name, setName] = useState(parsedUser?.name || "");
  const [avatar, setAvatar] = useState(parsedUser?.picture || "");

  // ================= INIT STORAGE =================
  if (profileKey && !localStorage.getItem(profileKey)) {
    localStorage.setItem(profileKey, JSON.stringify(defaultProfileData));
  }

  // ================= AUTH REDIRECT =================
  if (!parsedUser || !token) {
    return <Navigate to="/login" replace />;
  }

  // ================= HANDLERS =================
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  function saveAccount(e) {
    e.preventDefault();
    const updatedUser = { ...user, name, picture: avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditingAccount(false);
  }

  function handleFarmChange(e) {
    const { name, value } = e.target;
    setFarmForm(prev => ({ ...prev, [name]: value }));
  }

  function saveFarmDetails(e) {
    e.preventDefault();
    localStorage.setItem(profileKey, JSON.stringify(farmForm));
    setProfile(farmForm);
    setEditFarm(false);
  }

  function cancelEdit() {
    setEditFarm(false);
    setFarmForm(profile);
  }

  // ================= UI =================
  return (
    <Layout>
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-grid">
        {/* ========== ACCOUNT CARD ========== */}
        <Card className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h3 className="profile-name">{user?.name || "User"}</h3>
          <p className="profile-email">{user?.email || "No email"}</p>

          {!editingAccount ? (
            <div className="profile-actions">
              <button onClick={() => setEditingAccount(true)}>
                Edit Profile
              </button>
              <button className="primary" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={saveAccount} className="profile-form">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
              <input
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                placeholder="Avatar URL (optional)"
              />
              <button type="submit" className="primary">
                Save Changes
              </button>
              <button type="button" onClick={() => setEditingAccount(false)}>
                Cancel
              </button>
            </form>
          )}
        </Card>

        {/* ========== FARM DETAILS CARD ========== */}
        <Card className="profile-card">
          <h3>Farm Details</h3>

          {!editFarm ? (
            <>
              <div className="profile-details-row">
                <span>Farm Size</span>
                <span>{profile.farmSize || "Not set"}</span>
              </div>
              
              <div className="profile-details-row">
                <span>Soil Type</span>
                <span>{profile.soilType || "Not set"}</span>
              </div>
              
              <div className="profile-details-row">
                <span>Primary Crop</span>
                <span>{profile.primaryCrop || "Not set"}</span>
              </div>
              
              <div className="profile-details-row">
                <span>Irrigation</span>
                <span>{profile.irrigationType || "Not set"}</span>
              </div>
              
              <div className="profile-details-row">
                <span>Experience</span>
                <span>
                  {profile.experienceYears 
                    ? `${profile.experienceYears} years` 
                    : "Not set"}
                </span>
              </div>

              <button onClick={() => setEditFarm(true)}>
                Edit Farm Details
              </button>
            </>
          ) : (
            <form onSubmit={saveFarmDetails} className="profile-form">
              {/* Farm Size */}
              <input
                name="farmSize"
                placeholder="Farm Size (e.g., 2.5 acres)"
                value={farmForm.farmSize}
                onChange={handleFarmChange}
              />

              {/* Soil Type */}
              <select
                name="soilType"
                value={farmForm.soilType}
                onChange={handleFarmChange}
              >
                <option value="">Select Soil Type</option>
                <option value="Clay">Clay</option>
                <option value="Sandy">Sandy</option>
                <option value="Loamy">Loamy</option>
                <option value="Silty">Silty</option>
                <option value="Peaty">Peaty</option>
                <option value="Chalky">Chalky</option>
              </select>

              {/* Primary Crop */}
              <select
                name="primaryCrop"
                value={farmForm.primaryCrop}
                onChange={handleFarmChange}
              >
                <option value="">Select Primary Crop</option>
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
                <option value="Millet">Millet</option>
                <option value="Cotton">Cotton</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
              </select>

              {/* Irrigation Type */}
              <select
                name="irrigationType"
                value={farmForm.irrigationType}
                onChange={handleFarmChange}
              >
                <option value="">Select Irrigation Type</option>
                <option value="Rainfed">Rainfed</option>
                <option value="Canal">Canal</option>
                <option value="Drip">Drip</option>
                <option value="Sprinkler">Sprinkler</option>
                <option value="Well">Well</option>
                <option value="Tube Well">Tube Well</option>
              </select>

              {/* Experience Years */}
              <input
                name="experienceYears"
                type="number"
                placeholder="Years of Experience"
                value={farmForm.experienceYears}
                onChange={handleFarmChange}
                min="0"
                max="100"
              />

              {/* Buttons */}
              <button type="submit" className="primary">
                Save Farm Details
              </button>
              <button type="button" onClick={cancelEdit}>
                Cancel
              </button>
            </form>
          )}
        </Card>
      </div>
    </Layout>
  );
}