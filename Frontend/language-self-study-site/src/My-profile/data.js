import axios from "axios";

const getUserData = async () => {
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

export default getUserData;
