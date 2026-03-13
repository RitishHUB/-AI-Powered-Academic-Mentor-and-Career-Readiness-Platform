import React, { useState, useEffect } from "react";
import "./IndustryContextModal.css";

const IndustryContextModal = ({ subjectName, onClose }) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContext = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/generate-industry-context", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ subjectName }),
                });
                const data = await res.json();

                // Convert basic markdown-like bolding to HTML
                let formattedText = data.context || "No case study generated.";
                formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

                setContent(formattedText);
            } catch (err) {
                console.error("Failed to fetch industry context", err);
                setContent("<strong>Connection Error:</strong> Could not reach the AI server to generate the case study.");
            }
            setLoading(false);
        };

        fetchContext();
    }, [subjectName]);

    return (
        <div className="ic-modal-overlay">
            <div className="ic-modal-content slide-up-anim">
                <header className="ic-modal-header">
                    <div className="ic-header-title">
                        <span className="ic-icon">🏢</span>
                        <div>
                            <h3>Industry Case Study</h3>
                            <p>{subjectName}</p>
                        </div>
                    </div>
                    <button className="ic-close-btn" onClick={onClose}>✖</button>
                </header>

                <div className="ic-modal-body">
                    {loading ? (
                        <div className="ic-loading-state">
                            <div className="ic-spinner"></div>
                            <p>Cohere AI is writing your real-world case study...</p>
                        </div>
                    ) : (
                        <div className="ic-text-content" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
                    )}
                </div>

                <div className="ic-modal-footer">
                    <p className="ic-hint">💡 Use this context in your next interview to show true subject mastery!</p>
                </div>
            </div>
        </div>
    );
};

export default IndustryContextModal;
