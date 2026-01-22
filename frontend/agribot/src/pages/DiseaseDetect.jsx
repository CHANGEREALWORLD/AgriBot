// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// const SYMPTOMS = [
//   { id: "yellow_leaves", label: "Yellow leaves" },
//   { id: "brown_spots", label: "Brown spots" },
//   { id: "white_powder", label: "White powder on leaves" },
//   { id: "leaf_curl", label: "Leaf curling" },
//   { id: "leaf_blast", label: "Leaf blast lesions" },
//   { id: "rust_pustules", label: "Rust-colored pustules" },
// ];

// export default function DiseaseDetect() {
//   const [crop, setCrop] = useState("tomato");
//   const [symptoms, setSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   function toggleSymptom(id) {
//     setSymptoms(prev =>
//       prev.includes(id)
//         ? prev.filter(s => s !== id)
//         : [...prev, id]
//     );
//   }

//   async function detect() {
//     setError("");
//     setResult(null);

//     try {
//       const res = await post("/disease/detect", {
//         crop,
//         symptoms
//       });
//       setResult(res);
//     } catch {
//       setError("Failed to detect disease");
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         <select value={crop} onChange={e => setCrop(e.target.value)}>
//           <option value="tomato">Tomato</option>
//           <option value="rice">Rice</option>
//           <option value="wheat">Wheat</option>
//         </select>

//         <h4 style={{ marginTop: 12 }}>Select observed symptoms</h4>

//         {SYMPTOMS.map(s => (
//           <label key={s.id} style={{ display: "block", marginTop: 6 }}>
//             <input
//               type="checkbox"
//               checked={symptoms.includes(s.id)}
//               onChange={() => toggleSymptom(s.id)}
//             />{" "}
//             {s.label}
//           </label>
//         ))}

//         <button style={{ marginTop: 14 }} onClick={detect}>
//           Detect Disease
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card" style={{ marginTop: 20 }}>
//           <h3>Disease: {result.disease}</h3>

//           <strong>Confidence: {result.confidence}%</strong>
//           <div style={{
//             height: 8,
//             background: "#eee",
//             borderRadius: 6,
//             marginTop: 6
//           }}>
//             <div style={{
//               width: `${result.confidence}%`,
//               height: "100%",
//               background: "#c62828",
//               borderRadius: 6
//             }} />
//           </div>

//           {result.reasons.length > 0 && (
//             <>
//               <h4>Why?</h4>
//               <ul>
//                 {result.reasons.map((r, i) => (
//                   <li key={i}>{r}</li>
//                 ))}
//               </ul>
//             </>
//           )}

//           {result.prevention.length > 0 && (
//             <>
//               <h4>Prevention Tips</h4>
//               <ul>
//                 {result.prevention.map((p, i) => (
//                   <li key={i}>{p}</li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       )}
//     </Layout>
//   );
// }


// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// const ALL_SYMPTOMS = [
//   "yellow_leaves",
//   "brown_spots",
//   "white_powder",
//   "leaf_curl",
//   "leaf_blast",
//   "rust_pustules"
// ];

// export default function DiseaseDetect() {
//   const [crop, setCrop] = useState("tomato");
//   const [symptoms, setSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function toggleSymptom(sym) {
//     setSymptoms(prev =>
//       prev.includes(sym)
//         ? prev.filter(s => s !== sym)
//         : [...prev, sym]
//     );
//   }

//   async function detectDisease() {
//     setError("");
//     setResult(null);

//     if (symptoms.length === 0) {
//       setError("Select at least one symptom");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await post("/disease/detect", {
//         crop,
//         symptoms
//       });
//       setResult(res);
//     } catch (e) {
//       setError("Failed to detect disease");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         <label>Crop</label>
//         <select value={crop} onChange={e => setCrop(e.target.value)}>
//           <option value="tomato">Tomato</option>
//           <option value="rice">Rice</option>
//           <option value="wheat">Wheat</option>
//         </select>

//         <h4 style={{ marginTop: 16 }}>Select Symptoms</h4>

//         <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//           {ALL_SYMPTOMS.map(sym => (
//             <label key={sym} style={{
//               padding: "6px 10px",
//               borderRadius: 8,
//               border: "1px solid #ccc",
//               cursor: "pointer",
//               background: symptoms.includes(sym) ? "#e8f5e9" : "#fff"
//             }}>
//               <input
//                 type="checkbox"
//                 checked={symptoms.includes(sym)}
//                 onChange={() => toggleSymptom(sym)}
//                 style={{ marginRight: 6 }}
//               />
//               {sym.replace("_", " ")}
//             </label>
//           ))}
//         </div>

//         <button onClick={detectDisease} style={{ marginTop: 16 }}>
//           {loading ? "Detecting..." : "Detect Disease"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card" style={{ marginTop: 20 }}>
//           <h3>{result.disease}</h3>

//           <p>
//             <strong>Severity:</strong>{" "}
//             <span style={{
//               color:
//                 result.severity === "Severe" ? "#c62828" :
//                 result.severity === "Moderate" ? "#f9a825" :
//                 "#2e7d32"
//             }}>
//               {result.severity}
//             </span>
//           </p>

//           <p><strong>Action Priority:</strong> {result.action_priority}</p>

//           {/* Confidence Bar */}
//           <div style={{ margin: "10px 0" }}>
//             <strong>Confidence: {result.confidence}%</strong>
//             <div style={{
//               height: 8,
//               background: "#eee",
//               borderRadius: 6,
//               marginTop: 4
//             }}>
//               <div style={{
//                 width: `${result.confidence}%`,
//                 height: "100%",
//                 background: "#2e7d32",
//                 borderRadius: 6
//               }} />
//             </div>
//           </div>

//           <h4>Why this result?</h4>
//           <ul>
//             {result.reasons.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>

//           <h4>Prevention</h4>
//           <ul>
//             {result.prevention.map((p, i) => (
//               <li key={i}>{p}</li>
//             ))}
//           </ul>

//           {result.treatment_plan.length > 0 && (
//             <>
//               <h4>Treatment Plan</h4>
//               <ul>
//                 {result.treatment_plan.map((t, i) => (
//                   <li key={i}>{t}</li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       )}
//     </Layout>
//   );
// }



// import { useState } from "react";
// import Layout from "../layout/Layout";

// const SYMPTOMS = {
//   wheat: ["rust", "yellow leaves", "white powder"],
//   rice: ["blast", "brown spots", "wilting"],
//   tomato: ["leaf curl", "yellow mosaic", "wilting"]
// };

// export default function DiseaseDetect() {
//   const [crop, setCrop] = useState("wheat");
//   const [selected, setSelected] = useState([]);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   function toggle(sym) {
//     setSelected(p =>
//       p.includes(sym) ? p.filter(s => s !== sym) : [...p, sym]
//     );
//   }

//   async function detect() {
//     if (selected.length === 0) {
//       setError("Select at least one symptom");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("crop", crop);
//     fd.append("symptoms", selected.join(","));
//     if (image) fd.append("image", image);

//     const res = await fetch("http://127.0.0.1:8000/disease/detect", {
//       method: "POST",
//       body: fd
//     });
//     const data = await res.json();
//     setResult(data);
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         <select value={crop} onChange={e => {
//           setCrop(e.target.value);
//           setSelected([]);
//         }}>
//           <option value="wheat">Wheat</option>
//           <option value="rice">Rice</option>
//           <option value="tomato">Tomato</option>
//         </select>

//         <h4>Select Symptoms</h4>
//         {SYMPTOMS[crop].map(s => (
//           <label key={s} style={{ display: "block" }}>
//             <input
//               type="checkbox"
//               checked={selected.includes(s)}
//               onChange={() => toggle(s)}
//             /> {s}
//           </label>
//         ))}

//         <input type="file" onChange={e => {
//           setImage(e.target.files[0]);
//           setPreview(URL.createObjectURL(e.target.files[0]));
//         }} />

//         {preview && <img src={preview} alt="" style={{ width: 200 }} />}

//         <button onClick={detect}>Detect</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card">
//           <h3>{result.disease}</h3>
//           <p>Severity: {result.severity}</p>
//           <p>Confidence: {result.confidence}%</p>

//           <h4>Reasons</h4>
//           <ul>{result.reasons.map((r,i)=><li key={i}>{r}</li>)}</ul>

//           <h4>Prevention</h4>
//           <ul>{result.prevention.map((p,i)=><li key={i}>{p}</li>)}</ul>

//           <h4>Treatment</h4>
//           <ul>{result.treatment.map((t,i)=><li key={i}>{t}</li>)}</ul>
//         </div>
//       )}
//     </Layout>
//   );
// }





// import { useState } from "react";
// import Layout from "../layout/Layout";

// const SYMPTOMS = {
//   wheat: ["rust", "yellow leaves", "white powder"],
//   rice: ["blast", "brown spots", "wilting"],
//   tomato: ["leaf curl", "yellow mosaic", "wilting"]
// };

// export default function DiseaseDetect() {
//   const [crop, setCrop] = useState("wheat");
//   const [customCrop, setCustomCrop] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   function toggle(sym) {
//     setSelected(p =>
//       p.includes(sym) ? p.filter(s => s !== sym) : [...p, sym]
//     );
//   }

//   async function detect() {
//     if (selected.length === 0) {
//       setError("Select at least one symptom");
//       return;
//     }

//     const finalCrop = crop === "other" ? customCrop : crop;

//     const fd = new FormData();
//     fd.append("crop", finalCrop);
//     fd.append("symptoms", selected.join(","));
//     if (image) fd.append("image", image);

//     const res = await fetch("http://127.0.0.1:8000/disease/detect", {
//       method: "POST",
//       body: fd
//     });
//     const data = await res.json();
//     setResult(data);
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         <select value={crop} onChange={e => {
//           setCrop(e.target.value);
//           setSelected([]);
//         }}>
//           <option value="wheat">Wheat</option>
//           <option value="rice">Rice</option>
//           <option value="tomato">Tomato</option>
//           <option value="other">Other</option>
//         </select>

//         {crop === "other" && (
//           <input
//             placeholder="Enter crop name"
//             value={customCrop}
//             onChange={e => setCustomCrop(e.target.value)}
//           />
//         )}

//         <h4>Select Symptoms</h4>
//         {(SYMPTOMS[crop] || []).map(s => (
//           <label key={s} style={{ display: "block" }}>
//             <input
//               type="checkbox"
//               checked={selected.includes(s)}
//               onChange={() => toggle(s)}
//             /> {s}
//           </label>
//         ))}

//         <input type="file" onChange={e => {
//           setImage(e.target.files[0]);
//           setPreview(URL.createObjectURL(e.target.files[0]));
//         }} />

//         {preview && <img src={preview} alt="" width={200} />}

//         <button onClick={detect}>Detect Disease</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card">
//           <h3>{result.disease}</h3>
//           <p>Severity: {result.severity}</p>
//           <p>Confidence: {result.confidence}%</p>

//           {result.confidence_penalty > 0 && (
//             <p style={{ color: "#b71c1c" }}>
//               Confidence reduced due to limited crop data
//             </p>
//           )}

//           <h4>Reasons</h4>
//           <ul>{result.reasons.map((r,i)=><li key={i}>{r}</li>)}</ul>

//           <h4>Treatment</h4>
//           <ul>{result.treatment.map((t,i)=><li key={i}>{t}</li>)}</ul>
//         </div>
//       )}
//     </Layout>
//   );
// }


// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// const SYMPTOMS = [
//   "rust pustules",
//   "yellow leaves",
//   "brown spots",
//   "leaf curl",
//   "wilting",
//   "white powder",
//   "holes in leaves",
// ];

// export default function DiseaseDetect() {
//   const [crop, setCrop] = useState("wheat");
//   const [selected, setSelected] = useState([]);
//   const [manualSymptoms, setManualSymptoms] = useState("");
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function toggle(sym) {
//     setSelected((prev) =>
//       prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
//     );
//   }

//   async function detectDisease() {
//     setError("");
//     setResult(null);

//     const symptoms =
//       crop === "other"
//         ? manualSymptoms.split(",").map((s) => s.trim()).filter(Boolean)
//         : selected;

//     if (!crop || symptoms.length === 0) {
//       setError("Please select crop and at least one symptom");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("crop", crop);
//     symptoms.forEach((s) => formData.append("symptoms", s));
//     if (image) formData.append("image", image);

//     try {
//       setLoading(true);
//       const res = await post("/disease/detect", formData, true);
//       setResult(res);
//     } catch (e) {
//       setError("Disease detection failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         {/* Crop */}
//         <select value={crop} onChange={(e) => setCrop(e.target.value)}>
//           <option value="wheat">Wheat</option>
//           <option value="rice">Rice</option>
//           <option value="maize">Maize</option>
//           <option value="tomato">Tomato</option>
//           <option value="other">Other</option>
//         </select>

//         {/* Symptoms */}
//         <h4 style={{ marginTop: 12 }}>Symptoms</h4>

//         {crop !== "other" &&
//           SYMPTOMS.map((s) => (
//             <label key={s} style={{ display: "block" }}>
//               <input
//                 type="checkbox"
//                 checked={selected.includes(s)}
//                 onChange={() => toggle(s)}
//               />{" "}
//               {s}
//             </label>
//           ))}

//         {crop === "other" && (
//           <textarea
//             placeholder="Enter symptoms separated by commas"
//             value={manualSymptoms}
//             onChange={(e) => setManualSymptoms(e.target.value)}
//             style={{ width: "100%", marginTop: 8 }}
//           />
//         )}

//         {/* Image */}
//         <input
//           type="file"
//           accept="image/*"
//           style={{ marginTop: 12 }}
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         <button onClick={detectDisease} disabled={loading}>
//           {loading ? "Analyzing..." : "Detect Disease"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {/* Result */}
//         {result && (
//           <div style={{ marginTop: 24 }}>
//             <h3>{result.disease}</h3>
//             <p><strong>Severity:</strong> {result.severity}</p>

//             {/* Confidence */}
//             <div style={{ marginTop: 10 }}>
//               <strong>Confidence: {result.confidence}%</strong>
//               <div style={{ height: 8, background: "#eee", borderRadius: 6 }}>
//                 <div
//                   style={{
//                     width: `${result.confidence}%`,
//                     height: "100%",
//                     background: "#2e7d32",
//                     borderRadius: 6,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Reasons */}
//             <h4 style={{ marginTop: 16 }}>Why this result?</h4>
//             <ul>
//               {result.reasons.map((r, i) => (
//                 <li key={i}>{r}</li>
//               ))}
//             </ul>

//             {/* Treatment */}
//             <h4>Treatment</h4>
//             <ul>
//               {result.treatment.map((t, i) => (
//                 <li key={i}>{t}</li>
//               ))}
//             </ul>

//             {/* Prevention */}
//             <h4>Prevention</h4>
//             <ul>
//               {result.prevention.map((p, i) => (
//                 <li key={i}>{p}</li>
//               ))}
//             </ul>

//             {/* Disclaimer */}
//             <div
//               style={{
//                 marginTop: 20,
//                 padding: 12,
//                 background: "#fff8e1",
//                 borderRadius: 8,
//                 fontSize: 13,
//               }}
//             >
//               <strong>⚠️ Disclaimer</strong>
//               <p>{result.disclaimer}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// import { useState } from "react";
// import Layout from "../layout/Layout";

// const ALL_SYMPTOMS = [
//   "rust pustules",
//   "yellow leaves",
//   "brown spots",
//   "leaf curl",
//   "wilting",
//   "white powder",
//   "holes in leaves",
// ];

// export default function DiseaseDetection() {
//   const [crop, setCrop] = useState("wheat");
//   const [customCrop, setCustomCrop] = useState("");
//   const [symptoms, setSymptoms] = useState([]);
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   function toggle(sym) {
//     setSymptoms(prev =>
//       prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
//     );
//   }

//   async function detect() {
//     setError("");
//     setResult(null);

//     if (symptoms.length === 0) {
//       setError("Select at least one symptom");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("crop", crop === "other" ? customCrop : crop);
//     symptoms.forEach(s => formData.append("symptoms", s));
//     if (image) formData.append("image", image);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/disease/detect", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       setResult(data);
//     } catch {
//       setError("Disease detection failed");
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         <select value={crop} onChange={e => setCrop(e.target.value)}>
//           <option value="wheat">Wheat</option>
//           <option value="rice">Rice</option>
//           <option value="tomato">Tomato</option>
//           <option value="other">Other</option>
//         </select>

//         {crop === "other" && (
//           <input
//             placeholder="Enter crop name"
//             value={customCrop}
//             onChange={e => setCustomCrop(e.target.value)}
//           />
//         )}

//         <h4>Select Symptoms</h4>
//         {ALL_SYMPTOMS.map(s => (
//           <label key={s} style={{ display: "block" }}>
//             <input
//               type="checkbox"
//               checked={symptoms.includes(s)}
//               onChange={() => toggle(s)}
//             />{" "}
//             {s}
//           </label>
//         ))}

//         <input type="file" onChange={e => setImage(e.target.files[0])} />

//         <button onClick={detect}>Detect Disease</button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card" style={{ marginTop: 20 }}>
//           <h3>{result.disease}</h3>
//           <p><b>Severity:</b> {result.severity}</p>

//           <p><b>Confidence:</b> {result.confidence}%</p>
//           <div style={{ height: 8, background: "#eee", borderRadius: 6 }}>
//             <div
//               style={{
//                 width: `${result.confidence}%`,
//                 height: "100%",
//                 background: "#2e7d32",
//                 borderRadius: 6,
//               }}
//             />
//           </div>

//           <h4>Why this result?</h4>
//           <ul>{result.reasons.map((r, i) => <li key={i}>{r}</li>)}</ul>

//           <h4>Prevention</h4>
//           <ul>{result.prevention.map((p, i) => <li key={i}>{p}</li>)}</ul>

//           <h4>Treatment</h4>
//           <ul>{result.treatment.map((t, i) => <li key={i}>{t}</li>)}</ul>

//           <p style={{ fontStyle: "italic", marginTop: 10 }}>
//             ⚠️ {result.disclaimer}
//           </p>
//         </div>
//       )}
//     </Layout>
//   );
// }


// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";

// const SYMPTOMS = [
//   "leaf_spots",
//   "yellowing",
//   "wilting",
//   "dry_edges",
//   "white_powder",
//   "stunted_growth",
//   "root_decay",
// ];

// export default function DiseaseDetect() {
//   const [crop, setCrop] = useState("");
//   const [severity, setSeverity] = useState("mild");
//   const [symptoms, setSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function toggleSymptom(symptom) {
//     setSymptoms((prev) =>
//       prev.includes(symptom)
//         ? prev.filter((s) => s !== symptom)
//         : [...prev, symptom]
//     );
//   }

//   async function detect() {
//     setError("");
//     setResult(null);

//     if (!crop || symptoms.length === 0) {
//       setError("Enter crop name and select at least one symptom");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await post("/disease/detect", {
//         crop_name: crop,
//         symptoms,
//         severity,
//       });
//       setResult(res);
//     } catch (e) {
//       setError("Failed to detect disease");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         <input
//           placeholder="Crop name (any)"
//           value={crop}
//           onChange={(e) => setCrop(e.target.value)}
//         />

//         <label>Severity</label>
//         <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
//           <option value="mild">Mild</option>
//           <option value="moderate">Moderate</option>
//           <option value="severe">Severe</option>
//         </select>

//         <h4 style={{ marginTop: 14 }}>Symptoms</h4>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
//           {SYMPTOMS.map((s) => (
//             <label key={s} style={{ fontSize: 14 }}>
//               <input
//                 type="checkbox"
//                 checked={symptoms.includes(s)}
//                 onChange={() => toggleSymptom(s)}
//               />{" "}
//               {s.replace("_", " ")}
//             </label>
//           ))}
//         </div>

//         <button onClick={detect} disabled={loading}>
//           {loading ? "Analyzing..." : "Detect Disease"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card" style={{ marginTop: 20 }}>
//           <h3>{result.predicted_disease}</h3>

//           <div style={{ margin: "10px 0" }}>
//             <strong>Confidence: {result.confidence}%</strong>
//             <div
//               style={{
//                 height: 8,
//                 background: "#eee",
//                 borderRadius: 6,
//                 marginTop: 4,
//               }}
//             >
//               <div
//                 style={{
//                   width: `${result.confidence}%`,
//                   height: "100%",
//                   background: "#c0392b",
//                   borderRadius: 6,
//                 }}
//               />
//             </div>
//           </div>

//           <h4>Why?</h4>
//           <ul>
//             {result.reason_points.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>

//           {result.treatment.length > 0 && (
//             <>
//               <h4>Treatment</h4>
//               <ul>
//                 {result.treatment.map((t, i) => (
//                   <li key={i}>{t}</li>
//                 ))}
//               </ul>
//             </>
//           )}

//           {result.prevention.length > 0 && (
//             <>
//               <h4>Prevention</h4>
//               <ul>
//                 {result.prevention.map((p, i) => (
//                   <li key={i}>{p}</li>
//                 ))}
//               </ul>
//             </>
//           )}

//           <p style={{ marginTop: 12, fontSize: 13, color: "#777" }}>
//             ⚠️ {result.disclaimer}
//           </p>
//         </div>
//       )}
//     </Layout>
//   );
// }



// import { useState } from "react";
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";
// import { saveHistory, loadHistory } from "../utils/history";
// import { useEffect } from "react";

// function formatLabel(text) {
//   return text
//     .replace(/_/g, " ")
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

// function confidenceColor(value) {
//   if (value >= 70) return "#2e7d32"; // green
//   if (value >= 50) return "#f9a825"; // orange
//   return "#c62828"; // red
// }


// const SYMPTOMS = [
//   "leaf_spots",
//   "yellowing",
//   "wilting",
//   "dry_edges",
//   "white_powder",
//   "stunted_growth",
//   "root_decay",
//   "brown_patches",
//   "stem_darkening",
// ];

// export default function DiseaseDetect() {
//    // ✅ ALL hooks go here
//   const [crop, setCrop] = useState("");
//   const [severity, setSeverity] = useState("mild");
//   const [symptoms, setSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]); // ✅ FIX

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
   
//   // ✅ Image hooks ALSO go here
//  const [image, setImage] = useState(null);
//  const [preview, setPreview] = useState(null);

//  // ✅ FIX: load history on page load
//   useEffect(() => {
//     setHistory(loadHistory("disease"));
//   }, []);


//   function toggleSymptom(s) {
//     setSymptoms((prev) =>
//       prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
//     );
//   }
//   function handleImage(e) {
//   const file = e.target.files[0];
//   if (!file) return;

//   setImage(file);
//   setPreview(URL.createObjectURL(file));
// }


//   async function detectDisease() {
//     setError("");
//     setResult(null);

//     if (!crop || symptoms.length === 0) {
//       setError("Enter crop name and select symptoms");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await post("/disease/detect", {
//         crop_name: crop,
//         symptoms,
//         severity,
//       });
//       setResult(res);
//        // ✅ FIX: save user-wise history
//       saveHistory("disease", {
//         crop,
//         severity,
//         symptoms,
//         disease: res.predicted_disease,
//         confidence: res.confidence,
//         imageUsed: Boolean(image),
//       });
//       setHistory(loadHistory("disease")); // refresh history
//     } catch (e) {
//       setError("Failed to detect disease");
//     } finally {
//       setLoading(false);
//     }
    
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">

//         <input
//           placeholder="Crop name (any crop)"
//           value={crop}
//           onChange={(e) => setCrop(e.target.value)}
//         />
//         <div style={{ marginTop: 14 }}>
//   <label style={{ fontWeight: 600 }}>
//     Upload Leaf Image (optional)
//   </label>

//   <input
//     type="file"
//     accept="image/*"
//     onChange={handleImage}
//     style={{ display: "block", marginTop: 6 }}
//   />

//   {preview && (
//     <img
//       src={preview}
//       alt="Leaf preview"
//       style={{
//         marginTop: 10,
//         width: "100%",
//         maxHeight: 220,
//         objectFit: "contain",
//         borderRadius: 10,
//         border: "1px solid #ddd",
//       }}
//     />
//   )}
// </div>
// <label>Severity</label>
//         <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
//           <option value="mild">Mild</option>
//           <option value="moderate">Moderate</option>
//           <option value="severe">Severe</option>
//         </select>

//         <h4 style={{ marginTop: 12 }}>Symptoms</h4>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
//           {SYMPTOMS.map((s) => (
//             <label key={s}>
//               <input
//                 type="checkbox"
//                 checked={symptoms.includes(s)}
//                 onChange={() => toggleSymptom(s)}
//               />{" "}
//               {s.replace("_", " ")}
//             </label>
//           ))}
//         </div>

//         <button onClick={detectDisease} disabled={loading}>
//           {loading ? "Analyzing..." : "Detect Disease"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div
//   className="card"
//   style={{
//     marginTop: 24,
//     borderRadius: 16,
//     background: "linear-gradient(135deg, #ffffff, #f4f9f4)",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   }}
// >


//     {/* Disease title */}
//     <h2 style={{ marginBottom: 6 }}>
//       {result.predicted_disease}
//     </h2>

//     {/* Confidence */}
//     <div style={{ marginBottom: 14 }}>
//       <strong>Confidence: {result.confidence}%</strong>
//       <div
//         style={{
//           height: 10,
//           background: "#eee",
//           borderRadius: 8,
//           marginTop: 6,
//         }}
//       >
//         <div
//           style={{
//             width: `${result.confidence}%`,
//             height: "100%",
//             background: confidenceColor(result.confidence),
//             borderRadius: 8,
//           }}
//         />
//       </div>
//     </div>

//     {/* Reasons */}
//     <h4>Why this disease?</h4>
//     <ul>
//       {result.reason_points.map((r, i) => (
//         <li key={i}>{r}</li>
//       ))}
//     </ul>

//     {/* Treatment */}
//     {result.treatment.length > 0 && (
//       <>
//         <h4>Treatment</h4>
//         <ul>
//           {result.treatment.map((t, i) => (
//             <li key={i}>{t}</li>
//           ))}
//         </ul>
//       </>
//     )}

//     {/* Prevention */}
//     {result.prevention.length > 0 && (
//       <>
//         <h4>Prevention</h4>
//         <ul>
//           {result.prevention.map((p, i) => (
//             <li key={i}>{p}</li>
//           ))}
//         </ul>
//       </>
//     )}

//     {/* Input Summary */}
//     <div
//       style={{
//         marginTop: 18,
//         padding: 12,
//         background: "#f7f7f7",
//         borderRadius: 8,
//         fontSize: 14,
//       }}
//     >
//       <strong>Input Summary</strong>
//       <p>Crop: {crop}</p>
//       <p>Severity: {formatLabel(severity)}</p>
//       <p>Symptoms: {symptoms.map(formatLabel).join(", ")}</p>
//     </div>

//     {/* Disclaimer */}
//     <p
//       style={{
//         marginTop: 12,
//         fontSize: 13,
//         color: "#777",
//       }}
//     >
//       ⚠️ {result.disclaimer}
//     </p>
//   </div>
// )}

//     </Layout>
//   );
// }
// it is prevoius one



// import { useState, useEffect } from "react"; // ✅ FIX: added useEffect
// import Layout from "../layout/Layout";
// import { post } from "../utils/api";
// import { saveHistory, loadHistory } from "../utils/history";

// function formatLabel(text) {
//   return text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
// }

// function confidenceColor(value) {
//   if (value >= 70) return "#2e7d32";
//   if (value >= 50) return "#f9a825";
//   return "#c62828";
// }

// const SYMPTOMS = [
//   "leaf_spots",
//   "yellowing",
//   "wilting",
//   "dry_edges",
//   "white_powder",
//   "stunted_growth",
//   "root_decay",
//   "brown_patches",
//   "stem_darkening",
// ];

// export default function DiseaseDetect() {
//   // ✅ Hooks ONLY here
//   const [crop, setCrop] = useState("");
//   const [severity, setSeverity] = useState("mild");
//   const [symptoms, setSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]); // ✅ FIX
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // ✅ FIX: load history on page load
//   useEffect(() => {
//     setHistory(loadHistory("disease"));
//   }, []);

//   function toggleSymptom(s) {
//     setSymptoms((prev) =>
//       prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
//     );
//   }

//   function handleImage(e) {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   }

//   async function detectDisease() {
//     setError("");
//     setResult(null);

//     if (!crop || symptoms.length === 0) {
//       setError("Enter crop name and select symptoms");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await post("/disease/detect", {
//         crop_name: crop,
//         symptoms,
//         severity,
//       });

//       setResult(res);

//       // ✅ FIX: save user-wise history
//       saveHistory("disease", {
//         crop,
//         severity,
//         symptoms,
//         disease: res.predicted_disease,
//         confidence: res.confidence,
//         imageUsed: Boolean(image),
//       });

//       setHistory(loadHistory("disease")); // refresh history
//     } catch (e) {
//       setError("Failed to detect disease");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <div className="card">
//         <input
//           placeholder="Crop name (any crop)"
//           value={crop}
//           onChange={(e) => setCrop(e.target.value)}
//         />

//         <label style={{ marginTop: 10 }}>Upload Leaf Image (optional)</label>
//         <input type="file" accept="image/*" onChange={handleImage} />

//         {preview && (
//           <img
//             src={preview}
//             alt="preview"
//             style={{ width: "100%", marginTop: 10, borderRadius: 10 }}
//           />
//         )}

//         <label>Severity</label>
//         <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
//           <option value="mild">Mild</option>
//           <option value="moderate">Moderate</option>
//           <option value="severe">Severe</option>
//         </select>

//         <h4>Symptoms</h4>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
//           {SYMPTOMS.map((s) => (
//             <label key={s}>
//               <input
//                 type="checkbox"
//                 checked={symptoms.includes(s)}
//                 onChange={() => toggleSymptom(s)}
//               />{" "}
//               {formatLabel(s)}
//             </label>
//           ))}
//         </div>

//         <button onClick={detectDisease} disabled={loading}>
//           {loading ? "Analyzing..." : "Detect Disease"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {result && (
//         <div className="card" style={{ marginTop: 24 }}>
//           <h2>{result.predicted_disease}</h2>

//           <strong>Confidence: {result.confidence}%</strong>
//           <div style={{ height: 8, background: "#eee", borderRadius: 6 }}>
//             <div
//               style={{
//                 width: `${result.confidence}%`,
//                 height: "100%",
//                 background: confidenceColor(result.confidence),
//               }}
//             />
//           </div>

//           <h4>Why this disease?</h4>
//           <ul>
//             {result.reason_points.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>

//           <p style={{ fontSize: 13, color: "#777" }}>
//             ⚠️ {result.disclaimer}
//           </p>
//         </div>
//       )}
//     </Layout>
//   );
// }


import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { post } from "../utils/api";
import { saveHistory, loadHistory } from "../utils/history";
import "../styles/DiseaseDetect.css";

function formatLabel(text) {
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function confidenceColor(value) {
  if (value >= 70) return "#2e7d32"; // green
  if (value >= 50) return "#f9a825"; // orange
  return "#c62828"; // red
}

const SYMPTOMS = [
  "leaf_spots",
  "yellowing",
  "wilting",
  "dry_edges",
  "white_powder",
  "stunted_growth",
  "root_decay",
  "brown_patches",
  "stem_darkening",
];

export default function DiseaseDetect() {
  // State management
  const [crop, setCrop] = useState("");
  const [severity, setSeverity] = useState("mild");
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load history on component mount
  useEffect(() => {
    setHistory(loadHistory("disease"));
  }, []);

  function toggleSymptom(s) {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function detectDisease() {
    setError("");
    setResult(null);

    if (!crop || symptoms.length === 0) {
      setError("Please enter crop name and select at least one symptom");
      return;
    }

    setLoading(true);
    try {
      const res = await post("/disease/detect", {
        crop_name: crop,
        symptoms,
        severity,
      });
      setResult(res);
      
      // Save to history
      saveHistory("disease", {
        crop,
        severity,
        symptoms,
        disease: res.predicted_disease,
        confidence: res.confidence,
        imageUsed: Boolean(image),
      });
      setHistory(loadHistory("disease"));
    } catch (e) {
      setError("Failed to detect disease. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="disease-detect-container">
        <h2>🌱 Disease Detection</h2>

        <div className="card">
          <label>Crop Name</label>
          <input
            type="text"
            placeholder="Enter crop name (e.g., Tomato, Wheat, Rice)"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          />

          <div style={{ marginTop: 14 }}>
            <label>Upload Leaf Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: "block", marginTop: 6 }}
            />

            {preview && (
              <img
                src={preview}
                alt="Leaf preview"
                className="image-preview"
              />
            )}
          </div>

          <label>Severity Level</label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>

          <h4>Select Symptoms</h4>
          <div className="symptoms-grid">
            {SYMPTOMS.map((s) => (
              <label key={s}>
                <input
                  type="checkbox"
                  checked={symptoms.includes(s)}
                  onChange={() => toggleSymptom(s)}
                />
                <span>{formatLabel(s)}</span>
              </label>
            ))}
          </div>

          <button onClick={detectDisease} disabled={loading}>
            {loading ? "Analyzing..." : "🔍 Detect Disease"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>

        {result && (
          <div className="card result-card">
            {/* Disease Title */}
            <h2>{result.predicted_disease}</h2>

            {/* Confidence Bar */}
            <div className="confidence-container">
              <strong>Confidence: {result.confidence}%</strong>
              <div className="confidence-bar-bg">
                <div
                  className="confidence-bar-fill"
                  style={{
                    width: `${result.confidence}%`,
                    background: confidenceColor(result.confidence),
                  }}
                />
              </div>
            </div>

            {/* Reasons */}
            <h4>Why this disease?</h4>
            <ul>
              {result.reason_points.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            {/* Treatment */}
            {result.treatment && result.treatment.length > 0 && (
              <>
                <h4>💊 Treatment</h4>
                <ul>
                  {result.treatment.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Prevention */}
            {result.prevention && result.prevention.length > 0 && (
              <>
                <h4>🛡️ Prevention</h4>
                <ul>
                  {result.prevention.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Input Summary */}
            <div className="input-summary">
              <strong>Input Summary</strong>
              <p><strong>Crop:</strong> {crop}</p>
              <p><strong>Severity:</strong> {formatLabel(severity)}</p>
              <p><strong>Symptoms:</strong> {symptoms.map(formatLabel).join(", ")}</p>
              {image && <p><strong>Image:</strong> Uploaded ✓</p>}
            </div>

            {/* Disclaimer */}
            {result.disclaimer && (
              <div className="disclaimer">
                ⚠️ {result.disclaimer}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

