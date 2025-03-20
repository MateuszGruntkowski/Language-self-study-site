import React from "react";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";

import "./styles/MyProfile.css";

const MyProfile = () => {
  return (
    <div class="profile-container">
      <div class="profile-header">
        <h1 class="profile-title">My Profile</h1>
      </div>
      <div class="profile-content">
        <Dashboard />
        <EditProfile />
      </div>
    </div>
  );
};

export default MyProfile;
