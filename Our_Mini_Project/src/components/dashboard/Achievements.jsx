import React from 'react';

const Achievements = ({ badges }) => {
  return (
    <section className="achievements card">
      <h2 className="section-title">Achievements & Badges</h2>
      <div className="badges-grid">
        {badges.map((badge, idx) => (
          <div key={idx} className={`badge ${badge.earned ? 'earned' : ''}`}>
            <div className="badge-icon">{badge.icon}</div>
            <p className="badge-name">{badge.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
