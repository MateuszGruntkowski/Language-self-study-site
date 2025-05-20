import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import getUserData from "./data";

import "./styles/MyProfile.css";

const MyProfile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUserData(userData);
        console.log("Pobrane dane użytkownika:", userData);
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div class="profile-container">
      <div class="profile-header">
        <h1 class="profile-title">My Profile</h1>
      </div>
      <div class="profile-content">
        <Dashboard user={userData} />
        <EditProfile user={userData} />
      </div>
    </div>
  );
};

export default MyProfile;
