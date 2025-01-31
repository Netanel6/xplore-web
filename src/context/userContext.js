import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchUsers } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserList = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsers();
      setUserList(data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userList, fetchUserList, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
