import React from 'react';
import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {
  const performanceStats = {
    cgpa: 8.4,
    attendance: 85,
    rank: 12,
    totalStudents: 120
  };

  const subjectPerformance = [
    { title: "Data Structures & Algorithms", score: 88, attendance: 90 },
    { title: "Digital System Design", score: 75, attendance: 82 },
    { title: "Database Management Systems", score: 92, attendance: 95 },
    { title: "Computer Networks", score: 68, attendance: 75 },
    { title: "Software Engineering", score: 85, attendance: 88 }
  ];

  const recentAiActivities = [
    { type: "Socratic Mentor", topic: "Linked List Implementation", date: "Today, 10:30 AM", status: "Completed" },
    { type: "AI Viva", topic: "Normalization in DBMS", date: "Yesterday", score: "8/10" },
    { type: "Quiz", topic: "OSI Model Layers", date: "Oct 24", score: "4/5" }
  ];

  const upcomingDeadlines = [
    { task: "DSA Module 3 Assignment", due: "Tomorrow, 11:59 PM", priority: "High" },
    { task: "Software Engineering SRS Document", due: "Oct 28", priority: "Medium" },
    { task: "DBMS Lab Cycle 2", due: "Oct 30", priority: "High" }
  ];

  return (
    <div className="dashboard student-analytics">
      <Header />

      {/* Top Level Overview */}
      <section className="analytics-header card">
        <div className="welcome-block">
          <h2>Student Performance Analytics</h2>
          <p>Track your academic standing and AI-assisted learning progress.</p>
        </div>
        <div className="high-level-stats">
          <div className="stat-circle stat-cgpa">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${(performanceStats.cgpa / 10) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="stat-info">
              <h3>{performanceStats.cgpa}</h3>
              <span>CGPA</span>
            </div>
          </div>
          <div className="stat-circle stat-attendance">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${performanceStats.attendance}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="stat-info">
              <h3>{performanceStats.attendance}%</h3>
              <span>Attendance</span>
            </div>
          </div>
          <div className="stat-box rank-box">
            <h3>#{performanceStats.rank}</h3>
            <p>Class Rank (out of {performanceStats.totalStudents})</p>
          </div>
        </div>
      </section>

      {/* Main Grid content */}
      <div className="analytics-grid">

        {/* Left Column */}
        <div className="analytics-col-left">
          <section className="performance-list card">
            <h3 className="section-title">Subject Performance</h3>
            <div className="subject-list">
              {subjectPerformance.map((sub, idx) => (
                <div key={idx} className="subject-item">
                  <div className="sub-header">
                    <h4>{sub.title}</h4>
                  </div>
                  <div className="sub-metrics">
                    <div className="metric">
                      <span className="label">Score</span>
                      <div className="bar-bg"><div className="bar-fill score-fill" style={{ width: `${sub.score}%` }}></div></div>
                      <span className="value">{sub.score}%</span>
                    </div>
                    <div className="metric">
                      <span className="label">Attendance</span>
                      <div className="bar-bg"><div className="bar-fill att-fill" style={{ width: `${sub.attendance}%` }}></div></div>
                      <span className="value">{sub.attendance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="analytics-col-right">
          <section className="ai-activity card">
            <h3 className="section-title">Recent AI Learning</h3>
            <ul className="activity-feed">
              {recentAiActivities.map((act, idx) => (
                <li key={idx} className="activity-item">
                  <div className={`act-icon ${act.type.replace(/\s+/g, '-').toLowerCase()}`}>
                    {act.type === 'Socratic Mentor' ? '🦉' : act.type === 'AI Viva' ? '🎓' : '⚡'}
                  </div>
                  <div className="act-details">
                    <h4>{act.type}</h4>
                    <p>{act.topic}</p>
                    <span className="act-meta">{act.date} • {act.score || act.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="deadlines card">
            <h3 className="section-title">Upcoming Deadlines</h3>
            <div className="deadline-list">
              {upcomingDeadlines.map((dl, idx) => (
                <div key={idx} className={`deadline-item ${dl.priority.toLowerCase()}`}>
                  <div className="dl-info">
                    <h4>{dl.task}</h4>
                    <span>{dl.due}</span>
                  </div>
                  <div className="dl-badge">{dl.priority}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
