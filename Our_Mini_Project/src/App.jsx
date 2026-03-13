import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🔹 Auth Pages
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

import MainPage from "./components/MainPage.jsx";
import Pqp from "./components/pqp.jsx";
import MainQuiz from "./components/quiz/MainQuiz.jsx";
import AiPage from "./components/AiPage.jsx";
import DepartmentPage from "./components/DepartmentPage.jsx";
import SubjectPage from "./components/SubjectPage.jsx";

// 🔹 Dashboard
import Profil from "./components/dashboard/Dashboard.jsx";

// 🔹 Books Section
import Tnpsc from "./components/books/Tnpsc.jsx";
import Upsc from "./components/books/Upsc.jsx";
import Ctet from "./components/books/Ctet.jsx";
import Ssc from "./components/books/Ssc.jsx";
import Rrb from "./components/books/Rrb.jsx";
import Gate from "./components/books/Gate.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Main App Routes */}
        <Route path="/main" element={<MainPage />} />
        <Route path="/pqp" element={<Pqp />} />
        <Route path="/quiz" element={<MainQuiz />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/profile" element={<Profil />} />

        {/* Academic Pages */}
        <Route path="/departments/:yearId" element={<DepartmentPage />} />
        <Route path="/subjects/:yearId/:deptId" element={<SubjectPage />} />

        {/* Books Section */}
        <Route path="/books/tnpsc" element={<Tnpsc />} />
        <Route path="/books/upsc" element={<Upsc />} />
        <Route path="/books/ctet" element={<Ctet />} />
        <Route path="/books/ssc" element={<Ssc />} />
        <Route path="/books/rrb" element={<Rrb />} />
        <Route path="/books/gate" element={<Gate />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
