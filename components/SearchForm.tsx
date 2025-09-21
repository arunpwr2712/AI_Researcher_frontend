"use client";

import { useState } from "react";
import { searchPapers } from "../utils/api";

interface SearchFormProps {
  onResults: (summaries: any[]) => void;
}


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ai-researcher-backend.onrender.com";
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SearchForm({ onResults }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const [includePrivate, setIncludePrivate] = useState(false);
  const [source, setSource] = useState<"uploads" | "scraping">("scraping");
  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleSearch = async () => {
    const res = await searchPapers(query, limit, includePrivate, "scraping");
    onResults(res.data.results || res.data.summaries || []);
    setDocxUrl(res.data.docx_url || null);
    setPdfUrl(`${API_BASE}/download_summary/?type=pdf` || null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px", background: "#fafbfc" }}>
      <label style={{ fontWeight: 500, fontSize: "1.1rem" }}>Search Papers or Summarize Uploads</label>
      <input
        type="text"
        placeholder="Search topic or query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%", maxWidth: "400px" }}
      />
      <input
        type="number"
        min={1}
        max={20}
        value={limit}
        onChange={e => setLimit(Number(e.target.value))}
        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%", maxWidth: "400px" }}
        placeholder="Limit per source"
      />
      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          checked={includePrivate}
          onChange={e => setIncludePrivate(e.target.checked)}
        />
        Include Private
      </label>
      <button onClick={handleSearch} style={{ background: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", padding: "0.5rem 1.5rem", fontWeight: 500, cursor: "pointer" }}>Search</button>
      

        
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
  );
}
