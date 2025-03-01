import apiClient from "../utils/apiClient";

export const fetchUsers = async () => {
  console.log("🔍 Fetching users from API: /users/all");
  try {
    const response = await apiClient("/users/all"); // ✅ Ensure this returns data
    console.log("✅ API Response:", response);
    
    if (!response || !response.data) {
      throw new Error("❌ Invalid API response for users.");
    }
    
    return response.data; // ✅ Return actual data array
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return []; // ✅ Return empty array on error
  }
};

export const addUser = async (user) => {
  console.log("➕ Adding new user:", user);
  try {
    const response = await apiClient("/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
    console.log("✅ User added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  console.log(`🗑️ Deleting user with ID: ${userId}`);
  try {
    await apiClient(`/users/${userId}`, { method: "DELETE" });
    console.log("✅ User deleted successfully.");
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    throw error;
  }
};

export const editUser = async (userId, updatedUser) => {
  console.log(`✏️ Editing user with ID: ${userId}`, updatedUser);
  try {
    const response = await apiClient(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
    });
    console.log("✅ User updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating user:", error);
    throw error;
  }
};

export const assignQuizToUser = async (userId, quiz) => {
  console.log(`📌 Assigning quiz to user ID: ${userId}`, quiz);
  try {
    const response = await apiClient(`/users/${userId}/quizzes`, {
      method: "PATCH",
      body: JSON.stringify(quiz),
    });
    console.log("✅ Quiz assigned successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error assigning quiz:", error);
    throw error;
  }
};

export const deleteQuizForUser = async (userId, quizId) => {
  console.log(`❌ Removing quiz ID: ${quizId} from user ID: ${userId}`);
  try {
    await apiClient(`/users/${userId}/quizzes/${quizId}`, {
      method: "DELETE",
    });
    console.log("✅ Quiz removed successfully.");
  } catch (error) {
    console.error("❌ Error removing quiz:", error);
    throw error;
  }
};
