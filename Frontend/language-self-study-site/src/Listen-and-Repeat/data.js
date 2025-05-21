import axios from "axios";

const getListenAndRepeatExerciseData = async (exerciseID) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/listen-and-repeat/${exerciseID}`,
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
