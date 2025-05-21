import axios from "axios";

const getSentenceArrangementExerciseData = async (exerciseID) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/sentence-arrangement/${exerciseID}`,
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
