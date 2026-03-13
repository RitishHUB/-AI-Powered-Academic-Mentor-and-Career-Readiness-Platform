import React from 'react';

const ProgressOverview = ({ stats }) => {
  return (
    <section className="progress-overview card">
      <h2 className="section-title">Progress Overview</h2>
      <div className="stats-grid">
        <div className="stat-box">
          <h3>{stats.streak} Days</h3>
          <p>Current Streak</p>
        </div>
        <div className="stat-box">
          <h3>{stats.progress}%</h3>
          <p>Course Completion</p>
        </div>
      </div>
      <p className="motivation">{stats.message}</p>
    </section>
  );
};

export default ProgressOverview;
