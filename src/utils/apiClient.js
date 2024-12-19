const API_BASE_URL = "http://localhost:8080";

const getToken = () => localStorage.getItem("authToken") || "";

const apiClient = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API Error");
  }

  return response.json();
};

export default apiClient;
