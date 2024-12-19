const apiClient = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
  
    const response = await fetch(`http://localhost:8080${url}`, {
      ...options,
      headers,
    });
  
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || `HTTP error: ${response.status}`);
    }
  
    return response.json();
  };
  
  export default apiClient;
  