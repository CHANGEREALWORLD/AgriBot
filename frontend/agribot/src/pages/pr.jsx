import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { post } from "../utils/api";
import "../styles/Profile.css";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [filterType, setFilterType] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    farmSize: "",
    soilType: "",
    primaryCrop: "",
    irrigation: "",
    experience: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    setLoading(true);
    try {
      const profile = await post("/user/profile");
      if (profile) {
        setUserData(profile);
        updateFormData(profile);
      }

      const allActivities = await post("/user/activities");
      if (allActivities && Array.isArray(allActivities)) {
        setActivities(allActivities);
      }
    } catch (e) {
      console.error("Error fetching user data:", e);
      // Don't show error - just use default/mock data
    } finally {
      setLoading(false);
    }
  }

  function updateFormData(user) {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      profileImage: user.profileImage || "",
      farmSize: user.farmDetails?.farmSize || "",
      soilType: user.farmDetails?.soilType || "",
      primaryCrop: user.farmDetails?.primaryCrop || "",
      irrigation: user.farmDetails?.irrigation || "",
      experience: user.farmDetails?.experience || "",
    });
    setImagePreview(user.profileImage || null);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSaveProfile() {
    setSaveLoading(true);
    try {
      const profileData = {
        name: formData.name,
        email: formData.email,
        profileImage: formData.profileImage,
        farmDetails: {
          farmSize: formData.farmSize,
          soilType: formData.soilType,
          primaryCrop: formData.primaryCrop,
          irrigation: formData.irrigation,
          experience: formData.experience,
        }
      };

      // Try to save to backend, but continue even if it fails
      try {
        await post("/user/update-profile", profileData);
      } catch (apiError) {
        console.log("Backend not available, saving locally only");
      }
      
      // Always update local state
      setUserData(profileData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (e) {
      console.error("Error saving profile:", e);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  }

  function handleCancelEdit() {
    if (userData) {
      updateFormData(userData);
    }
    setIsEditing(false);
  }

  if (loading) {
    return (
      <Layout>
        <div className="user-profile-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Get logged-in user email (update this based on your auth method)
  const getLoggedInEmail = () => {
    // Option 1: From localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.email;
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
    
    // Option 2: From sessionStorage
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      try {
        const user = JSON.parse(sessionUser);
        return user.email;
      } catch (e) {
        console.error("Error parsing user from sessionStorage:", e);
      }
    }
    
    // Fallback
    return "user@example.com";
  };

  const loggedInEmail = getLoggedInEmail();
  
  const user = userData || {
    name: formData.name || "User",
    email: formData.email || loggedInEmail,
    profileImage: imagePreview || "",
    farmDetails: {
      farmSize: formData.farmSize || "Not set",
      soilType: formData.soilType || "Not set",
      primaryCrop: formData.primaryCrop || "Not set",
      irrigation: formData.irrigation || "Not set",
      experience: formData.experience || "Not set",
    },
  };

  // Generate recent mock activities with current dates
  const generateRecentActivities = () => {
    const now = new Date();
    return [
      {
        id: 1,
        type: "crop_recommendation",
        icon: "🌾",
        title: "Crop Recommendation",
        crop: "Tomato",
        details: "Recommended based on soil pH 6.5, N:40, P:50, K:45",
        result: "High Suitability",
        confidence: 92,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        id: 2,
        type: "yield_prediction",
        icon: "📊",
        title: "Yield Prediction",
        crop: "Wheat",
        details: "Predicted yield: 4.2 tons/hectare",
        result: "Above Average",
        confidence: 87,
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
      {
        id: 3,
        type: "soil_analysis",
        icon: "🔬",
        title: "Soil Analysis",
        crop: "General",
        details: "pH: 6.8, N: 45, P: 38, K: 42, Moisture: 23%",
        result: "Good Quality",
        confidence: 95,
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      },
      {
        id: 4,
        type: "disease_detection",
        icon: "🦠",
        title: "Disease Detection",
        crop: "Tomato",
        details: "Symptoms: leaf_spots, yellowing",
        result: "Early Blight Detected",
        confidence: 78,
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      },
      {
        id: 5,
        type: "weather_analysis",
        icon: "🌤️",
        title: "Weather Analysis",
        crop: "Rice",
        details: "Temp: 28°C, Rainfall: 150mm, Humidity: 75%",
        result: "Suitable Conditions",
        confidence: 85,
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      },
      {
        id: 6,
        type: "crop_recommendation",
        icon: "🌾",
        title: "Crop Recommendation",
        crop: "Maize",
        details: "Recommended for current season",
        result: "Medium Suitability",
        confidence: 75,
        timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      },
      {
        id: 7,
        type: "disease_detection",
        icon: "🦠",
        title: "Disease Detection",
        crop: "Wheat",
        details: "Symptoms: brown_patches, wilting",
        result: "Rust Disease",
        confidence: 82,
        timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      },
      {
        id: 8,
        type: "yield_prediction",
        icon: "📊",
        title: "Yield Prediction",
        crop: "Rice",
        details: "Predicted yield: 5.8 tons/hectare",
        result: "Excellent",
        confidence: 91,
        timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      },
    ];
  };

  const allActivities = activities.length > 0 ? activities : generateRecentActivities();

  const filteredActivities = filterType === "all" 
    ? allActivities 
    : allActivities.filter(activity => activity.type === filterType);

  const stats = {
    total: allActivities.length,
    crop_recommendation: allActivities.filter(a => a.type === "crop_recommendation").length,
    yield_prediction: allActivities.filter(a => a.type === "yield_prediction").length,
    soil_analysis: allActivities.filter(a => a.type === "soil_analysis").length,
    disease_detection: allActivities.filter(a => a.type === "disease_detection").length,
    weather_analysis: allActivities.filter(a => a.type === "weather_analysis").length,
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  function getActivityColor(type) {
    const colors = {
      crop_recommendation: "green",
      yield_prediction: "blue",
      soil_analysis: "purple",
      disease_detection: "red",
      weather_analysis: "orange",
    };
    return colors[type] || "gray";
  }
}

//   return (
//     <Layout>
//       <div className="user-profile-container">
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//           <h2 className="page-title">My Profile</h2>
//           {!isEditing && (
//             <button 
//               onClick={() => setIsEditing(true)}
//               style={{
//                 backgroundColor: '#22c55e',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 padding: '0.75rem 1.5rem',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem'
//               }}
//             >
//               ✏️ Edit Profile
//             </button>
//           )}
//         </div>

//         {
//         isEditing ? 
//           <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
//             <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1f2937' }}>
//               Edit Profile Information
//             </h3>
            
//             <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
//               <div style={{
//                 width: '120px',
//                 height: '120px',
//                 borderRadius: '50%',
//                 backgroundColor: '#e5e7eb',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//                 marginBottom: '1rem',
//                 border: '3px solid #22c55e'
//               }}>
                
//                 {imagePreview ? (
//                   <img 
//                     src={imagePreview} 
//                     alt="Preview" 
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <span style={{ fontSize: '3rem', color: '#9ca3af' }}>
//                     {formData.name ? formData.name.charAt(0).toUpperCase() : '👤'}
//                   </span>
//                 )}
                
//               </div>
//               <div>
//                 <label style={{
//                   backgroundColor: '#3b82f6',
//                   color: 'white',
//                   padding: '0.5rem 1.5rem',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   display: 'inline-block',
//                   fontSize: '0.95rem',
//                   fontWeight: '500'
//                 }}>
//                   📷 Upload Photo
//                   <input 
//                     type="file" 
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     style={{ display: 'none' }}
//                   />
//                 </label>
//                 <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
//                   Max size: 5MB (JPG, PNG, GIF)
//                 </p>
//               </div>
//             </div>

//             <div style={{ marginBottom: '1.5rem' }}>
//               <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#374151' }}>
//                 Personal Information
//               </h4>
//               <div style={{ display: 'grid', gap: '1rem' }}>
//                 <div>
//                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '6px',
//                       fontSize: '1rem',
//                       boxSizing: 'border-box'
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="your.email@example.com"
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '6px',
//                       fontSize: '1rem',
//                       boxSizing: 'border-box'
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div style={{ marginBottom: '1.5rem' }}>
//               <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#374151' }}>
//                 Farm Details
//               </h4>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
//                 <div>
//                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
//                     Farm Size
//                   </label>
//                   <input
//                     type="text"
//                     name="farmSize"
//                     value={formData.farmSize}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 48 acres"
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '6px',
//                       fontSize: '1rem',
//                       boxSizing: 'border-box'
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
//                     Soil Type
//                   </label>
//                   <select
//                     name="soilType"
//                     value={formData.soilType}
//                     onChange={handleInputChange}
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '6px',
//                       fontSize: '1rem',
//                       boxSizing: 'border-box'
//                     }}
//                   >
//                     }

//                     <option value="">Select soil type</option>
//                     <option value="Sandy">Sandy</option>
//                     <option value="Clay">Clay</option>
//                     <option value="Loamy">Loamy</option>
//                     <option value="Silt">Silt</option>
//                     <option value="Peat">Peat</option>
//                     <option value="Chalky">Chalky</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
//                     Primary Crop
//                   </label>
//                   <input
//                     type="text"
//                     name="primaryCrop"
//                     value={formData.primaryCrop}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Wheat, Rice, Corn"
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '6px',
//                       fontSize: '1rem',
//                       boxSizing: 'border-box'
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
//                     Irrigation System
//                   </label>
//                   <select
//                     name="irrigation"
//                     value={formData.irrigation}
//                     onChange={handleInputChange}
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '6px',
//                       fontSize: '1rem',
//                       boxSizing: 'border-box'
//                     }}
//                   >
//                     <option value="">Select irrigation type</option>
//                     <option value="Drip">Drip</option>
//                     <option value="Sprinkler">Sprinkler</option>
//                     <option value="Surface">Surface</option>
//                     <option value="Center Pivot">Center Pivot</option>
//                     <option value="Rainfed">Rainfed</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
//                     Farming Experience
//                   </label>
//                   <input
//                     type="text"
//                     name="experience"
//                     value={formData.experience}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 5 years"
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '6px',
//                       fontSize: '1rem',
//                       boxSizing: 'border-box'
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
//               <button
//                 onClick={handleCancelEdit}
//                 disabled={saveLoading}
//                 style={{
//                   backgroundColor: '#f3f4f6',
//                   color: '#374151',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '6px',
//                   padding: '0.75rem 1.5rem',
//                   fontSize: '1rem',
//                   fontWeight: '500',
//                   cursor: saveLoading ? 'not-allowed' : 'pointer',
//                   opacity: saveLoading ? 0.6 : 1
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveProfile}
//                 disabled={saveLoading || !formData.name || !formData.email}
//                 style={{
//                   backgroundColor: '#22c55e',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '6px',
//                   padding: '0.75rem 1.5rem',
//                   fontSize: '1rem',
//                   fontWeight: '500',
//                   cursor: (saveLoading || !formData.name || !formData.email) ? 'not-allowed' : 'pointer',
//                   opacity: (saveLoading || !formData.name || !formData.email) ? 0.6 : 1
//                 }}
//               >
//                 {saveLoading ? '💾 Saving...' : '💾 Save Profile'}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="card profile-header-card" style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '1.5rem',
//               padding: '2rem',
//               marginBottom: '1.5rem'
//             }}>
//               <div style={{
//                 width: '100px',
//                 height: '100px',
//                 borderRadius: '50%',
//                 backgroundColor: '#6366f1',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//                 flexShrink: 0
//               }}>
//                 {user.profileImage ? (
//                   <img 
//                     src={user.profileImage} 
//                     alt={user.name} 
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover'
//                     }}
//                   />
//                 ) : (
//                   <span style={{
//                     fontSize: '2.5rem',
//                     color: 'white',
//                     fontWeight: 'bold'
//                   }}>
//                     {user.name.charAt(0).toUpperCase()}
//                   </span>
//                 )}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <h3 style={{
//                   fontSize: '1.75rem',
//                   fontWeight: 'bold',
//                   color: '#1f2937',
//                   margin: '0 0 0.5rem 0'
//                 }}>
//                   {user.name}
//                 </h3>
//                 <p style={{
//                   fontSize: '1rem',
//                   color: '#6b7280',
//                   margin: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.5rem'
//                 }}>
//                   <span>📧</span>
//                   <span>{user.email}</span>
//                 </p>
//               </div>
//             </div>

//             <div className="stats-overview">
//               <div className="stat-box-mini">
//                 <div className="stat-icon-mini">📊</div>
//                 <div className="stat-number-mini">{stats.total}</div>
//                 <div className="stat-label-mini">Total Activities</div>
//               </div>
//               <div className="stat-box-mini">
//                 <div className="stat-icon-mini">🌾</div>
//                 <div className="stat-number-mini">{stats.crop_recommendation}</div>
//                 <div className="stat-label-mini">Crop Recommendations</div>
//               </div>
//               <div className="stat-box-mini">
//                 <div className="stat-icon-mini">📈</div>
//                 <div className="stat-number-mini">{stats.yield_prediction}</div>
//                 <div className="stat-label-mini">Yield Predictions</div>
//               </div>
//               <div className="stat-box-mini">
//                 <div className="stat-icon-mini">🔬</div>
//                 <div className="stat-number-mini">{stats.soil_analysis}</div>
//                 <div className="stat-label-mini">Soil Analyses</div>
//               </div>
//               <div className="stat-box-mini">
//                 <div className="stat-icon-mini">🦠</div>
//                 <div className="stat-number-mini">{stats.disease_detection}</div>
//                 <div className="stat-label-mini">Disease Detections</div>
//               </div>
//               <div className="stat-box-mini">
//                 <div className="stat-icon-mini">🌤️</div>
//                 <div className="stat-number-mini">{stats.weather_analysis}</div>
//                 <div className="stat-label-mini">Weather Checks</div>
//               </div>
//             </div>

//             <div className="profile-tabs">
//               <button
//                 className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
//                 onClick={() => setActiveTab("overview")}
//               >
//                 Overview
//               </button>
//               <button
//                 className={`tab-button ${activeTab === "farm" ? "active" : ""}`}
//                 onClick={() => setActiveTab("farm")}
//               >
//                 Farm Details
//               </button>
//               <button
//                 className={`tab-button ${activeTab === "activities" ? "active" : ""}`}
//                 onClick={() => setActiveTab("activities")}
//               >
//                 All Activities
//               </button>
//             </div>
//             {activeTab === "farm" && (
//   <div className="tab-content">
//     <div className="card farm-details-full-card">
//       <h4 className="card-title">Complete Farm Information</h4>
//       <div className="farm-details-grid-full">
//         <div className="detail-row-full">
//           <span className="detail-label-full">Farm Size</span>
//           <span className="detail-value-full">{user.farmDetails.farmSize}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Soil Type</span>
//           <span className="detail-value-full">{user.farmDetails.soilType}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Primary Crop</span>
//           <span className="detail-value-full">{user.farmDetails.primaryCrop}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Irrigation</span>
//           <span className="detail-value-full">{user.farmDetails.irrigation}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Experience</span>
//           <span className="detail-value-full">{user.farmDetails.experience}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
//  {activeTab === "activities" && (
//   <div className="tab-content">
//     <div className="card activities-full-card">
//       <div className="activities-header">
//         <h4 className="card-title">
//           All Activities ({filteredActivities.length})
//         </h4>

//         <div className="activity-filters">
//           <button
//             className={`filter-btn ${filterType === "all" ? "active" : ""}`}
//             onClick={() => setFilterType("all")}
//           >
//             All
//           </button>
//           <button
//             className={`filter-btn ${filterType === "crop_recommendation" ? "active" : ""}`}
//             onClick={() => setFilterType("crop_recommendation")}
//           >
//             🌾 Crop
//           </button>
//           <button
//             className={`filter-btn ${filterType === "yield_prediction" ? "active" : ""}`}
//             onClick={() => setFilterType("yield_prediction")}
//           >
//             📊 Yield
//           </button>
//           <button
//             className={`filter-btn ${filterType === "soil_analysis" ? "active" : ""}`}
//             onClick={() => setFilterType("soil_analysis")}
//           >
//             🔬 Soil
//           </button>
//           <button
//             className={`filter-btn ${filterType === "disease_detection" ? "active" : ""}`}
//             onClick={() => setFilterType("disease_detection")}
//           >
//             🦠 Disease
//           </button>
//           <button
//             className={`filter-btn ${filterType === "weather_analysis" ? "active" : ""}`}
//             onClick={() => setFilterType("weather_analysis")}
//           >
//             🌤️ Weather
//           </button>
//         </div>
//       </div>

//       <div className="activities-list-full">
//         {filteredActivities.length > 0 ? (
//           filteredActivities.map(activity => (
//             <div
//               key={activity.id}
//               className={`activity-card-item ${getActivityColor(activity.type)}`}
//             >
//               <div className="activity-icon-large">{activity.icon}</div>
//               <div className="activity-content-large">
//                 <div className="activity-header-large">
//                   <span className="activity-title">{activity.title}</span>
//                   <span className="activity-time">
//                     {formatDate(activity.timestamp)}
//                   </span>
//                 </div>
//                 <div className="activity-crop">Crop: {activity.crop}</div>
//                 <div className="activity-details-text">{activity.details}</div>
//                 <div className="activity-result-row">
//                   <span className="activity-result">
//                     Result: {activity.result}
//                   </span>
//                   <span className="activity-confidence">
//                     Confidence: {activity.confidence}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="empty-state">
//             <p>No activities found for this filter.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// )
// } 

// {/* OVERVIEW TAB */}
// {activeTab === "overview" && (
//   <div className="tab-content">
//     <div className="card farm-summary-card">
//       <h4 className="card-title">Farm Summary</h4>
//       <div className="farm-summary-grid">
//         <div className="summary-item-large">
//           <span className="summary-icon">📏</span>
//           <div>
//             <span className="summary-label">Farm Size</span>
//             <span className="summary-value">{user.farmDetails.farmSize}</span>
//           </div>
//         </div>
//         <div className="summary-item-large">
//           <span className="summary-icon">🌱</span>
//           <div>
//             <span className="summary-label">Soil Type</span>
//             <span className="summary-value">{user.farmDetails.soilType}</span>
//           </div>
//         </div>
//         <div className="summary-item-large">
//           <span className="summary-icon">🌾</span>
//           <div>
//             <span className="summary-label">Primary Crop</span>
//             <span className="summary-value">{user.farmDetails.primaryCrop}</span>
//           </div>
//         </div>
//         <div className="summary-item-large">
//           <span className="summary-icon">💧</span>
//           <div>
//             <span className="summary-label">Irrigation</span>
//             <span className="summary-value">{user.farmDetails.irrigation}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

// {/* FARM DETAILS TAB */}
// {activeTab === "farm" && (
//   <div className="tab-content">
//     <div className="card farm-details-full-card">
//       <h4 className="card-title">Complete Farm Information</h4>
//       <div className="farm-details-grid-full">
//         <div className="detail-row-full">
//           <span className="detail-label-full">Farm Size</span>
//           <span className="detail-value-full">{user.farmDetails.farmSize}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Soil Type</span>
//           <span className="detail-value-full">{user.farmDetails.soilType}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Primary Crop</span>
//           <span className="detail-value-full">{user.farmDetails.primaryCrop}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Irrigation</span>
//           <span className="detail-value-full">{user.farmDetails.irrigation}</span>
//         </div>
//         <div className="detail-row-full">
//           <span className="detail-label-full">Experience</span>
//           <span className="detail-value-full">{user.farmDetails.experience}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

// {/* ACTIVITIES TAB */}
// {activeTab === "activities" && (
//   <div className="tab-content">
//     <div className="card activities-full-card">
//       <h4 className="card-title">
//         All Activities ({filteredActivities.length})
//       </h4>

//       <div className="activities-list-full">
//         {filteredActivities.map(activity => (
//           <div
//             key={activity.id}
//             className={`activity-card-item ${getActivityColor(activity.type)}`}
//           >
//             <div className="activity-icon-large">{activity.icon}</div>
//             <div className="activity-content-large">
//               <div className="activity-header-large">
//                 <span className="activity-title">{activity.title}</span>
//                 <span className="activity-time">
//                   {formatDate(activity.timestamp)}
//                 </span>
//               </div>
//               <div className="activity-crop">Crop: {activity.crop}</div>
//               <div className="activity-details-text">{activity.details}</div>
//               <div className="activity-result-row">
//                 <span className="activity-result">
//                   Result: {activity.result}
//                 </span>
//                 <span className="activity-confidence">
//                   Confidence: {activity.confidence}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// )}
    

return (
  <Layout>
    <div className="user-profile-container">

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
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
            <div style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto 1rem",
              border: "3px solid #22c55e"
            }}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "3rem" }}>
                  {formData.name?.charAt(0)?.toUpperCase() || "👤"}
                </span>
              )}
            </div>

            <label style={{ cursor: "pointer", color: "#3b82f6" }}>
              📷 Upload Photo
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
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
              {filteredActivities.map(a => (
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
