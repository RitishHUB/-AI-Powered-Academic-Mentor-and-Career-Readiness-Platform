import React, { useState, useRef } from "react";
import "./Gate.css";

// GATE Books / Study Material
const gateBooks = [
  {
    class: "Engineering Mathematics",
    subjects: [
      { title: "Linear Algebra", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Calculus", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Probability & Statistics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Complex Analysis", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "General Aptitude",
    subjects: [
      { title: "Verbal Ability", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Quantitative Aptitude", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Logical Reasoning", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "Technical Subjects",
    subjects: [
      { title: "Computer Science & IT", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Electronics & Communication", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Mechanical Engineering", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Electrical Engineering", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
];

// GATE Syllabus
const syllabus = [
  { title: "Engineering Mathematics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "General Aptitude", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Computer Science & IT", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Electronics & Communication", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Mechanical Engineering", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Electrical Engineering", link: "https://drive.google.com/file/d/empty_link_id/preview" },
];

const Gate = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const viewerRef = useRef(null);
 const handleOpen = async (book) => {
  try {
    let bookId;

    // Decide which bookId to fetch from backend
    if (book.title === "10th Tamil") {
      bookId = "1";
    } else if (book.title === "10th English") {
      bookId = "2";
    } else {
      // For all other books, just pick 10th Tamil as default
      bookId = "1";
    }

    const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
    const data = await res.json();

    if (data.url) {
      setSelectedLink(data.url);
    } else {
      alert("Book URL not found");
    }
  } catch (err) {
    console.error("Error fetching book:", err);
    alert("Failed to fetch book from backend");
  }

  // Scroll viewer into view
  setTimeout(() => {
    viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 200);
};



  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "No response from AI");
      setQuestion("");
    } catch (err) {
      setAnswer("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="gate-container">
      <h1 className="gate-title">📚 GATE Study Zone</h1>

      {/* Books Sections */}
      {gateBooks.map((group, i) => (
        <div key={i} className="class-section">
          <h2 className="class-title">{group.class}</h2>
          <div className="book-grid">
            {group.subjects.map((book, idx) => (
              <div key={idx} className="book-card">
                <h3 className="book-name">{book.title}</h3>
                <button className="open-btn" onClick={() => handleOpen(book.link)}>
                  Open Book
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Syllabus Section */}
      <div className="syllabus-section">
        <h2 className="class-title">📝 GATE Syllabus</h2>
        <div className="book-grid">
          {syllabus.map((item, idx) => (
            <div key={idx} className="book-card">
              <h3 className="book-name">{item.title}</h3>
              <button className="open-btn" onClick={() => handleOpen(item.link)}>
                Open Syllabus
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer */}
      {selectedLink && (
        <div className="pdf-section" ref={viewerRef}>
          <h2 className="viewer-title">📖 PDF Viewer</h2>
          <iframe
            src={selectedLink}
            width="100%"
            height="600px"
            allow="autoplay"
            title="GATE PDF"
            className="pdf-frame"
          ></iframe>
        </div>
      )}

      {/* Floating AI Button */}
      <div className="floating-ai-btn" onClick={() => setAiOpen(!aiOpen)}>🤖</div>

      {/* AI Drawer */}
      <div className={`ai-drawer ${aiOpen ? "open" : ""}`}>
        <div className="ai-header">
          Ask GATE AI
          <button className="close-btn" onClick={() => setAiOpen(false)}>×</button>
        </div>
        <div className="ai-content">
          <textarea
            placeholder="Type your doubt..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={askAI} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </button>
          {answer && <div className="ai-response"><strong>AI:</strong> <div className="bot-msg">{answer}</div></div>}
        </div>
      </div>

      {/* Overlay */}
      {aiOpen && <div className="drawer-overlay" onClick={() => setAiOpen(false)}></div>}
    </div>
  );
};

export default Gate;
