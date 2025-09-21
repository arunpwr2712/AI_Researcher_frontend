"use client";

import { useState } from "react";
import { uploadPDFs, searchPapers, downloadDocx, downloadPdf } from "../utils/api";

interface UploadFormProps {
  onUploaded: (summaries: any[]) => void;
}


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ai-researcher-backend.onrender.com";
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function UploadForm({ onUploaded }: UploadFormProps) {
  const [loading, setLoading] = useState(false);

  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLoading(true);
    try {
      const files = Array.from(e.target.files);
      await uploadPDFs(files);
      const summaryRes = await searchPapers("", undefined, undefined, "uploads");
      onUploaded(summaryRes.data.summaries || []);
      setDocxUrl(summaryRes.data.docx_url || null);
      setPdfUrl(`${API_BASE}/download_summary/?type=pdf` || null);
    } catch (err) {
      console.error("Upload error:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px", background: "#fafbfc" }}>
      <label style={{ fontWeight: 500, fontSize: "1.1rem" }}>Upload PDF(s) to Summarize</label>
      <input type="file" multiple accept="application/pdf" onChange={handleUpload} style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }} />
      {loading && <p style={{ color: "#0070f3" }}>Uploading & Summarizing...</p>}
      <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        
        {pdfUrl && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {(() => {
              let filename = pdfUrl.replace(/^.*[\\/]/, "");
              if (!filename) filename = "paper_summary.pdf";
              const viewLink = `/viewsummarypdf?file=${encodeURIComponent(filename)}`;
              const downloadLink = pdfUrl;
              return (
                <>
                  <button
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = downloadLink;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      style={{  color: "#fff", background: "#0070f3", border: "none", borderRadius: "4px", padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 500 }}
                    >
                      Download PDF
                    </button>
                </>
              );
            })()}
            <button
              onClick={() => window.location.href = "/chat"}
              style={{ color: "#fff", background: "#0070f3", border: "none", borderRadius: "4px", padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 500 }}
            >
              Chat with PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
