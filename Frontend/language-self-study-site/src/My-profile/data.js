import axios from "axios";

export const getUserData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/userProfile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych użytkownika:", error);
  }
};

export const getUserProfilePic = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/userProfilePic",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Response from API for profile pic:", response.data);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania zdjęcia profilowego:", error);
  }
};
