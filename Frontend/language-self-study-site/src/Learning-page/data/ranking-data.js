import axios from "axios";

export const getRankingData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/ranking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data, "Ranking data");
    return response.data;
  } catch (error) {
    console.error("Error fetching ranking data:", error);
    throw error;
  }
};
