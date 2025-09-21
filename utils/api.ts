// utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://ai-researcher-backend.onrender.com"
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  // timeout: 120000,
});

export const uploadPDFs = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return API.post("/upload_pdfs/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// GET /analyze/?query=...&limit_per_source=5&include_private=false&source=scraping
// Accept either (query, limit, include_private, source) or a params object
export const searchPapers = async (
  query: string,
  limit_per_source: number = 5,
  include_private: boolean = false,
  source: string = "scraping"
) => {
  return API.get("/analyze/", {
    params: { query, limit_per_source, include_private, source },
  });
};

// POST /chat_pdfs/?user_query=...
export const chatWithPDF = async (user_query: string) => {
  return API.post("/chat_pdfs/", { user_query });
};

export const downloadDocx = () => API.get("/download/paper_summary.docx", { responseType: "blob" });
export const downloadPdf = () => API.get("/download/paper_summary.pdf", { responseType: "blob" });

export default API;
