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

const ranking = [
  {
    name: "Aleksandra K.",
    level: 24,
    xp: 12450,
    avatar: "/avatars/avatarWoman2.png",
  },
  {
    name: "Michał W.",
    level: 22,
    xp: 11875,
    avatar: "/avatars/avatarMan3.png",
  },
  {
    name: "Karolina L.",
    level: 21,
    xp: 10930,
    avatar: "/avatars/avatarWoman3.png",
  },
  { name: "Piotr Z.", level: 20, xp: 9845, avatar: "/avatars/avatarMan4.png" },
  { name: "Anna S.", level: 19, xp: 9320, avatar: "/avatars/avatarWoman4.png" },
];

export default ranking;
