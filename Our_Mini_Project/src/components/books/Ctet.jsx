import React, { useState, useRef } from "react";
import "./Ctet.css";

// ✅ CTET Books / Study Material (placeholders)
const ctetBooks = [
  {
    class: "Child Development & Pedagogy",
    subjects: [
      { title: "Child Development (Primary Stage)", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Pedagogical Concepts & Practices", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "Language I (Hindi / English)",
    subjects: [
      { title: "Grammar & Usage", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Reading Comprehension", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "Language II (English / Regional Language)",
    subjects: [
      { title: "Grammar & Comprehension", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "Mathematics / Science",
    subjects: [
      { title: "Mathematics Concepts & Pedagogy", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Science Concepts & Pedagogy", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
  {
    class: "Social Studies / Social Science",
    subjects: [
      { title: "History & Geography", link: "https://drive.google.com/file/d/empty_link_id/preview" },
      { title: "Civics & Economics", link: "https://drive.google.com/file/d/empty_link_id/preview" },
    ],
  },
];

// ✅ CTET Syllabus
const syllabus = [
  { title: "Child Development & Pedagogy", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Language I (Hindi / English)", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Language II (English / Regional)", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Mathematics / Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
  { title: "Social Studies / Social Science", link: "https://drive.google.com/file/d/empty_link_id/preview" },
];

const Ctet = () => {
  const [selectedLink, setSelectedLink] = useState(null);
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


  return (
    <div className="ctet-container">
      <h1 className="ctet-title">📚 CTET Study Zone</h1>

      {/* Books Sections */}
      {ctetBooks.map((group, i) => (
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
        <h2 className="class-title">📝 CTET Syllabus</h2>
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
            title="CTET PDF"
            className="pdf-frame"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Ctet;
