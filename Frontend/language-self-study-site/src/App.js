import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage.js";
import SignUp from "./Auth/SignUp.js";
import Login from "./Auth/Login.js";
import LearningPage from "./Learning-page/LearningPage.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learn" element={<LearningPage />} />
      </Routes>
    </Router>
  );
};

export default App;
