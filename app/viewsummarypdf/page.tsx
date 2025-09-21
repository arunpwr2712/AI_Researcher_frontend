"use client";


import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ai-researcher-backend.onrender.com";
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ViewSummaryPDFPage() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [docxUrl, setDocxUrl] = useState<string>("");
  const [viewType, setViewType] = useState<"pdf" | "docx">("pdf");

  useEffect(() => {
    // Use the correct endpoints for summary PDF and DOCX
    setPdfUrl(`${API_BASE}/download_summary/?type=pdf`);
    setDocxUrl(`${API_BASE}/download_summary/?type=docx`);
  }, []);

  return (
    <div className="p-4">
      <h1>Summary Viewer</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setViewType("pdf")}
          style={{ background: viewType === "pdf" ? "#0070f3" : "#eee", color: viewType === "pdf" ? "#fff" : "#333", border: "none", borderRadius: "4px", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          View PDF
        </button>
        <button
          onClick={() => setViewType("docx")}
          style={{ background: viewType === "docx" ? "#0070f3" : "#eee", color: viewType === "docx" ? "#fff" : "#333", border: "none", borderRadius: "4px", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          View DOCX
        </button>
      </div>
      {viewType === "pdf" ? (
        pdfUrl ? (
          <div style={{ width: "100%", height: "80vh", border: "1px solid #eee" }}>
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          </div>
        ) : <p>Loading PDF...</p>
      ) : (
        docxUrl ? (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(docxUrl)}`}
            title="DOCX Viewer"
            width="100%"
            height="600px"
            style={{ border: "1px solid #eee" }}
          />
        ) : <p>Loading DOCX...</p>
      )}
      <div style={{ marginTop: "1rem" }}>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ marginRight: "1rem" }}>
          Download PDF
        </a>
        <a href={docxUrl} target="_blank" rel="noopener noreferrer">
          Download DOCX
        </a>
      </div>
    </div>
  );
}
