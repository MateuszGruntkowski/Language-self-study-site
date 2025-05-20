import React from "react";
import "./styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div class="dashboard">
      <h2 class="dashboard-title">Dashboard</h2>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">42</div>
          <div class="stat-label">Hours Studied</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">1248</div>
          <div class="stat-label">XP Earned</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">5</div>
          <div class="stat-label">Lessons Completed</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">38</div>
          <div class="stat-label">Tasks Completed</div>
        </div>
      </div>

      <div class="streak-card">
        <div class="streak-title">
          <span style={{ color: "#555555" }}>Daily Streak</span>
        </div>
        <div class="streak-value">14 Days</div>
      </div>

      <div class="rank-card">
        <div class="rank-title">
          {" "}
          <span style={{ color: "#555555" }}>Leaderboard Position</span>
        </div>
        <div class="rank-value">#42</div>
      </div>
    </div>
  );
};

export default Dashboard;
