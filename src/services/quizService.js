import apiClient from "./apiClient";

export const fetchQuizzes = async () => apiClient("/quizzes");

export const createQuiz = async (quiz) =>
  apiClient("/quizzes", {
    method: "POST",
    body: JSON.stringify(quiz),
  });
