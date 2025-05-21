import axios from "axios";

export const getLessonData = async (lessonId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/lessons/${lessonId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych o lekcji:", error);
  }
};
