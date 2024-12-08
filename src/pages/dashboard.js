import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, Alert } from "@mui/material";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the user data from the API
        const response = await fetch("/api/users");

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, []); // Runs once when the component mounts

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f9f9f9"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {userData ? (
        <Box width="100%" maxWidth="600px" mt={4}>
          <Typography variant="h6" gutterBottom>
            User List:
          </Typography>
          <List>
            {userData.map((user) => (
              <ListItem key={user._id} alignItems="flex-start">
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {user.phone_number}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quizzes:
                      </Typography>
                      <List>
                        {user.quiz_list.map((quiz) => (
                          <ListItem key={quiz.id}>
                            <ListItemText primary={quiz.title} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default Dashboard;