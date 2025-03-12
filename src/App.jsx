import React from "react";
import AuthForm from "./components/AuthForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx"; // Make sure this file exists
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/Home.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
