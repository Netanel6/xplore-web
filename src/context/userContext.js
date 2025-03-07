import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchUsers } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserList = useCallback(async () => {
    console.log("🔄 Fetching user list...");
    setIsLoading(true);
    try {
      const users = await fetchUsers();
      console.log("✅ Users fetched successfully:", users);
      setUserList(users); // ✅ Ensure actual data is set
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    } finally {
      console.log("📢 User fetching complete.");
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
    throw new Error("❌ useUserContext must be used within a UserProvider");
  }
  return context;
};
