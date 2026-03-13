import React, { useState, useEffect, useRef } from "react";
import "./AiInterviewMode.css";

const AiInterviewMode = ({ subjectName, onExit }) => {
    const [chatLog, setChatLog] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [previousQuestions, setPreviousQuestions] = useState([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [interviewCount, setInterviewCount] = useState(0);
    const MAX_QUESTIONS = 5;

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    // Initial load: generate first question
    useEffect(() => {
        fetchNextQuestion([]);
    }, []);

    const fetchNextQuestion = async (prevQs) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/generate-interview-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subjectName, previousQuestions: prevQs }),
            });
            const data = await res.json();
            if (data.question) {
                setCurrentQuestion(data.question);
                setPreviousQuestions([...prevQs, data.question]);
                setChatLog((prev) => [
                    ...prev,
                    { role: "ai", text: data.question, type: "question" }
                ]);
            }
        } catch (err) {
            console.error(err);
            setChatLog((prev) => [...prev, { role: "ai", text: "Connection error. Unable to fetch next question.", type: "error" }]);
        }
        setLoading(false);
    };

    const submitAnswer = async () => {
        if (!userAnswer.trim()) return;

        // Add user answer to chat
        const currentAns = userAnswer;
        setChatLog((prev) => [...prev, { role: "user", text: currentAns }]);
        setUserAnswer("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/evaluate-interview-answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subjectName, question: currentQuestion, answer: currentAns }),
            });
            const evaluation = await res.json();

            setChatLog((prev) => [
                ...prev,
                { role: "ai", text: `Professor Evaluation: ${evaluation.feedback}`, score: evaluation.score, type: "evaluation" }
            ]);

            const updatedCount = interviewCount + 1;
            setInterviewCount(updatedCount);

            if (updatedCount < MAX_QUESTIONS) {
                // Fetch next question slightly delayed for UX
                setTimeout(() => fetchNextQuestion(previousQuestions), 1500);
            } else {
                setChatLog((prev) => [...prev, { role: "ai", text: "Interview Complete! You did a fantastic job. You can exit reading your feedback, or request another session from the main menu.", type: "system" }]);
            }
        } catch (err) {
            console.error(err);
            setChatLog((prev) => [...prev, { role: "ai", text: "Evaluation failed. Please try again.", type: "error" }]);
        }
        setLoading(false);
    };

    return (
        <div className="interview-container slide-up-anim">
            <div className="interview-header">
                <div className="interview-title">
                    <span className="ai-icon">🎓</span>
                    <div>
                        <h3>AI Professor Viva: {subjectName}</h3>
                        <p>Question {interviewCount + 1} of {MAX_QUESTIONS}</p>
                    </div>
                </div>
                <button className="exit-btn" onClick={onExit}>Exit Viva</button>
            </div>

            <div className="interview-chat-window">
                {chatLog.map((msg, idx) => (
                    <div key={idx} className={`iq-row ${msg.role}`}>
                        <div className={`iq-bubble ${msg.role} ${msg.type || ""}`}>
                            {msg.role === "ai" && <div className="iq-avatar">👨‍🏫</div>}
                            <div className="iq-text-content">
                                {msg.type === "evaluation" && (
                                    <div className={`iq-score score-${Math.round(msg.score)}`}>Score: {msg.score}/10</div>
                                )}
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="iq-row ai">
                        <div className="iq-bubble ai">
                            <div className="iq-avatar">👨‍🏫</div>
                            <div className="typing-dots"><span></span><span></span><span></span></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="interview-input-area">
                <textarea
                    placeholder="Type your explanation here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={loading || interviewCount >= MAX_QUESTIONS}
                    rows={3}
                />
                <button
                    onClick={submitAnswer}
                    disabled={loading || !userAnswer.trim() || interviewCount >= MAX_QUESTIONS}
                    className="submit-ans-btn"
                >
                    Submit Answer
                </button>
            </div>
        </div>
    );
};

export default AiInterviewMode;
