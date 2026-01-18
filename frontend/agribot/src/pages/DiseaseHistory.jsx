// import { useEffect, useState } from "react";
// import Layout from "../layout/Layout";

// export default function DiseaseHistory() {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/disease/history")
//       .then(r => r.json())
//       .then(setHistory);
//   }, []);

//   return (
//     <Layout>
//       <h2>Disease History</h2>

//       {history.map(h => (
//         <div key={h.id} className="card">
//           <h4>{h.disease}</h4>
//           <p>{new Date(h.timestamp).toLocaleString()}</p>
//           {h.image_path && (
//             <img
//               src={`http://127.0.0.1:8000/${h.image_path}`}
//               width={120}
//             />
//           )}
//         </div>
//       ))}
//     </Layout>
//   );
// }


// i




// import { useState } from "react";
// import Layout from "../layout/Layout";

// export default function DiseaseDetect() {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   function handleImageChange(e) {
//     setImage(e.target.files[0]);
//   }

//   async function handleDetect() {
//     if (!image) {
//       alert("Please upload an image");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/disease/detect", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       console.error("Detection failed", err);
//       alert("Disease detection failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <input type="file" accept="image/*" onChange={handleImageChange} />

//       <button onClick={handleDetect} disabled={loading}>
//         {loading ? "Detecting..." : "Detect Disease"}
//       </button>

//       {result && (
//         <div className="card">
//           <p><strong>Disease:</strong> {result.disease}</p>
//           <p><strong>Confidence:</strong> {result.confidence}%</p>
//         </div>
//       )}
//     </Layout>
//   );
// }


// 

// import { useState } from "react";
// import Layout from "../layout/Layout";

// export default function DiseaseDetect() {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   function handleImageChange(e) {
//     setImage(e.target.files[0]);
//   }

//   async function handleDetect() {
//     if (!image) {
//       alert("Please upload an image");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/disease/detect", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       console.error("Detection failed", err);
//       alert("Disease detection failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Layout>
//       <h2>Disease Detection</h2>

//       <input type="file" accept="image/*" onChange={handleImageChange} />

//       <button onClick={handleDetect} disabled={loading}>
//         {loading ? "Detecting..." : "Detect Disease"}
//       </button>

//       {result && (
//         <div className="card">
//           <p><strong>Disease:</strong> {result.disease}</p>
//           <p><strong>Confidence:</strong> {result.confidence}%</p>
//         </div>
//       )}
//     </Layout>
//   );
// }



import { useState } from "react";
import Layout from "../layout/Layout";

export default function DiseaseDetect() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleDetect() {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:8000/disease/detect", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Disease detection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h2>Disease Detection</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleDetect} disabled={loading}>
        {loading ? "Detecting..." : "Detect Disease"}
      </button>

      {result && (
        <div className="card">
          <p><strong>Disease:</strong> {result.disease}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
        </div>
      )}
    </Layout>
  );
}
