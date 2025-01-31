import apiClient from "../utils/apiClient";

export const fetchUsers = async () => apiClient("/users/all");

export const addUser = async (user) => apiClient("/users", {
  method: "POST",
  body: JSON.stringify(user),
});

export const assignQuizToUser = async (userId, quiz) =>
  apiClient(`/users/${userId}/quizzes`, {
    method: "PATCH",
    body: JSON.stringify(quiz),
  });

