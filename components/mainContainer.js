import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MainContainer = ({ children, onAddUser }) => {
  const router = useRouter();

  const menuItems = [
    { name: "דשבורד", path: "/dashboard" },
    // Add more menu items here if needed
  ];

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f4f4f4">
      {/* Sidebar Menu */}
      <Box
        width="250px"
        bgcolor="#3f51b5"
        color="#fff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={4}
        boxShadow="2px 0px 5px rgba(0,0,0,0.1)"
      >
        <Typography variant="h5" gutterBottom>
          תפריט
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
        <Divider sx={{ width: "80%", bgcolor: "#fff", my: 2 }} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={onAddUser}
        >
          הוסף משתמש
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4} bgcolor="#ffffff" boxShadow="0px 4px 12px rgba(0,0,0,0.1)">
        {children}
      </Box>
    </Box>
  );
};

export default MainContainer;
