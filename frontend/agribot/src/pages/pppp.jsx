import { useState } from "react";
import Layout from "../layout/Layout";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [saveLoading, setSaveLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    farmSize: "",
    primaryCrop: "",
    soilType: "",
    irrigation: "",
    experience: ""
  });

  const user = {
    name: "User Name",
    email: "user@email.com",
    farmDetails: {
      farmSize: "2 Acres",
      soilType: "Loamy",
      primaryCrop: "Wheat",
      irrigation: "Drip",
      experience: "3 years"
    }
  };

  const filteredActivities = [
    { id: 1, title: "Soil Test", details: "Completed soil testing" },
    { id: 2, title: "Crop Planning", details: "Planned next season crop" }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    setSaveLoading(true);
    setTimeout(() => {
      setSaveLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="user-profile-container">

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem"
          }}
        >
          <h2 className="page-title">My Profile</h2>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                cursor: "pointer"
              }}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {/* EDIT MODE */}
        {isEditing ? (
          <div className="card" style={{ padding: "2rem" }}>
            <h3>Edit Profile Information</h3>

            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 1rem",
                  border: "3px solid #22c55e"
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "3rem" }}>
                    {formData.name?.charAt(0)?.toUpperCase() || "👤"}
                  </span>
                )}
              </div>

              <label style={{ cursor: "pointer", color: "#3b82f6" }}>
                📷 Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>

            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" />
            <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
            <input name="farmSize" value={formData.farmSize} onChange={handleInputChange} placeholder="Farm Size" />
            <input name="primaryCrop" value={formData.primaryCrop} onChange={handleInputChange} placeholder="Primary Crop" />

            <select name="soilType" value={formData.soilType} onChange={handleInputChange}>
              <option value="">Select soil type</option>
              <option value="Sandy">Sandy</option>
              <option value="Clay">Clay</option>
              <option value="Loamy">Loamy</option>
              <option value="Silt">Silt</option>
              <option value="Peat">Peat</option>
              <option value="Chalky">Chalky</option>
            </select>

            <select name="irrigation" value={formData.irrigation} onChange={handleInputChange}>
              <option value="">Select irrigation</option>
              <option value="Drip">Drip</option>
              <option value="Sprinkler">Sprinkler</option>
              <option value="Surface">Surface</option>
              <option value="Rainfed">Rainfed</option>
            </select>

            <input name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Experience" />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleSaveProfile} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* PROFILE CARD */}
            <div className="card profile-header-card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

            {/* TABS */}
            <div className="profile-tabs">
              <button onClick={() => setActiveTab("overview")}>Overview</button>
              <button onClick={() => setActiveTab("farm")}>Farm</button>
              <button onClick={() => setActiveTab("activities")}>Activities</button>
            </div>

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="card">
                <p>Farm Size: {user.farmDetails.farmSize}</p>
                <p>Soil Type: {user.farmDetails.soilType}</p>
                <p>Crop: {user.farmDetails.primaryCrop}</p>
              </div>
            )}

            {/* FARM */}
            {activeTab === "farm" && (
              <div className="card">
                <p>Irrigation: {user.farmDetails.irrigation}</p>
                <p>Experience: {user.farmDetails.experience}</p>
              </div>
            )}

            {/* ACTIVITIES */}
            {activeTab === "activities" && (
              <div className="card">
                {filteredActivities.map((a) => (
                  <div key={a.id}>
                    <strong>{a.title}</strong>
                    <p>{a.details}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
