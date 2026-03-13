import React from "react";
import { useNavigate } from "react-router-dom";
import { academicData } from "../data/academicData";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <h2 className="logo">Learnixx</h2>
        </div>
        <div className="menu">
          <button className="menu-btn active" type="button">
            <span className="icon">📚</span> Academics
          </button>
          <button className="menu-btn" type="button" onClick={() => navigate("/quiz")}>
            <span className="icon">⚡</span> Quiz
          </button>
          <button className="menu-btn" type="button" onClick={() => navigate("/ai")}>
            <span className="icon">🤖</span> AI Assistant
          </button>
          <div style={{ flex: 1 }}></div>
          <button className="menu-btn logout" type="button" onClick={handleLogout}>
            <span className="icon">⏻</span> Logout
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="content">
        <header className="header">
          <div className="welcome-text">
            <h1>Welcome back, Student!</h1>
            <p>Access your study materials and explore our new AI-powered learning tools.</p>
          </div>
          <button
            className="profile-btn"
            type="button"
            onClick={() => navigate("/profile")}
            title="Profile"
          >
            👤
          </button>
        </header>

        <div className="featured-section">
          <div className="section-header">
            <h2>✨ Featured Capabilities</h2>
            <p>Standout tools for the PSG Hackathon</p>
          </div>
          <div className="featured-grid">
            <div className="feature-card socratic-card" onClick={() => navigate("/ai")}>
              <div className="feature-icon">🦉</div>
              <div className="feature-info">
                <h3>Socratic AI Mentor</h3>
                <p>Guided, anti-spoofing learning mode.</p>
              </div>
              <div className="feature-arrow">→</div>
            </div>
            <div className="feature-card viva-card" onClick={() => navigate("/quiz")}>
              <div className="feature-icon">🎓</div>
              <div className="feature-info">
                <h3>AI Viva Simulator</h3>
                <p>Interactive conversational evaluation.</p>
              </div>
              <div className="feature-arrow">→</div>
            </div>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: '40px' }}>
          <h2>📚 Academic Resources</h2>
          <p>Select your current year to view departments and subjects</p>
        </div>

        <div className="academic-grid">
          {academicData.years.map((year) => (
            <div
              key={year.id}
              className="year-card glass-panel"
              onClick={() => navigate(`/departments/${year.id}`)}
            >
              <div className="year-content">
                <h2>{year.title}</h2>
                <p>{year.description}</p>
              </div>
              <div className="year-footer">
                <button className="enter-btn">View Departments →</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
