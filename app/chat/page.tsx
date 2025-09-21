"use client";

import { useState } from "react";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);

  async function handleChat(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setMessages((msgs) => [...msgs, { sender: "user", text: question }]);
    setAnswer("");
    try {
      // const res = await fetch("http://localhost:8000/chat_pdfs", {
      const res = await fetch("https://ai-researcher-backend.onrender.com/chat_pdfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_query: question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "No answer returned.");
      setMessages((msgs) => [...msgs, { sender: "bot", text: data.answer || "No answer returned." }]);
    } catch (err) {
      setAnswer("Error: " + err);
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Error: " + err }]);
    }
    setLoading(false);
    setQuestion("");
  }

  
  return (
    <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "2rem", border: "1px solid #eee", borderRadius: 8, background: "#fafbfc", display: "flex", flexDirection: "column", height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Chat with PDF</h1>
      <div style={{ flex: 1, overflowY: "auto", margin: "1rem 0", padding: "1rem", background: "#f5f5f5", borderRadius: 8, border: "1px solid #eee" }}>
        {messages.length === 0 && <div style={{ color: "#888", textAlign: "center" }}>No messages yet. Ask a question!</div>}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "0.75rem"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "0.75rem 1rem",
                borderRadius: "18px",
                background: msg.sender === "user" ? "#0070f3" : "#fff",
                color: msg.sender === "user" ? "#fff" : "#333",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                fontSize: "1rem",
                wordBreak: "break-word", 
                whiteSpace: 'pre-wrap'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleChat} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "auto" }}>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "0.75rem", borderRadius: 18, border: "1px solid #ccc", fontSize: "1rem" }}
          required
        />
        <button
          type="submit"
          disabled={loading || !question}
          style={{ background: "#0070f3", color: "#fff", border: "none", borderRadius: 18, padding: "0.75rem 1.5rem", cursor: "pointer", fontWeight: 500, fontSize: "1rem" }}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
