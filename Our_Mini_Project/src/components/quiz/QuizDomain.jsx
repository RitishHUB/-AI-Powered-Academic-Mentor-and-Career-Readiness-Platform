import React from "react";
import "./QuizDomain.css";

const QuizDomain = ({ startQuiz }) => {
  const domains = ["TNPSC", "UPSC", "GATE", "RRB", "CET", "SSC CGL"];

  return (
    <div className="quiz-domain-container">
      <h2>Select Quiz Domain</h2>
      <div className="domain-buttons">
        {domains.map((domain) => (
          <button key={domain} onClick={() => startQuiz(domain)}>
            {domain}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizDomain;
