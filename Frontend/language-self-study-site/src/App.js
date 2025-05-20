import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage.js";
import SignUp from "./Auth/SignUp.js";
import Login from "./Auth/Login.js";
import LearningPage from "./Learning-page/LearningPage.js";
import MyProfile from "./My-profile/MyProfile.js";
import LessonDetailsPage from "./Lesson-Details-Page/LessonDetailsPage.js";
import ListenRepeatAndRepeatPage from "./Listen-and-Repeat/ListenAndRepeatPage.js";
import SentenceBuilder from "./Sentence-Building/SentenceBuilder.js";

import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learn" element={<LearningPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/Lesson-Details/id" element={<LessonDetailsPage />} />
        <Route
          path="/Listen-and-Repeat/id"
          element={<ListenRepeatAndRepeatPage />}
        />
        <Route path="/Sentence-Building/id" element={<SentenceBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;
