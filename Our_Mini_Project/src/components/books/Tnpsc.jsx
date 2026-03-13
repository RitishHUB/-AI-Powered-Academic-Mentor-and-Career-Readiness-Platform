import React, { useState, useRef } from "react";
import "./Tnpsc.css";

/**
 * Data: tnpscBooks (5th - 12th) and syllabus
 * - Keep the Drive preview links in `link`
 * - If link is "empty_link_id" it will show an alert saying "No link available"
 */
const tnpscBooks = [
  {
    class: "5th Standard",
    subjects: [
      { title: "5th Tamil", link: "https://drive.google.com/file/d/1C1LkVztftT-sxim0FtD1BQn6Wg6FBo8p/preview" },
      { title: "5th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "5th Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "5th Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "6th Standard",
    subjects: [
      { title: "6th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "6th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "6th Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "6th Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "6th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "7th Standard",
    subjects: [
      { title: "7th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "7th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "7th Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "7th Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "7th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "8th Standard",
    subjects: [
      { title: "8th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "8th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "8th Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "8th Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "8th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "9th Standard",
    subjects: [
      { title: "9th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "9th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "9th Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "9th Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "9th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "10th Standard",
    subjects: [
      { title: "10th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "10th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "10th Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "10th Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "10th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "11th Standard",
    subjects: [
      { title: "11th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th Physics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th Chemistry", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th Biology", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th History", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th Geography", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th Economics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "11th Commerce", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "12th Standard",
    subjects: [
      { title: "12th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th Physics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th Chemistry", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th Biology", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th History", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th Geography", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th Economics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "12th Commerce", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
];

const syllabus = [
  { title: "History of India", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Polity", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Geography", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Economics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Aptitude & Mental Ability", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Language Paper (Tamil / English)", link: "https://drive.google.com/file/d/empty_link_id/preview" },
];

const Tnpsc = ({ token, onLogout }) => {
  // state
  const [selectedLink, setSelectedLink] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const viewerRef = useRef(null);

  /**
   * handleOpen
   * - No backend calls.
   * - Accepts a book object { title, link } or syllabus item.
   * - If link contains 'empty_link_id' or falsy => alert.
   */
  const handleOpen = (book) => {
    if (!book || !book.link || book.link.includes("empty_link_id")) {
      alert("No link available for this book");
      return;
    }

    setSelectedLink(book.link);

    // scroll to viewer
    setTimeout(() => {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  /**
   * askAI
   * - Sends prompt to backend AI endpoint (kept as-is from your code).
   * - If you don't have backend, this will fail — that's expected unless you run your server.
   */
  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
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
    <div className="tnpsc-container">
      <h1 className="tnpsc-title">📚 TNPSC Study Zone</h1>

      {/* Books Section */}
      {tnpscBooks.map((group, i) => (
        <div key={i} className="class-section">
          <h2 className="class-title">{group.class}</h2>
          <div className="book-grid">
            {group.subjects.map((book, index) => (
              <div key={index} className="book-card">
                <h3 className="book-name">{book.title}</h3>

                {/* Correct button: pass the whole book object */}
                <button className="open-btn" onClick={() => handleOpen(book)}>
                  Open Book
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Syllabus Section */}
      <div className="syllabus-section">
        <h2 className="class-title">📝 TNPSC Syllabus</h2>
        <div className="book-grid">
          {syllabus.map((item, idx) => (
            <div key={idx} className="book-card">
              <h3 className="book-name">{item.title}</h3>
              <button className="open-btn" onClick={() => handleOpen(item)}>
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
            title="TNPSC PDF"
            className="pdf-frame"
          ></iframe>
        </div>
      )}

      {/* Floating AI Button */}
      <div className="floating-ai-btn" onClick={() => setIsAiOpen(!isAiOpen)}>
        🤖
      </div>

      {/* AI Side Drawer */}
      <div className={`ai-drawer ${isAiOpen ? "open" : ""}`}>
        <div className="ai-header">
          <h2>AI Assistant</h2>
          <button className="close-btn" onClick={() => setIsAiOpen(false)}>
            ✖
          </button>
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

export default Tnpsc;
