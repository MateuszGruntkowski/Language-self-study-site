import axios from "axios";

const getSentenceArrangementExerciseData = async (lessonId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/${lessonId}/sentence-arrangement`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data, "Sentence Arrangement exercise data");
    return response.data;
  } catch (error) {
    console.error("Error fetching Sentence Arrangement exercise data:", error);
    throw error;
  }
};

export default getSentenceArrangementExerciseData;
