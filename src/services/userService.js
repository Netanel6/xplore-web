import apiClient from "../utils/apiClient";

export const fetchUsers = async () => apiClient("/users/all");

export const addUser = async (user) => apiClient("/users", {
  method: "POST",
  body: JSON.stringify(user),
});

export const deleteUser = async (userId) =>
  apiClient(`/users/${userId}`, {
    method: "DELETE",
  });


export const editUser = async (userId, updatedUser) =>
  apiClient(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(updatedUser),
  });

export const assignQuizToUser = async (userId, quiz) =>
  apiClient(`/users/${userId}/quizzes`, {
    method: "PATCH",
    body: JSON.stringify(quiz),
  });

export const deleteQuizForUser = async (userId, quizId) =>
  apiClient(`/users/${userId}/quizzes/${quizId}`, {
    method: "DELETE",
  });

