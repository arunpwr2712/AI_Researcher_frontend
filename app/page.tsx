// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "../components/UploadForm";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";

export default function Home() {
  const [summaries, setSummaries] = useState<any[]>([]);




  useEffect(() => {
    console.log("Pinging backend to check readiness...");
   let cancelled = false;
    const pollPing = async () => {
      try {
        // const res = await axios.get('http://localhost:8000/ping');
        const res = await axios.get('https://ai-researcher-backend.onrender.com/ping');
        if (res.data.status === 'ready') {
          if (!cancelled) {
            console.log('Backend is ready');
          }
        } else {
          setTimeout(pollPing, 2000);
        }
      } catch {
        setTimeout(pollPing, 2000);
      }
    };

    pollPing();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    // axios.post("http://localhost:8000/refresh", {
    axios.post("https://ai-researcher-backend.onrender.com/refresh", {
      flag: "page_refreshed"
    }).catch(err => console.error("Refresh flag failed:", err));
  }, []);


  return (
    <div className="p-4">
      <h1>AI Research Survey</h1>
      <UploadForm onUploaded={(s) => setSummaries(s)} />
      <SearchForm onResults={(s) => setSummaries(s)} />
      <ResultsList summaries={summaries} />
    </div>
  );
}
