import React from "react";
import "./styles/Dashboard.css";

const Dashboard = ({ user, rankingPosition }) => {
  const userStatistics = user.userStatistics || {};
  console.log("User statistics:", userStatistics);
  return (
    <div class="dashboard">
      <h2 class="dashboard-title">Dashboard</h2>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{userStatistics.listenAndRepeatCount}</div>
          <div class="stat-label">Listen & Repeat</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">
            {userStatistics.sentenceArrangementCount}
          </div>
          <div class="stat-label">Sentence Arrangement</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">{userStatistics.translationQuizCount}</div>
          <div class="stat-label">Translation Quiz</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">{userStatistics.totalXp}</div>
          <div class="stat-label">XP Earned</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">{userStatistics.completedExercisesCount}</div>
          <div class="stat-label">Exercises Completed</div>
        </div>
      </div>

      <div class="rank-card">
        <div class="rank-title">
          {" "}
          <span style={{ color: "#555555" }}>Leaderboard Position</span>
        </div>
        <div class="rank-value">{rankingPosition}</div>
      </div>
    </div>
  );
};

export default Dashboard;
