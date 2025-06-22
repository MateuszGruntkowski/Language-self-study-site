const API_BASE_URL = "http://localhost:8080/api/user-statistics";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Function to add XP to the user
export const addXpToUser = async (xp) => {
  const token = getAuthToken();
  if (!token) {
    console.error("No auth token found");
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/add-xp`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ xp }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add XP: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log(`Succesfully added ${xp} XP to user`, result);
    return result;
  } catch (error) {
    console.error("Error adding XP:", error);
    throw error;
  }
};

// Function to update user statistics
export const updateUserStatistics = async (exerciseType) => {
  const token = getAuthToken();
  if (!token) {
    console.error("No auth token found");
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/update-statistics`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ exerciseType }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update statistics: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Successfully updated user statistics", result);
    return result;
  } catch (error) {
    console.error("Error updating statistics:", error);
    throw error;
  }
};
