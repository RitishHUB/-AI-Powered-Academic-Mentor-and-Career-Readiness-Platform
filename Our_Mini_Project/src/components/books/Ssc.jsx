import React, { useState, useRef } from "react";
import "./Ssc.css";

// Books section (5th–12th foundation)
const books = [
  {
    class: "5th Standard",
    subjects: [
      { title: "5th Tamil", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "5th English", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "5th Maths", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "5th Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "5th Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  // Add 6th–12th similarly if needed
];

// Full SSC CGL Syllabus (Tier-wise)
const cglSyllabus = [
  {
    tier: "Tier 1 – Preliminary Exam",
    subjects: [
      {
        title: "General Intelligence & Reasoning",
        topics: [
          "Analogies", "Similarities & Differences", "Space Visualization",
          "Problem Solving", "Analysis & Judgment", "Decision Making",
          "Visual Memory", "Discrimination", "Observation",
          "Relationship Concepts", "Arithmetical Reasoning", "Verbal & Figure Classification",
          "Coding-Decoding", "Blood Relations", "Series",
          "Direction & Distance", "Syllogism", "Non-Verbal Reasoning"
        ],
        link: "https://drive.google.com/file/d/empty_link_id/preview"
      },
      {
        title: "General Awareness",
        topics: [
          "History (Indian & World)", "Geography (India & World)",
          "Polity (Constitution, Governance)", "Economy (Basic & Current)",
          "General Science (Physics, Chemistry, Biology)", "Current Affairs",
          "Awards & Honors, Books & Authors, Important Days"
        ],
        link: "https://drive.google.com/file/d/empty_link_id/preview"
      },
      {
        title: "Quantitative Aptitude",
        topics: [
          "Number System", "Simplification", "Ratio & Proportion",
          "Percentage", "Average", "Profit & Loss",
          "Simple & Compound Interest", "Time & Work", "Time, Speed & Distance",
          "Geometry & Mensuration", "Algebra", "Trigonometry",
          "Statistics & Data Interpretation"
        ],
        link: "https://drive.google.com/file/d/empty_link_id/preview"
      },
      {
        title: "English Comprehension",
        topics: [
          "Grammar", "Vocabulary", "Sentence Correction", "Synonyms & Antonyms",
          "Fill in the Blanks", "One-word Substitution", "Comprehension"
        ],
        link: "https://drive.google.com/file/d/empty_link_id/preview"
      }
    ]
  },
  {
    tier: "Tier 2 – Main Exam",
    subjects: [
      { title: "Paper 1 – Quantitative Abilities", topics: ["Advanced Arithmetic & Algebra", "Geometry & Mensuration", "Trigonometry", "Statistics & Data Interpretation"], link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Paper 2 – English Language & Comprehension", topics: ["Grammar", "Vocabulary", "Comprehension", "Error Detection", "Sentence Improvement", "Synonyms & Antonyms", "Phrases & Idioms"], link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Paper 3 – Statistics (Optional)", topics: ["Statistical Methods", "Probability", "Measures of Central Tendency", "Correlation & Regression", "Index Numbers"], link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Paper 4 – General Studies (Finance & Economics) Optional", topics: ["Economics & Finance", "Budgeting & Taxation", "Governance & Public Finance"], link: "https://drive.google.com/file/d/empty_link_id/preview" }
    ]
  },
  {
    tier: "Tier 3 – Descriptive Paper",
    subjects: [
      { title: "Essay Writing", topics: ["Essay on General / Current Affairs Topics"], link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Letter / Application Writing", topics: ["Formal & Informal Letters", "Official Applications"], link: "https://drive.google.com/file/d/empty_link_id/preview" }
    ]
  },
  {
    tier: "Tier 4 – Skill Test / Computer Proficiency",
    subjects: [
      { title: "Data Entry / Typing Test", topics: ["Typing Speed & Accuracy"], link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Computer Proficiency Test", topics: ["MS Word, Excel, PowerPoint Basics"], link: "https://drive.google.com/file/d/empty_link_id/preview" }
    ]
  }
];

const SscCgl = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [showAiDrawer, setShowAiDrawer] = useState(false);
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
    <div className="cgl-container">
      <h1 className="cgl-title">📚 SSC CGL Study Zone</h1>

      {/* Books Section */}
      {books.map((group, i) => (
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
      {cglSyllabus.map((tier, i) => (
        <div key={i} className="syllabus-section">
          <h2 className="tier-title">{tier.tier}</h2>
          <div className="book-grid">
            {tier.subjects.map((sub, idx) => (
              <div key={idx} className="book-card">
                <h3 className="book-name">{sub.title}</h3>
                <ul className="topics-list">
                  {sub.topics.map((topic, tIdx) => <li key={tIdx}>{topic}</li>)}
                </ul>
                <button className="open-btn" onClick={() => handleOpen(sub.link)}>
                  Open Syllabus
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* PDF Viewer */}
      {selectedLink && (
        <div className="pdf-section" ref={viewerRef}>
          <h2 className="viewer-title">📖 PDF Viewer</h2>
          <iframe
            src={selectedLink}
            width="100%"
            height="600px"
            allow="autoplay"
            title="SSC CGL PDF"
            className="pdf-frame"
          ></iframe>
        </div>
      )}

      {/* Floating AI Button */}
      <div className="floating-ai-btn" onClick={() => setShowAiDrawer(true)}>🤖</div>

      {/* AI Drawer */}
      {showAiDrawer && (
        <>
          <div className="drawer-overlay" onClick={() => setShowAiDrawer(false)}></div>
          <div className={`ai-drawer ${showAiDrawer ? "open" : ""}`}>
            <div className="ai-header">
              🤖 SSC AI Helper
              <button className="close-btn" onClick={() => setShowAiDrawer(false)}>×</button>
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
              {answer && <div className="ai-response bot-msg">{answer}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SscCgl;
