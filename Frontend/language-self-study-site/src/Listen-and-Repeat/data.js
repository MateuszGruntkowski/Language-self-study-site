import axios from "axios";

const getListenAndRepeatExerciseData = async (lessonId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/${lessonId}/listen-and-repeat`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data, "Listen and Repeat exercise data");
    return response.data;
  } catch (error) {
    console.error("Error fetching Listen and Repeat exercise data:", error);
    throw error;
  }
};

export default getListenAndRepeatExerciseData;
