const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ------------------- MongoDB Connection -------------------
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// ------------------- User Schema -------------------
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// ------------------- AWS S3 Setup -------------------
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

// ------------------- User APIs -------------------
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ email, username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (password.trim() !== user.password) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ message: "Login successful", token, user: { _id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});





// ------------------- AI API -------------------
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt cannot be empty" });
    }

    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r-08-2024",
        message: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ answer: response.data?.text || "No response from AI" });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI request failed" });
  }
});

// ------------------- SOCRATIC MENTOR API -------------------
app.post("/api/socratic-ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt cannot be empty" });
    }

    const mentorConstraint = `You are a brilliant, strict Socratic Mentor for an engineering college student.
CRITICAL RULE: NEVER GIVE THE DIRECT ANSWER. NEVER WRITE FULL BLOCKS OF CODE. 
If the student asks for code (e.g., "Write me a linked list"), you MUST refuse. Instead, provide ONLY the first logical step, and end your response by asking them a leading question to make them write the code themselves.
If they ask a math/theory question, explain the underlying concept and ask them to solve the final step. 
Keep your response under 3 paragraphs. Be encouraging but firm about not spoon-feeding.

Student's prompt: "${prompt}"`;

    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r-08-2024",
        message: mentorConstraint
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ answer: response.data?.text || "No response from Socratic AI" });
  } catch (error) {
    console.error("Socratic AI Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Socratic API request failed" });
  }
});

// ------------------- Generate Quiz API -------------------
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { subjectName } = req.body;
    if (!subjectName) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const prompt = `Generate a 5-question multiple choice quiz for a college engineering student studying "${subjectName}". 
Respond ONLY with a valid, parsable JSON array of objects. Do not include markdown formatting like \`\`\`json or any conversational text.
Each object must have exactly this structure:
{
  "question": "The question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "The exact string from the options array that is correct"
}`;

    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r-08-2024",
        message: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let rawText = response.data?.text || "[]";

    // Clean markdown formatting if AI still includes it
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    let quizData = [];
    try {
      quizData = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse AI JSON response:", rawText);
      return res.status(500).json({ message: "Failed to generate valid quiz data from AI" });
    }

    res.json({ quiz: quizData });
  } catch (error) {
    console.error("Quiz Gen Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Quiz generation failed" });
  }
});

// ------------------- Generate Interview Question API -------------------
app.post("/api/generate-interview-question", async (req, res) => {
  try {
    const { subjectName, previousQuestions = [] } = req.body;
    if (!subjectName) return res.status(400).json({ message: "Subject name is required" });

    // Ask AI to generate a question it hasn't asked yet
    const avoidPrompt = previousQuestions.length > 0
      ? `Do NOT ask any of these previous questions: ${JSON.stringify(previousQuestions)}.`
      : "";

    const prompt = `You are a strict but fair College Engineering Professor conducting an oral Viva/Interview for the subject "${subjectName}".
Ask ONE conceptual, open-ended question that requires a short paragraph explanation. 
Make it challenging but appropriate for an undergraduate. ${avoidPrompt}
Respond ONLY with the text of the question. Do not include quotes, headers, or any other formatting.`;

    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r-08-2024",
        message: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ question: response.data?.text?.trim() || "Can you explain the foundational concepts of this subject?" });
  } catch (error) {
    console.error("Interview Gen Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate interview question" });
  }
});

// ------------------- Evaluate Interview Answer API -------------------
app.post("/api/evaluate-interview-answer", async (req, res) => {
  try {
    const { subjectName, question, answer } = req.body;
    if (!question || !answer) return res.status(400).json({ message: "Question and answer are required" });

    const prompt = `You are a College Engineering Professor reviewing a student's answer for the subject "${subjectName}".
Question Asked: "${question}"
Student's Answer: "${answer}"

Evaluate the student's answer. Respond ONLY with a valid, parsable JSON object. Do not include markdown formatting like \`\`\`json.
The JSON must have precisely this structure:
{
  "score": <number between 0 and 10>,
  "feedback": "Your evaluation of the answer. Praise what they got right, and explicitly state what they missed or got wrong in a constructive, professorial tone."
}`;

    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r-08-2024",
        message: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let rawText = response.data?.text || "{}";
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    let evaluationData = { score: 0, feedback: "Failed to parse AI evaluation." };
    try {
      evaluationData = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse AI evaluation JSON response:", rawText);
    }

    res.json(evaluationData);
  } catch (error) {
    console.error("Interview Eval Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to evaluate answer" });
  }
});


// ------------------- Generate Industry Context API -------------------
app.post("/api/generate-industry-context", async (req, res) => {
  try {
    const { subjectName } = req.body;
    if (!subjectName) return res.status(400).json({ message: "Subject name is required" });

    const prompt = `You are a career counselor and industry expert helping a college engineering student understand the real-world value of the subject "${subjectName}".
Write a highly engaging, 3-paragraph "Industry Case Study" explaining exactly how modern tech companies (like Google, Amazon, Swiggy, or innovative startups) use the core concepts of this subject in their actual products.
Make it sound exciting, practical, and highly relevant to getting a job. Use a formatting structure with bolding for emphasis. Do not use conversational filler, just return the case study text.`;

    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r-08-2024",
        message: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ context: response.data?.text?.trim() || "Failed to generate context." });
  } catch (error) {
    console.error("Industry Context Gen Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate industry context" });
  }
});


// ------------------- Server -------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
