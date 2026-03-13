import React, { useState, useRef } from "react";
import "./Rrb.css";

// RRB Books / Study Material
const rrbBooks = [
  {
    class: "RRB Mathematics",
    subjects: [
      { title: "Number Systems & Arithmetic", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Algebra & Geometry Basics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Profit, Loss & Interest", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Time, Work & Speed", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "RRB General Intelligence & Reasoning",
    subjects: [
      { title: "Series & Analogies", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Coding-Decoding", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Blood Relations & Directions", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Puzzles & Syllogism", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "RRB General Awareness",
    subjects: [
      { title: "Indian History & Geography", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Polity & Economy", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Science & Technology Basics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Sports & Awards", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "RRB Computer Knowledge",
    subjects: [
      { title: "Basics of Computers", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "MS Office & Internet", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Shortcut Keys & Software", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
];

// RRB Syllabus
const syllabus = [
  { title: "Mathematics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "General Intelligence & Reasoning", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "General Awareness", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "General Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Computer Knowledge", link: "https://drive.google.com/file/d/empty_link_id/preview" },
];


const Rrb = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [aiOpen, setAiOpen] = useState(false); // AI drawer state
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
    <div className="rrb-container">
      <h1 className="rrb-title">📚 RRB Study Zone</h1>

      {/* Books Sections */}
      {rrbBooks.map((group, i) => (
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
        <h2 className="class-title">📝 RRB Syllabus</h2>
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
            title="RRB PDF"
            className="pdf-frame"
          ></iframe>
        </div>
      )}

      {/* Floating AI Button */}
      <div className="floating-ai-btn" onClick={() => setAiOpen(!aiOpen)}>🤖</div>

      {/* AI Drawer */}
      <div className={`ai-drawer ${aiOpen ? "open" : ""}`}>
        <div className="ai-header">
          Ask RRB AI
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

      {/* Optional overlay if AI is open */}
      {aiOpen && <div className="drawer-overlay" onClick={() => setAiOpen(false)}></div>}
    </div>
  );
};

export default Rrb;
