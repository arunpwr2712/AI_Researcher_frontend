"use client";


function renderValue(value: any): React.ReactNode {
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
      // Nested table for array of objects
      return (
        <table style={{ borderCollapse: "collapse", background: "#fafbfc", margin: "0.5rem 0" }}>
          <thead>
            <tr>
              {Object.keys(value[0]).map((k, i) => (
                <th key={i} style={{ border: "1px solid #eee", padding: "0.25rem" }}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.map((item, idx) => (
              <tr key={idx}>
                {Object.values(item).map((v, i) => (
                  <td key={i} style={{ border: "1px solid #eee", padding: "0.25rem" }}>{String(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return value.join(", ");
  } else if (typeof value === "object" && value !== null) {
    // Nested table for dict
    return (
      <table style={{ borderCollapse: "collapse", background: "#fafbfc", margin: "0.5rem 0" }}>
        <tbody>
          {Object.entries(value).map(([k, v], i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #eee", padding: "0.25rem", fontWeight: 500 }}>{k}</td>
              <td style={{ border: "1px solid #eee", padding: "0.25rem" }}>{String(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return String(value);
}

export default function ResultsList({ summaries }: { summaries: any[] }) {
  if (!summaries || summaries.length === 0) {
    return <div>No results found.</div>;
  }
  return (
    <div style={{ marginTop: "1rem" }}>
        {summaries.map((s, idx) => {
          const summary = s.summary;
          if (!summary || typeof summary !== "object") return null;
          return (
            <div key={idx} style={{ marginBottom: "2rem", background: "#fff", border: "1px solid #eee", borderRadius: "8px", padding: "1rem" }}>
              <h3 style={{ marginBottom: "1rem" }}>Summary {idx + 1}</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f5f5f5" }}>
                    <th style={{ padding: "0.5rem", border: "1px solid #eee", width: "20%" }}>Field</th>
                    <th style={{ padding: "0.5rem", border: "1px solid #eee" }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summary).map(([key, value], i) => (
                    <tr key={i}>
                      <td style={{ padding: "0.5rem", border: "1px solid #eee", fontWeight: 500 }}>{key}</td>
                      <td style={{ padding: "0.5rem", border: "1px solid #eee" }}>{Array.isArray(value) ? value.join(", ") : String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
}
