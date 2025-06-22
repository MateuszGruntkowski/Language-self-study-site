import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import { getUserProfilePic, getUserData, getUserRankingPosition } from "./data";

import "./styles/MyProfile.css";

const MyProfile = () => {
  const [userData, setUserData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [rankingPosition, setRankingPosition] = useState(null);

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

    const fetchProfilePicture = async () => {
      try {
        const pictureData = await getUserProfilePic();
        console.log("Odpowiedź z getUserProfilePic:", pictureData);
        if (pictureData && pictureData.profilePicBase64) {
          setProfilePicture(pictureData);
          console.log("Pobrane zdjęcie profilowe:", pictureData.profilePicName);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania zdjęcia profilowego:", error);
      }
    };

    const fetchUserRankingPosition = async () => {
      try {
        const rankingPosition = await getUserRankingPosition();
        setRankingPosition(rankingPosition);
        console.log("Pobrana pozycja w rankingu:", rankingPosition);
      } catch (error) {
        console.error("Błąd podczas pobierania pozycji w rankingu:", error);
      }
    };

    fetchUserData();
    fetchProfilePicture();
    fetchUserRankingPosition();
  }, []);

  return (
    <div class="profile-container">
      <div class="profile-header">
        <h1 class="profile-title">My Profile</h1>
      </div>
      <div class="profile-content">
        <Dashboard user={userData} rankingPosition={rankingPosition} />
        <EditProfile
          user={userData}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          setUserData={setUserData}
        />
      </div>
    </div>
  );
};

export default MyProfile;
