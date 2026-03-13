import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizSelector from "./QuizSelector";
import QuizPage from "./QuizPage";
import QuizResult from "./QuizResult";
import AiInterviewMode from "./AiInterviewMode";
import "./MainQuiz.css";

const MainQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  // New State for Interview Mode
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const startAiQuiz = async (subject, isViva) => {
    setLoading(true);
    setSubjectName(subject);
    setIsInterviewMode(isViva);

    if (isViva) {
      setInterviewStarted(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectName: subject }),
      });

      const data = await res.json();
      if (data.quiz && data.quiz.length > 0) {
        setQuizData(data.quiz);
        setScore(0);
        setShowResult(false);
      } else {
        alert("AI failed to generate quiz. Please try again.");
      }
    } catch (err) {
      alert("Error generating quiz: " + err.message);
    }
    setLoading(false);
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setQuizData(null);
    setScore(0);
    setShowResult(false);
    setIsInterviewMode(false);
    setInterviewStarted(false);
  };

  return (
    <div className="quiz-layout">
      {/* Sidebar matching the rest of the application */}
      <aside className="sidebar">
        <div className="logo-container">
          <h2 className="logo">Learnixx</h2>
        </div>
        <div className="menu">
          <button className="menu-btn" type="button" onClick={() => navigate('/main')}>
            <span className="icon">📚</span> Academics
          </button>
          <button className="menu-btn active" type="button">
            <span className="icon">⚡</span> AI Quiz
          </button>
          <button className="menu-btn" type="button" onClick={() => navigate('/ai')}>
            <span className="icon">🤖</span> AI Assistant
          </button>
        </div>
      </aside>

      <main className="quiz-main-content">
        <header className="quiz-header">
          <div className="quiz-header-info">
            <h1>Dynamic AI Quizzes</h1>
            <p>Test your knowledge with custom AI-generated questions</p>
          </div>
        </header>

        <div className="quiz-content-area">
          {!quizData && !interviewStarted ? (
            <QuizSelector startAiQuiz={startAiQuiz} loading={loading} />
          ) : isInterviewMode && interviewStarted ? (
            <AiInterviewMode subjectName={subjectName} onExit={resetQuiz} />
          ) : showResult ? (
            <QuizResult
              subjectName={subjectName}
              score={score}
              total={quizData.length}
              resetQuiz={resetQuiz}
            />
          ) : (
            <QuizPage
              quiz={quizData}
              finishQuiz={finishQuiz}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default MainQuiz;
