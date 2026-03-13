import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">📘 Learnixx Academic Profile</div>
      <input className="search-bar" type="text" placeholder="Search subjects, quizzes..." />
      <div className="profile-menu">
        <span className="profile-icon">👤</span>
        <span className="profile-name">Hi, Student</span>
      </div>
    </header>
  );
};

export default Header;
