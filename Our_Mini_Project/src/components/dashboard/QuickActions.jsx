import React from 'react';

const QuickActions = () => {
  return (
    <section className="quick-actions card">
      <h2 className="section-title">Quick Actions</h2>
      <div className="actions-grid">
        <button className="action-btn">🧠 Ask AI</button>
        <button className="action-btn">📝 Start Quiz</button>
        <button className="action-btn">📚 Explore Courses</button>
      </div>
    </section>
  );
};

export default QuickActions;
