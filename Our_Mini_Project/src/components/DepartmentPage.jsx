import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { academicData } from '../data/academicData';
import './DepartmentPage.css';

const DepartmentPage = () => {
    const { yearId } = useParams();
    const navigate = useNavigate();

    const year = academicData.years.find(y => y.id === yearId);
    const departments = academicData.departments;

    if (!year) {
        return <div className="error-msg">Year not found.</div>;
    }

    return (
        <div className="dept-layout flex-container">
            {/* Sidebar matches Mainpage for consistency */}
            <aside className="sidebar">
                <div className="logo-container">
                    <h2 className="logo">Learnixx</h2>
                </div>
                <div className="menu">
                    <button className="menu-btn active" type="button" onClick={() => navigate('/main')}>
                        <span className="icon">📚</span> Academics
                    </button>
                    <button className="menu-btn" type="button" onClick={() => navigate('/quiz')}>
                        <span className="icon">⚡</span> Quiz
                    </button>
                    <button className="menu-btn" type="button" onClick={() => navigate('/ai')}>
                        <span className="icon">🤖</span> AI Assistant
                    </button>
                </div>
            </aside>

            <main className="content">
                <header className="header">
                    <div className="welcome-text">
                        <button className="back-btn" onClick={() => navigate('/main')}>← Back to Years</button>
                        <h1>{year.title} Departments</h1>
                        <p>Select your department to view subjects.</p>
                    </div>
                </header>

                <div className="dept-grid">
                    {departments.map(dept => (
                        <div
                            key={dept.id}
                            className="dept-card glass-panel"
                            onClick={() => navigate(`/subjects/${yearId}/${dept.id}`)}
                        >
                            <div className="dept-content">
                                <div className="dept-short">{dept.short}</div>
                                <h3>{dept.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DepartmentPage;
