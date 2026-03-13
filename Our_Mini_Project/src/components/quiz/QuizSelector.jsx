import React, { useState } from "react";
import { academicData } from "../../data/academicData";
import "./QuizDomain.css"; // We'll keep the same CSS file name for simplicity

const QuizSelector = ({ startAiQuiz, loading }) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setSelectedDept("");
        setSelectedSubject("");
    };

    const handleDeptChange = (e) => {
        setSelectedDept(e.target.value);
        setSelectedSubject("");
    };

    const handleGenerateMCQ = () => {
        if (selectedSubject) {
            startAiQuiz(selectedSubject, false); // false = MCQ
        }
    };

    const handleGenerateViva = () => {
        if (selectedSubject) {
            startAiQuiz(selectedSubject, true); // true = Viva
        }
    };

    // Safe traverse the subjects object
    const yearSubjects = selectedYear ? academicData.subjects[selectedYear] || {} : {};
    const subjects = selectedDept ? yearSubjects[selectedDept] || [] : [];

    return (
        <div className="quiz-selector-card">
            <div className="ai-brain-icon">🧠</div>
            <h2>Generate Academic AI Quiz</h2>
            <p className="selector-desc">Select your subject and our AI will create a unique 5-question test for you on the spot.</p>

            <div className="dropdown-group">
                <label>Academic Year</label>
                <select value={selectedYear} onChange={handleYearChange} disabled={loading}>
                    <option value="">-- Select Year --</option>
                    {academicData.years.map(y => (
                        <option key={y.id} value={y.id}>{y.title}</option>
                    ))}
                </select>
            </div>

            <div className="dropdown-group">
                <label>Department</label>
                <select value={selectedDept} onChange={handleDeptChange} disabled={!selectedYear || loading}>
                    <option value="">-- Select Department --</option>
                    {academicData.departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>
            </div>

            <div className="dropdown-group">
                <label>Subject</label>
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedDept || loading}>
                    <option value="">-- Select Subject --</option>
                    {subjects.map(s => (
                        <option key={s.id} value={s.name}>{s.code} - {s.name}</option>
                    ))}
                </select>
            </div>

            <div className="action-buttons-group" style={{ display: 'flex', gap: '10px', marginTop: '10px', width: '100%' }}>
                <button
                    className="generate-btn"
                    onClick={handleGenerateMCQ}
                    disabled={!selectedSubject || loading}
                    style={{ flex: 1 }}
                >
                    {loading ? (
                        <span className="loading-text">✨ Thinking...</span>
                    ) : (
                        <span>📝 Take MCQ Quiz</span>
                    )}
                </button>

                <button
                    className="generate-btn viva-btn"
                    onClick={handleGenerateViva}
                    disabled={!selectedSubject || loading}
                    style={{ flex: 1, background: 'linear-gradient(135deg, #0ea5e9, #2563eb)' }}
                >
                    {loading ? (
                        <span className="loading-text">🎓 Preparing...</span>
                    ) : (
                        <span>🎓 Start AI Viva</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default QuizSelector;
