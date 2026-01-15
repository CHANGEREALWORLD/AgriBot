import { useEffect, useState } from "react";
import Layout from "../layout/Layout";

export default function DiseaseHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/disease/history")
      .then(r => r.json())
      .then(setHistory);
  }, []);

  return (
    <Layout>
      <h2>Disease History</h2>

      {history.map(h => (
        <div key={h.id} className="card">
          <h4>{h.disease}</h4>
          <p>{new Date(h.timestamp).toLocaleString()}</p>
          {h.image_path && (
            <img
              src={`http://127.0.0.1:8000/${h.image_path}`}
              width={120}
            />
          )}
        </div>
      ))}
    </Layout>
  );
}
