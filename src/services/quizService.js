import apiClient from "../utils/apiClient";

export const fetchQuizzes = async () => {
  const response = await apiClient("/quizzes/all");
  return response.data;
};

export const createQuiz = async (quiz) => {
  const response = await apiClient("/quizzes", {
    method: "POST",
    body: JSON.stringify(quiz),
  });
  return response.data;
};
