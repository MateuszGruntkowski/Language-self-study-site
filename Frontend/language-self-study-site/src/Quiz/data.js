import axios from "axios";

const getTranslationQuizData = async (lessonId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/${lessonId}/translation-quiz`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data, "Translation Quiz exercise data");
    return response.data;
  } catch (error) {
    console.error("Error fetching Translation Quiz exercise data:", error);
    throw error;
  }
};

export default getTranslationQuizData;
