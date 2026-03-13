import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AiPage.css";

export default function AiPage({ token, onLogout }) {
  const [question, setQuestion] = useState("");
  const [isSocraticMode, setIsSocraticMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Hello! I am Learnixx AI, your personal academic assistant. How can I help you studying today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Handle Mode Switch
  const toggleMode = () => {
    setIsSocraticMode(!isSocraticMode);
    // Reset chat context on switch
    setChatHistory([
      {
        role: "ai",
        text: !isSocraticMode
          ? "Welcome to Socratic Mentor Mode. I won't give you the direct answers, but I will guide you to find them yourself. What concept are you struggling with?"
          : "Hello! I am Learnixx AI, your personal academic assistant. How can I help you studying today?"
      }
    ]);
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const askAI = async () => {
    if (!question.trim()) return;

    // Add user message to UI immediately
    const userMessage = { role: "user", text: question };
    setChatHistory(prev => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const endpoint = isSocraticMode ? "http://localhost:5000/api/socratic-ai" : "http://localhost:5000/api/ai";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined
        },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        data = { answer: "Backend returned invalid response." };
      }

      setChatHistory(prev => [...prev, { role: "ai", text: data.answer || "No response received." }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: "ai", text: "Error: " + err.message }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  return (
    <div className={`ai-layout ${isSocraticMode ? 'socratic-theme' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <h2 className="logo">Learnixx</h2>
        </div>
        <div className="menu">
          <button className="menu-btn" type="button" onClick={() => navigate('/main')}>
            <span className="icon">📚</span> Academics
          </button>
          <button className="menu-btn" type="button" onClick={() => navigate('/quiz')}>
            <span className="icon">⚡</span> Quiz
          </button>
          <button className="menu-btn active" type="button">
            <span className="icon">🤖</span> AI Assistant
          </button>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <main className="ai-main-content">
        <header className="ai-header">
          <div className="ai-header-info">
            <h1>{isSocraticMode ? "Socratic Mentor" : "Learnixx AI"}</h1>
            <p>{isSocraticMode ? "Anti-Spoofing Guided Learning" : "Powered by Cohere"}</p>
          </div>

          <div className="mode-toggle-container">
            <span className={`mode-label ${!isSocraticMode ? 'active' : ''}`}>Standard</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isSocraticMode}
                onChange={toggleMode}
              />
              <span className="slider round"></span>
            </label>
            <span className={`mode-label socratic ${isSocraticMode ? 'active' : ''}`}>Socratic Mentor</span>
          </div>
        </header>

        <div className="chat-window">
          <div className="messages-container">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.role}`}>
                <div className={`message-bubble ${msg.role}`}>
                  {msg.role === "ai" && <span className="ai-icon">{isSocraticMode ? "🦉" : "🤖"}</span>}
                  <div className="message-text">
                    {/* Basic newline rendering */}
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message-wrapper ai">
                <div className="message-bubble ai typing">
                  <span className="ai-icon">{isSocraticMode ? "🦉" : "🤖"}</span>
                  <div className="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <div className="input-box">
              <textarea
                placeholder="Ask your study questions here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button
                className="send-btn"
                onClick={askAI}
                disabled={loading || !question.trim()}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="input-footer text-xs text-center mt-2 text-slate-400">
              AI can make mistakes. Verify important information with your professors.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
