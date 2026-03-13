import React, { useState, useEffect } from "react";
import "./QuizPage.css";

const QuizPage = ({ quiz, finishQuiz }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20); // 20 sec per question

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === quiz[currentIndex].answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < quiz.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setTimeLeft(20); // reset timer
    } else {
      const finalScore =
        score + (selectedOption === quiz[currentIndex].answer ? 1 : 0);
      finishQuiz(finalScore);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setTimeLeft(20);
    }
  };

  const progress = ((currentIndex + 1) / quiz.length) * 100;

  return (
    <div className="quiz-page-container">
      <div className="quiz-box">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Timer */}
        <div className="timer">⏳ {timeLeft}s</div>

        {/* Question */}
        <h3>
          Question {currentIndex + 1} / {quiz.length}
        </h3>
        <p className="question-text">{quiz[currentIndex].question}</p>

        {/* Options */}
        <div className="options">
          {quiz[currentIndex].options.map((opt, idx) => (
            <button
              key={idx}
              className={`option-btn ${
                selectedOption === opt ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button
            className="nav-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ⬅ Previous
          </button>
          <button className="nav-btn" onClick={handleNext}>
            {currentIndex + 1 === quiz.length ? "✅ Finish" : "Next ➡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
