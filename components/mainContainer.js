// components/MainContainer.js
import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useRouter } from "next/router";

const MainContainer = ({ children }) => {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Add User", path: "/add-user" }, // Placeholder for future feature
  ];

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f4f4">
      {/* Sidebar Menu */}
      <Box
        width="250px"
        bgcolor="#3f51b5"
        color="#fff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={4}
      >
        <Typography variant="h5" gutterBottom>
          Menu
        </Typography>
        <Divider sx={{ width: "80%", bgcolor: "#fff", my: 2 }} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.name}
              onClick={() => router.push(item.path)}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4} bgcolor="#ffffff" boxShadow="0px 4px 12px rgba(0,0,0,0.1)">
        {children}
      </Box>
    </Box>
  );
};

export default MainContainer;
