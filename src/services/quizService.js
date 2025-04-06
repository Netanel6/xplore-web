import apiClient from "../utils/apiClient";

export const fetchQuizzes = async () => {
  console.log("🔍 Calling API: /all");
  try {
    const response = await apiClient("/quizzes/all");
    console.log("✅ API Response:", response);
    
    if (!response || !response.data) {
      throw new Error("❌ Invalid API response for quizzes.");
    }

    console.log("✅ Quizzes received:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("❌ API FetchQuizzes Error:", error);
    return [];
  }
};

export const createQuiz = async (quiz) => {
  console.log("📤 Sending new quiz data:", quiz);
  try {
    const response = await apiClient("/quizzes/quiz", {
      method: "POST",
      body: JSON.stringify(quiz),
    });
    console.log("✅ Quiz successfully created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API CreateQuiz Error:", error);
    throw error;
  }
};

export const updateQuiz = async (quizId, updatedQuiz) => {
  console.log(`📝 Updating quiz with ID ${quizId}:`, updatedQuiz);
  try {
    const response = await apiClient(`/quizzes/quiz/${quizId}`, {
      method: "PUT",
      body: JSON.stringify(updatedQuiz),
    });
    console.log("✅ Quiz successfully updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API UpdateQuiz Error:", error);
    throw error;
  }
};