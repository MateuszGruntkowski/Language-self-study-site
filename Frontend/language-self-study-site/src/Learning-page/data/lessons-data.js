import axios from "axios";

export const getLessonsData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/lessons", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania lekcji:", error);
  }
};
