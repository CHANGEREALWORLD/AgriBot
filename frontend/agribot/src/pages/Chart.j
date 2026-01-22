export default function ChartCard({ data }) {
  return (
    <div className="card">
      <h4>Weekly Yield Prediction</h4>
      {/* Plug into chart library OR render simple SVG/lines */}
      <p>Data points: {data.join(", ")}</p>
    </div>
  );
}
