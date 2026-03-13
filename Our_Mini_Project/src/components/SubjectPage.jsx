import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { academicData } from '../data/academicData';
import IndustryContextModal from './academic/IndustryContextModal';
import './SubjectPage.css';

const SubjectPage = () => {
    const { yearId, deptId } = useParams();
    const navigate = useNavigate();
    const [pdfUrl, setPdfUrl] = useState(null); // State to handle modal
    const [selectedContextSubject, setSelectedContextSubject] = useState(null);

    const year = academicData.years.find(y => y.id === yearId);
    const dept = academicData.departments.find(d => d.id === deptId);

    const yearSubjects = academicData.subjects[yearId] || {};
    const subjects = yearSubjects[deptId] || [];

    if (!year || !dept) {
        return <div className="error-msg">Information not found.</div>;
    }

    const openPdfModal = (link) => {
        if (!link) return alert("Material link not available yet!");
        setPdfUrl(link);
    };

    const closePdfModal = () => {
        setPdfUrl(null);
    };

    return (
        <div className="subj-layout">
            {/* Sidebar */}
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
                        <button className="back-btn" onClick={() => navigate(`/departments/${yearId}`)}>
                            ← Back to {year.title} Departments
                        </button>
                        <h1>{dept.name} - {year.title}</h1>
                        <p>Select a subject to view its study materials and previous year question papers.</p>
                    </div>
                </header>

                {subjects.length === 0 ? (
                    <div className="empty-state">
                        <h3>No subjects available yet</h3>
                        <p>We are currently updating materials for {dept.short} - {year.title}.</p>
                    </div>
                ) : (
                    <div className="subj-grid">
                        {subjects.map(subj => (
                            <div key={subj.id} className="subj-card">
                                <div className="subj-code">{subj.code}</div>
                                <div className="subj-name">{subj.name}</div>
                                <div className="subj-actions">
                                    <button
                                        className="action-btn material-btn"
                                        onClick={() => openPdfModal(subj.driveLink)}
                                    >
                                        📄 Study Material
                                    </button>
                                    <button
                                        className="action-btn pqp-btn"
                                        onClick={() => openPdfModal(subj.pqpLink)}
                                    >
                                        📝 Previous Year QP
                                    </button>
                                    <button
                                        className="action-btn"
                                        onClick={() => setSelectedContextSubject(subj.name)}
                                        style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0' }}
                                    >
                                        🏢 Real-World Application
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* PDF Overlay Modal */}
            {pdfUrl && (
                <div className="pdf-modal-overlay">
                    <div className="pdf-modal-content">
                        <header className="pdf-modal-header">
                            <h2>Document Viewer</h2>
                            <button className="close-modal-btn" onClick={closePdfModal}>✖ Close</button>
                        </header>
                        <iframe
                            src={pdfUrl}
                            title="PDF Viewer"
                            className="pdf-iframe"
                            allow="autoplay"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Industry Context AI Overlay Modal */}
            {selectedContextSubject && (
                <IndustryContextModal
                    subjectName={selectedContextSubject}
                    onClose={() => setSelectedContextSubject(null)}
                />
            )}
        </div>
    );
};

export default SubjectPage;
