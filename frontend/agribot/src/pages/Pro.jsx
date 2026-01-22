// // src/pages/Profile.jsx
// import { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import { post } from "../utils/api"; // keep for POST calls
// import { getAuth, putAuth } from "../utils/authApi"; // we'll add these helpers

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState("");
//   const [avatar, setAvatar] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await getAuth("/auth/profile");
//         setUser(res.user);
//         setName(res.user.name || "");
//         setAvatar(res.user.avatar || "");
//       } catch (e) {
//         console.error("profile load", e);
//       }
//     }
//     load();
//   }, []);

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }

//   async function saveProfile(e) {
//     e.preventDefault();
//     setSaving(true);
//     setMsg("");
//     try {
//       const res = await putAuth("/auth/profile", { name: name || null, avatar: avatar || null });
//       setUser(res.user);
//       setEditing(false);
//       setMsg("Profile updated");
//     } catch (err) {
//       setMsg(err.message || "Update failed");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (!user) {
//     return (
//       <Layout>
//         <p>Loading profile…</p>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <h2>My Profile</h2>

//       <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
//         <Card style={{ width: 300 }}>
//           <div style={{ textAlign: "center" }}>
//             <img
//               src={user.avatar || "/default-avatar.png"}
//               alt="avatar"
//               style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
//             />
//             <h3 style={{ marginTop: 8 }}>{user.name}</h3>
//             <p style={{ color: "var(--muted)" }}>{user.email}</p>

//             <div style={{ marginTop: 12 }}>
//               <button className="btn" onClick={() => setEditing(true)}>Edit Profile</button>
//               <button className="btn secondary" onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
//             </div>
//           </div>
//         </Card>

//         <Card style={{ flex: 1 }}>
//           <h4>Profile Details</h4>

//           {!editing && (
//             <div>
//               <p><strong>Name:</strong> {user.name}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//             </div>
//           )}

//           {editing && (
//             <form onSubmit={saveProfile} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" />
//               <input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Avatar URL (optional)" />
//               <div style={{ display: "flex", gap: 8 }}>
//                 <button className="btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
//                 <button type="button" className="btn secondary" onClick={() => setEditing(false)}>Cancel</button>
//               </div>
//               {msg && <div style={{ color: "var(--muted)", marginTop: 6 }}>{msg}</div>}
//             </form>
//           )}
//         </Card>
//       </div>
//     </Layout>
//   );
// }



// src/pages/Profile.jsx   it is main
// import { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import { Navigate } from "react-router-dom";

// export default function Profile() {
//   const rawUser = localStorage.getItem("user");
//   const token = localStorage.getItem("token");

//   if (!rawUser || !token) {
//     return <Navigate to="/login" replace />;
//   }

//   const parsedUser = JSON.parse(rawUser);

//   const [user, setUser] = useState(parsedUser);
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState(parsedUser.name || "");
//   const [avatar, setAvatar] = useState(parsedUser.picture || "");
//   const [msg, setMsg] = useState("");

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }

//   function saveProfile(e) {
//     e.preventDefault();

//     const updated = {
//       ...user,
//       name,
//       picture: avatar,
//     };

//     localStorage.setItem("user", JSON.stringify(updated));
//     setUser(updated);
//     setEditing(false);
//     setMsg("Profile updated locally");
//   }

//   return (
//     <Layout>
//       <h2>My Profile</h2>

//       <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
//         <Card style={{ width: 300 }}>
//           <div style={{ textAlign: "center" }}>
//             <img
//               src={user.picture || "/default-avatar.png"}
//               alt="avatar"
//               style={{
//                 width: 120,
//                 height: 120,
//                 borderRadius: "50%",
//                 objectFit: "cover",
//               }}
//             />

//             <h3 style={{ marginTop: 8 }}>{user.name || "User"}</h3>
//             <p style={{ color: "var(--muted)" }}>{user.email}</p>

//             <div style={{ marginTop: 12 }}>
//               <button className="btn" onClick={() => setEditing(true)}>
//                 Edit Profile
//               </button>
//               <button
//                 className="btn secondary"
//                 onClick={logout}
//                 style={{ marginLeft: 8 }}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </Card>

//         <Card style={{ flex: 1 }}>
//           <h4>Profile Details</h4>

//           {!editing && (
//             <>
//               <p><strong>Name:</strong> {user.name}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//             </>
//           )}

//           {editing && (
//             <form
//               onSubmit={saveProfile}
//               style={{ display: "flex", flexDirection: "column", gap: 10 }}
//             >
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Display name"
//               />
//               <input
//                 value={avatar}
//                 onChange={(e) => setAvatar(e.target.value)}
//                 placeholder="Avatar URL"
//               />

//               <div style={{ display: "flex", gap: 8 }}>
//                 <button className="btn" type="submit">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn secondary"
//                   onClick={() => setEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>

//               {msg && (
//                 <div style={{ color: "var(--muted)", marginTop: 6 }}>
//                   {msg}
//                 </div>
//               )}
//             </form>
//           )}
//         </Card>
//       </div>
//     </Layout>
//   );
// }



// export default function Profile() {
//   return (
//     <h1 style={{ padding: 40 }}>
//       PROFILE PAGE RENDERING ✅
//     </h1>
//   );
// }



// 




// import { useEffect, useState } from "react";
// import Layout from "../layout/Layout";

// export default function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const raw = localStorage.getItem("user");

//     if (!raw) {
//       // IMPORTANT: redirect instead of rendering text
//       window.location.replace("/login");
//       return;
//     }

//     try {
//       setUser(JSON.parse(raw));
//     } catch {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       window.location.replace("/login");
//     }
//   }, []);

//   function logout() {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     window.location.replace("/login");
//   }

//   // While redirecting or loading
//   if (!user) return null;

//   return (
//     <Layout>
//       <h2>My Profile</h2>

//       <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
//         <div
//           style={{
//             width: 280,
//             padding: 20,
//             background: "#fff",
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//             textAlign: "center",
//           }}
//         >
//           <img
//             src={user.picture}
//             alt="avatar"
//             style={{
//               width: 100,
//               height: 100,
//               borderRadius: "50%",
//               objectFit: "cover",
//             }}
//           />

//           <h3 style={{ marginTop: 10 }}>{user.name}</h3>
//           <p style={{ color: "#666" }}>{user.email}</p>

//           <button
//             onClick={logout}
//             style={{
//               marginTop: 12,
//               padding: "8px 14px",
//               borderRadius: 8,
//               border: "none",
//               background: "#c0392b",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// }



// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import "./Profile.css";


// export default function Profile() {
//   // 🔒 Read storage first
//   const rawUser = localStorage.getItem("user");
//   const token = localStorage.getItem("token");
//   localStorage.getItem("profileData")


//   // 🧠 Parse safely
//   const parsedUser = rawUser ? JSON.parse(rawUser) : null;

//   // ✅ HOOKS FIRST (no conditions)
//   const [user, setUser] = useState(parsedUser);
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState(parsedUser?.name || "");
//   const [avatar, setAvatar] = useState(parsedUser?.picture || "");
//   const [msg, setMsg] = useState("");

//   // 🚫 NOW you are allowed to redirect
//   if (!parsedUser || !token) {
//     return <Navigate to="/login" replace />;
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }

//   function saveProfile(e) {
//     e.preventDefault();

//     const updated = {
//       ...user,
//       name,
//       picture: avatar,
//     };

//     localStorage.setItem("user", JSON.stringify(updated));
//     setUser(updated);
//     setEditing(false);
//     setMsg("Profile updated locally");
//   }

//   return (
    // <Layout>
    //   <h2>My Profile</h2>

    //   <div style={{ display: "flex", gap: 18 }}>
    //     <Card style={{ width: 300 }}>
    //       <img
    //         src={user.picture || "/default-avatar.png"}
    //         alt="avatar"
    //         style={{ width: 120, height: 120, borderRadius: "50%" }}
    //       />

    //       <h3>{user.name || "User"}</h3>
    //       <p>{user.email}</p>

    //       <button onClick={() => setEditing(true)}>Edit</button>
    //       <button onClick={logout}>Logout</button>
    //     </Card>

    //     <Card style={{ flex: 1 }}>
    //       {!editing ? (
    //         <>
    //           <p>Name: {user.name}</p>
    //           <p>Email: {user.email}</p>
    //         </>
    //       ) : (
    //         <form onSubmit={saveProfile}>
    //           <input value={name} onChange={e => setName(e.target.value)} />
    //           <input value={avatar} onChange={e => setAvatar(e.target.value)} />
    //           <button type="submit">Save</button>
    //         </form>
    //       )}
    //     </Card>
    //   </div>
    // </Layout>
// ye deleted hai
    
//     <Layout>
//   <h2 className="profile-title">My Profile</h2>

//   <div className="profile-grid">
//     <Card className="profile-card">
//       <div className="profile-avatar">
//         {user.name?.charAt(0).toUpperCase()}
//       </div>

//       <h3 className="profile-name">{user.name || "User"}</h3>
//       <p className="profile-email">{user.email}</p>

//       <div className="profile-actions">
//         <button onClick={() => setEditing(true)}>Edit</button>
//         <button className="primary" onClick={logout}>Logout</button>
//       </div>
//     </Card>

//     <Card className="profile-card">
//       {!editing ? (
//         <>
//           <div className="profile-details-row">
//             <span>Name</span>
//             <span>{user.name}</span>
//           </div>

//           <div className="profile-details-row">
//             <span>Email</span>
//             <span>{user.email}</span>
//           </div>
//         </>
//       ) : (
//         <form onSubmit={saveProfile} className="profile-form">
//           <input
//             value={name}
//             onChange={e => setName(e.target.value)}
//             placeholder="Full Name"
//           />
//           <input
//             value={avatar}
//             onChange={e => setAvatar(e.target.value)}
//             placeholder="Avatar URL"
//           />
//           <button type="submit" className="primary">Save</button>
//         </form>
//       )}
//     </Card>
//   </div>
// </Layout>
// );
// }

// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import Layout from "../layout/Layout";
// import Card from "../components/Card";
// import "./Profile.css";
//   // ✅ ALL HOOKS FIRST
//   const [user, setUser] = useState(parsedUser);
//   const [editingAccount, setEditingAccount] = useState(false);

//   const userEmail = parsedUser?.email;
//   const profileKey = `profileData_${userEmail}`;

// export default function Profile() {
//   // ---------- AUTH DATA ----------
//   const rawUser = localStorage.getItem("user");
//   const token = localStorage.getItem("token");
//   const parsedUser = rawUser ? JSON.parse(rawUser) : null;

//   if (!parsedUser || !token) {
//     return <Navigate to="/login" replace />;
//   }

//   const userEmail = parsedUser.email;
//   const profileKey = `profileData_${userEmail}`;

//   // ---------- PROFILE (FARM) DATA ----------
//   const defaultProfileData = {
//     farmSize: "",
//     soilType: "",
//     primaryCrop: "",
//     irrigationType: "",
//     experienceYears: ""
//   };

//   const rawProfile = localStorage.getItem(profileKey);
//   const initialProfile = rawProfile
//     ? JSON.parse(rawProfile)
//     : defaultProfileData;

//   const [profile, setProfile] = useState(initialProfile);
//   const [editFarm, setEditFarm] = useState(false);
//   const [farmForm, setFarmForm] = useState(initialProfile);

//   // create storage first time only
//   if (!rawProfile) {
//     localStorage.setItem(profileKey, JSON.stringify(defaultProfileData));
//   }

//   // ---------- ACCOUNT STATE ----------
//   const [user, setUser] = useState(parsedUser);
//   const [editingAccount, setEditingAccount] = useState(false);
//   const [name, setName] = useState(parsedUser.name || "");
//   const [avatar, setAvatar] = useState(parsedUser.picture || "");

//   // ---------- HANDLERS ----------
//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }

//   function saveAccount(e) {
//     e.preventDefault();
//     const updated = { ...user, name, picture: avatar };
//     localStorage.setItem("user", JSON.stringify(updated));
//     setUser(updated);
//     setEditingAccount(false);
//   }

//   function handleFarmChange(e) {
//     const { name, value } = e.target;
//     setFarmForm(prev => ({ ...prev, [name]: value }));
//   }

//   function saveFarmDetails(e) {
//     e.preventDefault();
//     localStorage.setItem(profileKey, JSON.stringify(farmForm));
//     setProfile(farmForm);
//     setEditFarm(false);
//   }

//   // ---------- UI ----------
//   return (
//     <Layout>
//       <h2 className="profile-title">My Profile</h2>

//       <div className="profile-grid">
//         {/* ACCOUNT CARD */}
//         <Card className="profile-card">
//           <div className="profile-avatar">
//             {user.name?.charAt(0).toUpperCase()}
//           </div>

//           <h3 className="profile-name">{user.name}</h3>
//           <p className="profile-email">{user.email}</p>

//           <div className="profile-actions">
//             <button onClick={() => setEditingAccount(true)}>Edit</button>
//             <button className="primary" onClick={logout}>Logout</button>
//           </div>

//           {editingAccount && (
//             <form onSubmit={saveAccount} className="profile-form">
//               <input
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 placeholder="Full Name"
//               />
//               <input
//                 value={avatar}
//                 onChange={e => setAvatar(e.target.value)}
//                 placeholder="Avatar URL"
//               />
//               <button type="submit" className="primary">Save</button>
//             </form>
//           )}
//         </Card>

//         {/* FARM DETAILS CARD */}
//         <Card className="profile-card">
//           <h3>Farm Details</h3>

//           {!editFarm ? (
//             <>
//               <div className="profile-details-row">
//                 <span>Farm Size</span>
//                 <span>{profile.farmSize || "Not set"}</span>
//               </div>
//               <div className="profile-details-row">
//                 <span>Soil Type</span>
//                 <span>{profile.soilType || "Not set"}</span>
//               </div>
//               <div className="profile-details-row">
//                 <span>Primary Crop</span>
//                 <span>{profile.primaryCrop || "Not set"}</span>
//               </div>
//               <div className="profile-details-row">
//                 <span>Irrigation</span>
//                 <span>{profile.irrigationType || "Not set"}</span>
//               </div>
//               <div className="profile-details-row">
//                 <span>Experience</span>
//                 <span>{profile.experienceYears || "Not set"} years</span>
//               </div>

//               <button onClick={() => setEditFarm(true)}>
//                 Edit Farm Details
//               </button>
//             </>
//           ) : (
//             <form onSubmit={saveFarmDetails} className="profile-form">
//               <input name="farmSize" placeholder="Farm Size" value={farmForm.farmSize} onChange={handleFarmChange} />
//               <input name="soilType" placeholder="Soil Type" value={farmForm.soilType} onChange={handleFarmChange} />
//               <input name="primaryCrop" placeholder="Primary Crop" value={farmForm.primaryCrop} onChange={handleFarmChange} />
//               <input name="irrigationType" placeholder="Irrigation Type" value={farmForm.irrigationType} onChange={handleFarmChange} />
//               <input name="experienceYears" placeholder="Experience (years)" value={farmForm.experienceYears} onChange={handleFarmChange} />

//               <button type="submit" className="primary">Save</button>
//               <button type="button" onClick={() => setEditFarm(false)}>Cancel</button>
//             </form>
//           )}
//         </Card>
//       </div>
//     </Layout>
//   );
// }


import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Card from "../components/Card";
import "./Profile.css";

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

  // ================= ALL HOOKS (NO CONDITIONS) =================
  const [user, setUser] = useState(parsedUser);
  const [editingAccount, setEditingAccount] = useState(false);

  const [profile, setProfile] = useState(rawProfile);
  const [editFarm, setEditFarm] = useState(false);
  const [farmForm, setFarmForm] = useState(rawProfile);

  const [name, setName] = useState(parsedUser?.name || "");
  const [avatar, setAvatar] = useState(parsedUser?.picture || "");

  // ================= INIT STORAGE (ONCE PER USER) =================
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

  // ================= UI =================
  return (
    <Layout>
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-grid">
        {/* ACCOUNT CARD */}
        <Card className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h3 className="profile-name">{user?.name}</h3>
          <p className="profile-email">{user?.email}</p>

          <div className="profile-actions">
            <button onClick={() => setEditingAccount(true)}>Edit</button>
            <button className="primary" onClick={logout}>Logout</button>
          </div>

          {editingAccount && (
            <form onSubmit={saveAccount} className="profile-form">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                placeholder="Avatar URL"
              />
              <button type="submit" className="primary">Save</button>
            </form>
          )}
        </Card>

        {/* FARM DETAILS CARD */}
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
                <span>{profile.experienceYears || "Not set"} years</span>
              </div>

              <button onClick={() => setEditFarm(true)}>
                Edit Farm Details
              </button>
            </>
          ) : (
            // <form onSubmit={saveFarmDetails} className="profile-form">
            //   <input
            //     name="farmSize"
            //     placeholder="Farm Size"
            //     value={farmForm.farmSize}
            //     onChange={handleFarmChange}
            //   />
            //   <input
            //     name="soilType"
            //     placeholder="Soil Type"
            //     value={farmForm.soilType}
            //     onChange={handleFarmChange}
            //   />
            //   <input
            //     name="primaryCrop"
            //     placeholder="Primary Crop"
            //     value={farmForm.primaryCrop}
            //     onChange={handleFarmChange}
            //   />
            //   <input
            //     name="irrigationType"
            //     placeholder="Irrigation Type"
            //     value={farmForm.irrigationType}
            //     onChange={handleFarmChange}
            //   />
            //   <input
            //     name="experienceYears"
            //     placeholder="Experience (years)"
            //     value={farmForm.experienceYears}
            //     onChange={handleFarmChange}
            //   />

            //   <button type="submit" className="primary">Save</button>
            //   <button type="button" onClick={() => setEditFarm(false)}>
            //     Cancel
            //   </button>
            // </form>
            <form onSubmit={saveFarmDetails} className="profile-form">

  {/* Farm Size */}
  <input
    name="farmSize"
    placeholder="Farm Size (e.g. 2.5 acres)"
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
  </select>

  {/* Primary Crop */}
  <select
    name="primaryCrop"
    value={farmForm.primaryCrop}
    onChange={handleFarmChange}
  >
    <option value="">Select Primary Crop</option>
    <option value="Millet">Millet</option>
    <option value="Rice">Rice</option>
    <option value="Wheat">Wheat</option>
    <option value="Maize">Maize</option>
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
  </select>

  {/* Experience */}
  <input
    name="experienceYears"
    placeholder="Experience (years)"
    value={farmForm.experienceYears}
    onChange={handleFarmChange}
  />

  {/* Buttons */}
  <button type="submit" className="primary">Save</button>
  <button type="button" onClick={() => setEditFarm(false)}>
    Cancel
  </button>

</form>
)}
        </Card>
      </div>
    </Layout>
  );
}
