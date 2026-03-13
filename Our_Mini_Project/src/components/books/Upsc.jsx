import React, { useState, useRef } from "react";
import "./Upsc.css";

const upscBooks = [
  {
    class: "Prelims – General Studies",
    subjects: [
      { title: "History of India", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Indian Polity", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Geography", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Economy", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Environment & Ecology", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "Prelims – CSAT / Aptitude",
    subjects: [
      { title: "Comprehension", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Logical Reasoning", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Basic Numeracy", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "Mains – Optional Subjects",
    subjects: [
      { title: "Political Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Public Administration", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Sociology", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "History", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },

];

const syllabus = [
   { title: "History of India", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Indian Polity", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Geography", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Economy", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Environment & Ecology", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "CSAT / Aptitude", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Optional Subjects", link: "https://drive.google.com/file/d/empty_link_id/preview" },
];

const Upsc = ({ token, onLogout }) => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

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
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined
        },
        body: JSON.stringify({ prompt: question }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        data = { answer: "Backend returned invalid response (HTML or error)" };
      }

      setAnswer(data.answer || "No response from AI");
      setQuestion("");
    } catch (err) {
      setAnswer("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="upsc-container">
      <h1 className="upsc-title">📚 UPSC Study Zone</h1>

      {/* Books Sections */}
      {upscBooks.map((group, i) => (
        <div key={i} className="class-section">
          <h2 className="class-title">{group.class}</h2>
          <div className="book-grid">
            {group.subjects.map((book, index) => (
              <div key={index} className="book-card">
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
        <h2 className="class-title">📝 UPSC Syllabus</h2>
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
            title="UPSC PDF"
            className="pdf-frame"
          ></iframe>
        </div>
      )}

      {/* Floating AI Button */}
      <div
        className="floating-ai-btn"
        onClick={() => setIsAiOpen(!isAiOpen)}
      >
        🤖
      </div>

      {/* AI Side Drawer */}
      <div className={`ai-drawer ${isAiOpen ? "open" : ""}`}>
        <div className="ai-header">
          <h2>AI Assistant</h2>
          {onLogout && <button className="close-btn" onClick={() => setIsAiOpen(false)}>✖</button>}
        </div>
        <div className="ai-content">
          <textarea
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={askAI} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </button>
          {answer && (
            <div className="ai-response">
              <strong>AI:</strong> {answer}
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isAiOpen && <div className="drawer-overlay" onClick={() => setIsAiOpen(false)}></div>}
    </div>
  );
};

export default Upsc;
